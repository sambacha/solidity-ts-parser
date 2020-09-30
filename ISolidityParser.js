"use strict";
exports.__esModule = true;
// Proof of Concept
// SPDX-License-Idnentifier: ISC
var InputStream_1 = require("./InputStream");
var CommonTokenStream_1 = require("./CommonTokenStream");
var SolidityParser_1 = require("./SolidityParser");
var SolidityLexer_1 = require("./SolidityLexer");
var inputStream = new InputStream_1.InputStream("./Greeter.sol");
var lexer = new SolidityLexer_1.SolidityLexer(inputStream);
var tokenStream = new CommonTokenStream_1.CommonTokenStream(lexer);
var parser = new SolidityParser_1.SolidityParser(tokenStream);
// Parse the input, where `compilationUnit` is entry point
var tree = parser.compilationUnit();
console.log(tree);
