// Parser Interface Example
// SPDX-License-Idnentifier: ISC
import { InputStream } from "./InputStream.ts";
import { CommonTokenStream } from "./CommonTokenStream.ts";
import { SolidityParser } from "./SolidityParser.ts";
import { SolidityLexer } from "./SolidityLexer.ts";

const inputStream = new InputStream("./${INPUT}.sol");
const lexer = new SolidityLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new SolidityParser(tokenStream);

// Parse the input, where `compilationUnit` is entry point
const tree = parser.compilationUnit();
console.log(tree);
