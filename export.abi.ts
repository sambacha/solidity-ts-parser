export declare type Encodable = EncodablePrimitive | EncodableTuple | EncodableArray;
export declare type EncodablePrimitive = Uint8Array | string | boolean | bigint;
export interface EncodableTuple {
    [x: string]: Encodable;
}
export interface EncodableArray extends ReadonlyArray<Encodable> {
}
export interface FunctionDescription {
    readonly type?: 'function';
    readonly name: string;
    readonly inputs: ReadonlyArray<ParameterDescription>;
    readonly outputs?: ReadonlyArray<ParameterDescription>;
    readonly stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
}
export interface EventDescription {
    readonly type: 'event';
    readonly name: string;
    readonly inputs: ReadonlyArray<EventParameterDescription>;
    readonly anonymous?: boolean;
}
export interface ConstructorDescription {
    readonly type: 'constructor';
    readonly inputs?: ReadonlyArray<ParameterDescription>;
    readonly stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
}
export interface FallbackDescription {
    readonly type: 'fallback';
    readonly stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
}
export declare type AbiDescription = FunctionDescription | EventDescription | ConstructorDescription | FallbackDescription;
export interface ParameterDescription {
    readonly name: string;
    readonly type: string;
    readonly components?: ReadonlyArray<ParameterDescription>;
}
export interface EventParameterDescription extends ParameterDescription {
    readonly indexed: boolean;
}
export interface DecodedEvent {
    readonly name: string;
    readonly parameters: EncodableTuple;
}
export declare function parseSignature(functionSignature: string): FunctionDescription;
export declare function generateFullSignature(functionDescription: FunctionDescription): string;
export declare function generateCanonicalSignature(functionDescription: FunctionDescription): string;
export declare function decodeMethod(keccak256: (message: Uint8Array) => Promise<bigint>, functionDescription: FunctionDescription, bytes: Uint8Array): Promise<EncodableTuple>;
export declare function decodeMethod(keccak256: (message: Uint8Array) => Promise<bigint>, functionSignature: string, bytes: Uint8Array): Promise<EncodableTuple>;
export declare function decodeMethod(functionSelector: number, parameterDescriptions: ReadonlyArray<ParameterDescription>, bytes: Uint8Array): EncodableTuple;
export declare function decodeParameters(descriptions: ReadonlyArray<ParameterDescription>, data: Uint8Array): EncodableTuple;
export declare function encodeMethod(keccak256: (message: Uint8Array) => Promise<bigint>, functionDescription: FunctionDescription, parameters: EncodableArray): Promise<Uint8Array>;
export declare function encodeMethod(keccak256: (message: Uint8Array) => Promise<bigint>, functionSignature: string, parameters: EncodableArray): Promise<Uint8Array>;
export declare function encodeMethod(functionSelector: number, parameterDescriptions: ReadonlyArray<ParameterDescription>, parameters: EncodableArray): Uint8Array;
export declare function encodeParameters(descriptions: ReadonlyArray<ParameterDescription>, parameters: EncodableArray): Uint8Array;
export declare function decodeUnknownEvent(keccak256: (message: Uint8Array) => Promise<bigint>, abi: ReadonlyArray<AbiDescription>, topics: ReadonlyArray<bigint>, data: Uint8Array): Promise<DecodedEvent>;
export declare function decodeEvent(eventDescription: EventDescription, topics: ReadonlyArray<bigint>, data: Uint8Array): DecodedEvent;
declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }
