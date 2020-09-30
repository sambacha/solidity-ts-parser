"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// signature parsing
function parseSignature(functionSignature) {
    const signatureMatcher = /^([a-zA-Z_][a-zA-Z0-9_]+)\((.*)\)$/;
    const matchedSignature = signatureMatcher.exec(functionSignature);
    if (matchedSignature === null)
        throw new Error(`${functionSignature} is not a valid Solidity function signature.`);
    const name = matchedSignature[1];
    const inputs = parseParameters(matchedSignature[2]);
    return { type: 'function', name, inputs, outputs: [] };
}
exports.parseSignature = parseSignature;
function parseParameters(functionParameters) {
    const parameters = [];
    let remainingParameters = functionParameters.trim();
    while (remainingParameters.length !== 0) {
        let { parameterDescription, remaining } = extractNextParameter(remainingParameters);
        remainingParameters = remaining;
        parameters.push(parameterDescription);
    }
    // fill in any missing argument names
    return parameters.map((x, i) => ({ ...x, name: x.name || `arg${i}` }));
}
function extractNextParameter(functionParameters) {
    let nesting = 0;
    let typeAndName = '';
    for (const character of functionParameters) {
        // walk until we reach either the end of the string or a comma outside of all parenthesis
        if (character === '(')
            ++nesting;
        if (character === ')')
            --nesting;
        if (nesting < 0)
            throw new Error(`${functionParameters} does not have matching number of open and close parenthesis`);
        if (nesting > 0) {
            typeAndName += character;
            continue;
        }
        if (character === ',')
            break;
        typeAndName += character;
    }
    const typeAndNameMatch = /^\s*(.+?)\s*(?:\s([a-zA-Z_][a-zA-Z0-9_]*))?\s*$/.exec(typeAndName);
    if (typeAndNameMatch === null)
        throw new Error(`${typeAndNameMatch} is not a valid parameter/name pair.`);
    let parameterType = typeAndNameMatch[1];
    let components = undefined;
    if (parameterType.startsWith('(')) {
        const tupleTypes = parameterType.slice(1, parameterType.lastIndexOf(')'));
        parameterType = `tuple${parameterType.slice(tupleTypes.length + 2)}`;
        components = parseParameters(tupleTypes);
    }
    const parameterName = typeAndNameMatch[2] || '';
    let remaining = functionParameters.slice(typeAndName.length);
    if (remaining.startsWith(','))
        remaining = remaining.slice(1);
    remaining = remaining.trim();
    const parameterDescription = {
        name: parameterName,
        type: parameterType,
        components: components,
    };
    return { parameterDescription, remaining };
}
// signature generation
function generateFullSignature(functionDescription) {
    return `${functionDescription.name}(${toFullParameters(functionDescription.inputs)})`;
}
exports.generateFullSignature = generateFullSignature;
function generateCanonicalSignature(functionDescription) {
    return `${functionDescription.name}(${toCanonicalParameters(functionDescription.inputs)})`;
}
exports.generateCanonicalSignature = generateCanonicalSignature;
function toFullParameters(parameters) {
    return parameters.map(toFullParameter).join(', ');
}
function toCanonicalParameters(parameters) {
    return parameters.map(toCanonicalParameter).join(',');
}
function toFullParameter(parameter) {
    if (parameter.type.startsWith('tuple')) {
        if (parameter.components === undefined)
            throw new Error(`Encountered a 'tuple' type that had no components.  Did you mean to include an empty array?`);
        return `(${toFullParameters(parameter.components)})${parameter.type.slice('tuple'.length)} ${parameter.name}`;
    }
    else {
        return `${parameter.type} ${parameter.name}`;
    }
}
function toCanonicalParameter(parameter) {
    if (parameter.type.startsWith('tuple')) {
        if (parameter.components === undefined)
            throw new Error(`Encountered a 'tuple' type that had no components.  Did you mean to include an empty array?`);
        return `(${toCanonicalParameters(parameter.components)})${parameter.type.slice('tuple'.length)}`;
    }
    else {
        return parameter.type;
    }
}
function decodeMethod(first, second, bytes) {
    if (typeof first === 'number')
        return decodeMethodWithSelector(first, second, bytes);
    else if (typeof second === 'string')
        return decodeMethodWithSignature(first, second, bytes);
    else
        return decodeMethodWithDescription(first, second, bytes);
}
exports.decodeMethod = decodeMethod;
async function decodeMethodWithDescription(keccak256, functionDescription, bytes) {
    const canonicalSignature = generateCanonicalSignature(functionDescription);
    const canonicalSignatureHash = await keccak256(new TextEncoder().encode(canonicalSignature));
    const functionSelector = canonicalSignatureHash >> 224n;
    return decodeMethodWithSelector(Number(functionSelector), functionDescription.inputs, bytes);
}
async function decodeMethodWithSignature(keccak256, functionSignature, bytes) {
    const functionDescription = parseSignature(functionSignature);
    return await decodeMethodWithDescription(keccak256, functionDescription, bytes);
}
function decodeMethodWithSelector(expectedSelector, parameterDescriptions, bytes) {
    const actualSelector = bytesToInteger(bytes.slice(0, 4));
    if (BigInt(expectedSelector) !== actualSelector)
        throw new Error(`Function selector of provided encoded method (${actualSelector.toString(16).padStart(8, '0')}) doesn't match expected selector (${expectedSelector.toString(16).padStart(8, '0')}).`);
    bytes = bytes.slice(4);
    return decodeParameters(parameterDescriptions, bytes);
}
function decodeParameters(descriptions, data) {
    let offset = 0;
    const decoded = {};
    for (let description of descriptions) {
        const { result, consumed } = decodeParameter(description, data, offset);
        offset += consumed;
        // it is possible that name is missing/null/empty string if there is only a single parameter, in which case we use the placeholder name 'result'
        decoded[description.name || 'result'] = result;
    }
    return decoded;
}
exports.decodeParameters = decodeParameters;
function decodeParameter(description, data, offset) {
    return tryDecodeFixedArray(description, data, offset)
        || tryDecodeDynamicArray(description, data, offset)
        || tryDecodeTuple(description, data, offset)
        || tryDecodeDynamicBytes(description, data, offset)
        || tryDecodeString(description, data, offset)
        || tryDecodeBoolean(description, data, offset)
        || tryDecodeNumber(description, data, offset)
        || tryDecodeNumber(description, data, offset)
        || tryDecodeAddress(description, data, offset)
        || tryDecodeFixedBytes(description, data, offset)
        || tryDecodeFixedPointNumber(description, data, offset)
        || tryDecodeFunction(description, data, offset)
        || function () { throw new Error(`Unsupported parameter type ${description.type}`); }();
}
function tryDecodeFixedArray(description, data, offset) {
    const match = /^(.*)\[(\d+)\]$/.exec(description.type);
    if (match === null)
        return null;
    const subdescription = Object.assign({}, description, { type: match[1] });
    const length = Number.parseInt(match[2], 10);
    if (isDynamic(subdescription)) {
        const pointer = Number(bytesToInteger(data.subarray(offset, offset + 32)));
        const result = [];
        let consumed = 0;
        for (let i = 0; i < length; ++i) {
            const { result: itemResult, consumed: itemConsumed } = decodeParameter(subdescription, data.subarray(pointer), consumed);
            consumed += itemConsumed;
            result.push(itemResult);
        }
        return { result, consumed };
    }
    else {
        const result = [];
        let consumed = 0;
        for (let i = 0; i < length; ++i) {
            const { result: itemResult, consumed: itemConsumed } = decodeParameter(subdescription, data, offset + consumed);
            consumed += itemConsumed;
            result.push(itemResult);
        }
        return { result, consumed };
    }
}
function tryDecodeDynamicArray(description, data, offset) {
    if (!description.type.endsWith('[]'))
        return null;
    const subtype = description.type.substring(0, description.type.length - 2);
    const subdescription = Object.assign({}, description, { type: subtype });
    const pointer = Number(bytesToInteger(data.subarray(offset, offset + 32)));
    const length = Number(bytesToInteger(data.subarray(pointer, pointer + 32)));
    const result = [];
    let consumed = 0;
    for (let i = 0; i < length; ++i) {
        const { result: itemResult, consumed: itemConsumed } = decodeParameter(subdescription, data.subarray(pointer + 32), consumed);
        consumed += itemConsumed;
        result.push(itemResult);
    }
    return { result, consumed: 32 };
}
function tryDecodeTuple(description, data, offset) {
    if (description.type !== 'tuple')
        return null;
    const result = {};
    let consumed = 0;
    if (description.components === undefined || description.components.length === 0) {
    }
    else if (anyIsDynamic(description.components)) {
        const pointer = Number(bytesToInteger(data.subarray(offset, offset + 32)));
        for (let component of description.components) {
            const { result: componentResult, consumed: componentConsumed } = decodeParameter(component, data.subarray(pointer), consumed);
            consumed += componentConsumed;
            result[component.name] = componentResult;
        }
        // from the point of view of the caller, we only consumed 32 bytes (the pointer)
        consumed = 32;
    }
    else {
        for (let component of description.components) {
            const { result: componentResult, consumed: componentConsumed } = decodeParameter(component, data, offset + consumed);
            consumed += componentConsumed;
            result[component.name] = componentResult;
        }
    }
    return { result, consumed };
}
function tryDecodeDynamicBytes(description, data, offset) {
    if (description.type !== 'bytes')
        return null;
    const pointer = Number(bytesToInteger(data.subarray(offset, offset + 32)));
    const length = Number(bytesToInteger(data.subarray(pointer, pointer + 32)));
    const bytes = data.subarray(pointer + 32, pointer + 32 + length);
    return { result: bytes, consumed: 32 };
}
function tryDecodeString(description, data, offset) {
    if (description.type !== 'string')
        return null;
    const pointer = Number(bytesToInteger(data.subarray(offset, offset + 32)));
    const length = Number(bytesToInteger(data.subarray(pointer, pointer + 32)));
    const bytes = data.subarray(pointer + 32, pointer + 32 + length);
    const decoded = new TextDecoder().decode(bytes);
    return { result: decoded, consumed: 32 };
}
function tryDecodeBoolean(description, data, offset) {
    if (description.type !== 'bool')
        return null;
    const bytes = data.subarray(offset, offset + 32);
    const decoded = (bytesToInteger(bytes) === 0n) ? false : true;
    return { result: !!decoded, consumed: 32 };
}
function tryDecodeNumber(description, data, offset) {
    const match = /^(u?)int(\d*)$/.exec(description.type);
    if (match === null)
        return null;
    const size = Number.parseInt(match[2]);
    if (size <= 0 || size > 256 || size % 8)
        return null;
    const signed = !match[1];
    const bytes = data.subarray(offset, offset + 32);
    const decoded = bytesToInteger(bytes, signed);
    if (!signed && decoded >= 2n ** BigInt(size))
        throw new Error(`Encoded number is bigger than the expected size.  Expected smaller than ${2n ** BigInt(size)}, but decoded ${decoded}.`);
    if (signed && decoded >= 2n ** BigInt(size - 1))
        throw new Error(`Encoded number is bigger than the expected size.  Expected smaller than ${2n ** BigInt(size - 1)}, but decoded ${decoded}.`);
    if (signed && decoded < -(2n ** BigInt(size - 1)))
        throw new Error(`Encoded number is bigger (negative) than the expected size.  Expected smaller (negative) than -${2n ** BigInt(size - 1)}, but decoded ${decoded}.`);
    return { result: decoded, consumed: 32 };
}
function tryDecodeAddress(description, data, offset) {
    if (description.type !== 'address')
        return null;
    const bytes = data.subarray(offset, offset + 32);
    const decoded = bytesToInteger(bytes);
    if (decoded >= 2n ** 160n)
        throw new Error(`Encoded value is bigger than the largest possible address.  Decoded value: 0x${decoded.toString(16)}.`);
    return { result: decoded, consumed: 32 };
}
function tryDecodeFixedBytes(description, data, offset) {
    const match = /^bytes(\d+)$/.exec(description.type);
    if (match === null)
        return null;
    const size = Number.parseInt(match[1]);
    if (size < 1 || size > 32)
        throw new Error(`Can only decode fixed length bytes values between 1 and 32 bytes.  Receivede 'bytes${size}'.`);
    const bytes = data.subarray(offset, offset + size);
    const decoded = bytesToInteger(bytes);
    const padding = data.subarray(offset + size, offset + 32);
    if (padding.some(x => x !== 0))
        throw new Error(`Encoded value contains extraneous unexpected bytes.  Extraneous bytes: 0x${Array.from(padding).map(x => x.toString(16).padStart(2, '0')).join('')}.`);
    return { result: decoded, consumed: 32 };
}
function tryDecodeFixedPointNumber(description, _data, _offset) {
    if (!/^u?fixed\d+x\d+$/.test(description.type))
        return null;
    throw new Error(`Encoding an EVM type ${description.type} is not supported`);
}
function tryDecodeFunction(description, _data, _offset) {
    if (description.type !== 'function')
        return null;
    throw new Error(`Decoding an EVM type ${description.type} is not supported`);
}
function encodeMethod(first, second, parameters) {
    if (typeof first === 'number')
        return encodeMethodWithSelector(first, second, parameters);
    else if (typeof second === 'string')
        return encodeMethodWithSignature(first, second, parameters);
    else
        return encodeMethodWithDescription(first, second, parameters);
}
exports.encodeMethod = encodeMethod;
async function encodeMethodWithDescription(keccak256, functionDescription, parameters) {
    const canonicalSignature = generateCanonicalSignature(functionDescription);
    const canonicalSignatureHash = await keccak256(new TextEncoder().encode(canonicalSignature));
    const functionSelector = canonicalSignatureHash >> 224n;
    return encodeMethod(Number(functionSelector), functionDescription.inputs, parameters);
}
async function encodeMethodWithSignature(keccak256, functionSignature, parameters) {
    const functionDescription = parseSignature(functionSignature);
    return await encodeMethodWithDescription(keccak256, functionDescription, parameters);
}
function encodeMethodWithSelector(functionSelector, parameterDescriptions, parameters) {
    const encodedParameters = encodeParameters(parameterDescriptions, parameters);
    return new Uint8Array([...integerToBytes(functionSelector, 4), ...encodedParameters]);
}
function encodeParameters(descriptions, parameters) {
    if (descriptions.length !== parameters.length)
        throw new Error(`Number of provided parameters (${parameters.length}) does not match number of expected parameters (${descriptions.length})`);
    const encodedParameters = parameters.map((nestedParameter, index) => encodeParameter(descriptions[index], nestedParameter));
    return encodeDynamicData(encodedParameters);
}
exports.encodeParameters = encodeParameters;
function encodeParameter(description, parameter) {
    return tryEncodeFixedArray(description, parameter)
        || tryEncodeDynamicArray(description, parameter)
        || tryEncodeTuple(description, parameter)
        || tryEncodeDynamicBytes(description, parameter)
        || tryEncodeString(description, parameter)
        || tryEncodeBoolean(description, parameter)
        || tryEncodeNumber(description, parameter)
        || tryEncodeAddress(description, parameter)
        || tryEncodeFixedBytes(description, parameter)
        || tryEncodeFixedPointNumber(description)
        || tryEncodeFunction(description)
        || function () { throw new Error(`Unsupported parameter type ${description.type}`); }();
}
function tryEncodeFixedArray(description, parameter) {
    const match = /^(.*)\[(\d+)\]$/.exec(description.type);
    if (match === null)
        return null;
    const size = Number.parseInt(match[2]);
    if (!Array.isArray(parameter) || parameter.length !== size)
        throw new Error(`Can only encode a JavaScript 'array' of length ${size} into an EVM 'array' of length ${size}\n${parameter}`);
    const nestedDescription = Object.assign({}, description, { type: match[1] });
    const encodedParameters = parameter.map(nestedParameter => encodeParameter(nestedDescription, nestedParameter));
    const isDynamic = encodedParameters.some(x => x.isDynamic);
    if (isDynamic) {
        return { isDynamic: isDynamic, bytes: encodeDynamicData(encodedParameters) };
    }
    else {
        return { isDynamic: isDynamic, bytes: concatenateBytes(encodedParameters.map(x => x.bytes)) };
    }
}
function tryEncodeDynamicArray(description, parameter) {
    if (!description.type.endsWith('[]'))
        return null;
    if (!Array.isArray(parameter))
        throw new Error(`Can only encode a JavaScript 'array' into an EVM 'array'\n${parameter}`);
    const nestedDescription = Object.assign({}, description, { type: description.type.substring(0, description.type.length - 2) });
    const encodedParameters = parameter.map(nestedParameter => encodeParameter(nestedDescription, nestedParameter));
    const lengthBytes = integerToBytes(encodedParameters.length);
    return { isDynamic: true, bytes: concatenateBytes([lengthBytes, encodeDynamicData(encodedParameters)]) };
}
function tryEncodeTuple(description, parameter) {
    if (description.type !== 'tuple')
        return null;
    if (typeof parameter !== 'object')
        throw new Error(`Can only encode a JavaScript 'object' or a JavaScript array into an EVM 'tuple'\n${parameter}`);
    if (description.components === undefined || description.components.length === 0) {
        return { isDynamic: false, bytes: new Uint8Array(0) };
    }
    else {
        const encodableTupleOrArray = parameter;
        const encodedComponents = description.components.map((component, index) => {
            const parameter = isEncodableArray(encodableTupleOrArray) ? encodableTupleOrArray[index] : encodableTupleOrArray[component.name];
            return encodeParameter(component, parameter);
        });
        const isDynamic = encodedComponents.some(x => x.isDynamic);
        return { isDynamic: isDynamic, bytes: isDynamic ? encodeDynamicData(encodedComponents) : concatenateBytes(encodedComponents.map(x => x.bytes)) };
    }
}
function tryEncodeDynamicBytes(description, parameter) {
    if (description.type !== 'bytes')
        return null;
    if (!(parameter instanceof Uint8Array))
        throw new Error(`Can only encode a JavaScript 'Uint8Array' into EVM 'bytes'\n${parameter}`);
    return { isDynamic: true, bytes: padAndLengthPrefix(parameter) };
}
function tryEncodeString(description, parameter) {
    if (description.type !== 'string')
        return null;
    if (typeof parameter !== 'string')
        throw new Error(`Can only encode a JavaScript 'string' into an EVM 'string'\n${parameter}`);
    const encoded = new TextEncoder().encode(parameter);
    return { isDynamic: true, bytes: padAndLengthPrefix(encoded) };
}
function tryEncodeBoolean(description, parameter) {
    if (description.type !== 'bool')
        return null;
    if (typeof parameter !== 'boolean')
        throw new Error(`Can only encode JavaScript 'boolean' into EVM 'bool'\n${parameter}`);
    const bytes = new Uint8Array(32);
    bytes.set([parameter ? 1 : 0], 31);
    return { isDynamic: false, bytes };
}
function tryEncodeNumber(description, parameter) {
    const match = /^(u?)int(\d*)$/.exec(description.type);
    if (match === null)
        return null;
    if (typeof parameter !== 'bigint')
        throw new Error(`Can only encode a JavaScript 'bigint' into an EVM '${description.type}'\n${parameter}`);
    const size = Number.parseInt(match[2]);
    if (size <= 0 || size > 256 || size % 8)
        throw new Error(`EVM numbers must be in range [8, 256] and must be divisible by 8.`);
    const signed = !match[1];
    if (!signed && parameter >= 2n ** BigInt(size))
        throw new Error(`Attempted to encode ${parameter} into a ${description.type}, but it is too big to fit.`);
    if (!signed && parameter < 0n)
        throw new Error(`Attempted to encode ${parameter} into a ${description.type}, but you cannot encode negative numbers into a ${description.type}.`);
    if (signed && parameter >= 2n ** BigInt(size - 1))
        throw new Error(`Attempted to encode ${parameter} into a ${description.type}, but it is too big to fit.`);
    if (signed && parameter < -(2n ** BigInt(size - 1)))
        throw new Error(`Attempted to encode ${parameter} into a ${description.type}, but it is too big (of a negative number) to fit.`);
    const bytes = integerToBytes(parameter, 32, signed);
    return { isDynamic: false, bytes };
}
function tryEncodeAddress(description, parameter) {
    if (description.type !== 'address')
        return null;
    if (typeof parameter !== 'bigint')
        throw new Error(`Can only encode JavaScript 'bigint' into EVM 'address'\n${parameter}`);
    if (parameter > 0xffffffffffffffffffffffffffffffffffffffffn)
        throw new Error(`Attempted to encode 0x${parameter.toString(16)} into an EVM address, but it is too big to fit.`);
    if (parameter < 0n)
        throw new Error(`Attempted to encode ${parameter} into an EVM address, but addresses must be positive numbers.`);
    return { isDynamic: false, bytes: padLeftTo32Bytes(integerToBytes(parameter, 20)) };
}
function tryEncodeFixedBytes(description, parameter) {
    const match = /^bytes(\d+)$/.exec(description.type);
    if (match === null)
        return null;
    const size = Number.parseInt(match[1]);
    if (typeof parameter !== 'bigint')
        throw new Error(`Can only encode JavaScript 'bigint' into EVM 'bytes${size}'\n${parameter}`);
    if (parameter >= 2n ** BigInt(size * 8))
        throw new Error(`Attempted to encode 0x${parameter.toString(16)} into an EVM ${description.type}, but it is too big to fit.`);
    if (parameter < 0n)
        throw new Error(`Attempted to encode -0x${parameter.toString(16).slice(1)} into an EVM ${description.type}, but you cannot encode negative numbers into a ${description.type}.`);
    return { isDynamic: false, bytes: padRightTo32Bytes(integerToBytes(parameter, size)) };
}
function tryEncodeFixedPointNumber(description) {
    if (!/^u?fixed\d+x\d+$/.test(description.type))
        return null;
    throw new Error(`Encoding into EVM type ${description.type} is not supported`);
}
function tryEncodeFunction(description) {
    if (description.type !== 'function')
        return null;
    throw new Error(`Encoding into EVM type ${description.type} is not supported`);
}
// events
async function decodeUnknownEvent(keccak256, abi, topics, data) {
    for (const eventDescription of abi) {
        if (!isEventDescription(eventDescription))
            continue;
        const canonicalSignature = `${eventDescription.name}(${eventDescription.inputs.map(parameter => parameter.type).join(",")})`;
        const signatureHash = await keccak256(new TextEncoder().encode(canonicalSignature));
        if (topics[0] !== signatureHash)
            continue;
        return decodeEvent(eventDescription, topics, data);
    }
    throw new Error(`No event description matched the event ${topics[0]}`);
}
exports.decodeUnknownEvent = decodeUnknownEvent;
function decodeEvent(eventDescription, topics, data) {
    // CONSIDER: should we take in a hash function so we can verify topics[0] matches, or just blindly extract?
    const decodedParameters = decodeEventParameters(eventDescription.inputs, topics, data);
    return { name: eventDescription.name, parameters: decodedParameters };
}
exports.decodeEvent = decodeEvent;
function decodeEventParameters(parameters, topics, data) {
    const indexedTypesForDecoding = parameters.filter(parameter => parameter.indexed).map(getTypeForEventDecoding);
    const nonIndexedTypesForDecoding = parameters.filter(parameter => !parameter.indexed);
    const indexedData = concatenateBytes(topics.slice(1).map(topic => integerToBytes(topic)));
    const nonIndexedData = data;
    const decodedIndexedParameters = decodeParameters(indexedTypesForDecoding, indexedData);
    if (!decodedIndexedParameters)
        throw new Error(`Failed to decode topics for event ${topics[0]}.\n${indexedData}`);
    const decodedNonIndexedParameters = decodeParameters(nonIndexedTypesForDecoding, nonIndexedData);
    if (!decodedNonIndexedParameters)
        throw new Error(`Failed to decode data for event ${topics[0]}.\n${nonIndexedData}`);
    return Object.assign({}, decodedIndexedParameters, decodedNonIndexedParameters);
}
function getTypeForEventDecoding(parameter) {
    if (!parameter.indexed)
        return parameter;
    if (parameter.type !== 'string'
        && parameter.type !== 'bytes'
        // TODO: check to see if we need to collapse fixed size tuples or not
        && !parameter.type.startsWith('tuple')
        // TODO: check to see if we need to collapse fixed length arrays here or not
        && !parameter.type.endsWith('[]'))
        return parameter;
    return Object.assign({}, parameter, { type: 'bytes32' });
}
function isEventDescription(maybe) { return maybe.type === 'event'; }
// helpers
function padLeftTo32Bytes(input) {
    const length = (input.length % 32)
        ? input.length + 32 - input.length % 32
        : input.length;
    const result = new Uint8Array(length);
    result.set(input, result.length - input.length);
    return result;
}
function padRightTo32Bytes(input) {
    const length = (input.length % 32)
        ? input.length + 32 - input.length % 32
        : input.length;
    const result = new Uint8Array(length);
    result.set(input, 0);
    return result;
}
function concatenateBytes(source) {
    return new Uint8Array(source.flatMap(x => [...x]));
}
function padAndLengthPrefix(source) {
    const length = source.length;
    const padded = padRightTo32Bytes(source);
    return concatenateBytes([integerToBytes(length), padded]);
}
function encodeDynamicData(encodedData) {
    let staticBytesSize = 0;
    for (let encodedParameter of encodedData) {
        if (encodedParameter.isDynamic)
            staticBytesSize += 32;
        else
            staticBytesSize += encodedParameter.bytes.length;
    }
    const staticBytes = [];
    const dynamicBytes = [];
    for (let encodedParameter of encodedData) {
        if (encodedParameter.isDynamic) {
            const dynamicBytesAppendedSoFar = dynamicBytes.reduce((total, bytes) => total += bytes.length, 0);
            staticBytes.push(integerToBytes(staticBytesSize + dynamicBytesAppendedSoFar));
            dynamicBytes.push(encodedParameter.bytes);
        }
        else {
            staticBytes.push(encodedParameter.bytes);
        }
    }
    return concatenateBytes([...staticBytes, ...dynamicBytes]);
}
function anyIsDynamic(descriptions) {
    for (let description of descriptions) {
        if (isDynamic(description))
            return true;
    }
    return false;
}
function isDynamic(description) {
    if (description.type === 'string')
        return true;
    if (description.type === 'bytes')
        return true;
    if (description.type.endsWith('[]'))
        return true;
    const fixedArrayMatcher = /^(.*)\[(\d+)\]$/.exec(description.type);
    if (fixedArrayMatcher !== null && isDynamic(Object.assign({}, description, { type: fixedArrayMatcher[1] })))
        return true;
    if (description.type === 'tuple' && anyIsDynamic(description.components || []))
        return true;
    return false;
}
function isEncodableArray(maybe) {
    return Array.isArray(maybe);
}
function bytesToInteger(bytes, signed = false) {
    return signed
        ? bytesToSigned(bytes)
        : bytesToUnsigned(bytes);
}
function integerToBytes(value, byteWidth = 32, signed = false) {
    return signed
        ? signedToBytes(value, byteWidth)
        : unsignedToBytes(value, byteWidth);
}
function bytesToUnsigned(bytes) {
    let value = 0n;
    for (let byte of bytes) {
        value = (value << 8n) + BigInt(byte);
    }
    return value;
}
function bytesToSigned(bytes) {
    const unsignedValue = bytesToUnsigned(bytes);
    return twosComplement(unsignedValue, bytes.length * 8);
}
function unsignedToBytes(value, byteWidth = 32) {
    if (typeof value === 'number')
        value = BigInt(value);
    const bits = byteWidth * 8;
    if (value >= 2n ** BigInt(bits) || value < 0n)
        throw new Error(`Cannot fit ${value} into a ${bits}-bit unsigned integer.`);
    const result = new Uint8Array(byteWidth);
    for (let i = 0; i < byteWidth; ++i) {
        result[i] = Number((value >> BigInt(bits - i * 8 - 8)) & 0xffn);
    }
    return result;
}
function signedToBytes(value, byteWidth = 32) {
    if (typeof value === 'number')
        value = BigInt(value);
    const bits = byteWidth * 8;
    if (value >= 2n ** (BigInt(bits) - 1n) || value < -(2n ** (BigInt(bits) - 1n)))
        throw new Error(`Cannot fit ${value} into a ${bits}-bit signed integer.`);
    const unsignedValue = twosComplement(value, bits);
    return unsignedToBytes(unsignedValue);
}
function twosComplement(value, numberOfBits) {
    const mask = 2n ** (BigInt(numberOfBits) - 1n) - 1n;
    return (value & mask) - (value & ~mask);
}
//# sourceMappingURL=index.js.map
