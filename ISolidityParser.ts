// Proof of Concept
// SPDX-License-Idnentifier: ISC
import { InputStream } from "./InputStream";
import { CommonTokenStream } from "./CommonTokenStream";
import { SolidityParser } from "./SolidityParser";
import { SolidityLexer } from "./SolidityLexer";

const inputStream = new InputStream("./test/test.sol");
const lexer = new SolidityLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new SolidityParser(tokenStream);

// Parse the input, where `compilationUnit` is entry point
const tree = parser.compilationUnit();
console.log(tree);
