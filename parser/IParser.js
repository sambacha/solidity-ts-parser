const antlr4 = require("antlr4");
const InputStream = antlr4.InputStream;
const CommonTokenStream = antlr4.CommonTokenStream;

const SolidityParser = require("./SolidityParser.js").SolidityParser;
const SolidityLexer = require("./SolidityLexer.js").SolidityLexer;

const inputStream = new InputStream("Greeter.sol;");
const lexer = new SolidityLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new SolidityParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
const tree = parser.Greeter();
console.log(tree);
