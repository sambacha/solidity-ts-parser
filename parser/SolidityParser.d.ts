import { CommonTokenStream, Parser, ParserRuleContext, Token } from "antlr4";
import { TerminalNode } from "antlr4/tree/Tree";

export declare class SourceUnitContext extends ParserRuleContext {}

export declare class PragmaDirectiveContext extends ParserRuleContext {
  pragmaName(): PragmaNameContext;

  pragmaValue(): PragmaValueContext;
}

export declare class PragmaNameContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class PragmaValueContext extends ParserRuleContext {
  version(): VersionContext;

  expression(): ExpressionContext;
}

export declare class VersionContext extends ParserRuleContext {}

export declare class VersionOperatorContext extends ParserRuleContext {}

export declare class VersionConstraintContext extends ParserRuleContext {
  VersionLiteral(): TerminalNode;

  versionOperator(): VersionOperatorContext;
}

export declare class ImportDeclarationContext extends ParserRuleContext {}

export declare class ImportDirectiveContext extends ParserRuleContext {
  StringLiteral(): TerminalNode;
}

export declare class NatSpecContext extends ParserRuleContext {
  NatSpecSingleLine(): TerminalNode;

  NatSpecMultiLine(): TerminalNode;
}

export declare class ContractDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  natSpec(): NatSpecContext;
}

export declare class InheritanceSpecifierContext extends ParserRuleContext {
  userDefinedTypeName(): UserDefinedTypeNameContext;

  expressionList(): ExpressionListContext;
}

export declare class ContractPartContext extends ParserRuleContext {
  stateVariableDeclaration(): StateVariableDeclarationContext;

  usingForDeclaration(): UsingForDeclarationContext;

  structDefinition(): StructDefinitionContext;

  constructorDefinition(): ConstructorDefinitionContext;

  modifierDefinition(): ModifierDefinitionContext;

  functionDefinition(): FunctionDefinitionContext;

  eventDefinition(): EventDefinitionContext;

  enumDefinition(): EnumDefinitionContext;
}

export declare class StateVariableDeclarationContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  identifier(): IdentifierContext;

  expression(): ExpressionContext;
}

export declare class UsingForDeclarationContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  typeName(): TypeNameContext;
}

export declare class StructDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class ConstructorDefinitionContext extends ParserRuleContext {
  parameterList(): ParameterListContext;

  modifierList(): ModifierListContext;

  block(): BlockContext;
}

export declare class ModifierDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  block(): BlockContext;

  parameterList(): ParameterListContext;
}

export declare class ModifierInvocationContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  expressionList(): ExpressionListContext;
}

export declare class FunctionDefinitionContext extends ParserRuleContext {
  parameterList(): ParameterListContext;

  modifierList(): ModifierListContext;

  block(): BlockContext;

  natSpec(): NatSpecContext;

  identifier(): IdentifierContext;

  returnParameters(): ReturnParametersContext;
}

export declare class ReturnParametersContext extends ParserRuleContext {
  parameterList(): ParameterListContext;
}

export declare class ModifierListContext extends ParserRuleContext {}

export declare class EventDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  eventParameterList(): EventParameterListContext;

  natSpec(): NatSpecContext;

  AnonymousKeyword(): TerminalNode;
}

export declare class EnumValueContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class EnumDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class ParameterListContext extends ParserRuleContext {}

export declare class ParameterContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  storageLocation(): StorageLocationContext;

  identifier(): IdentifierContext;
}

export declare class EventParameterListContext extends ParserRuleContext {}

export declare class EventParameterContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  IndexedKeyword(): TerminalNode;

  identifier(): IdentifierContext;
}

export declare class FunctionTypeParameterListContext extends ParserRuleContext {}

export declare class FunctionTypeParameterContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  storageLocation(): StorageLocationContext;
}

export declare class VariableDeclarationContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  identifier(): IdentifierContext;

  storageLocation(): StorageLocationContext;
}

export declare class UserDefinedTypeNameContext extends ParserRuleContext {}

export declare class MappingContext extends ParserRuleContext {
  elementaryTypeName(): ElementaryTypeNameContext;

  typeName(): TypeNameContext;
}

export declare class FunctionTypeNameContext extends ParserRuleContext {}

export declare class StorageLocationContext extends ParserRuleContext {}

export declare class StateMutabilityContext extends ParserRuleContext {
  PureKeyword(): TerminalNode;

  ConstantKeyword(): TerminalNode;

  ViewKeyword(): TerminalNode;

  PayableKeyword(): TerminalNode;
}

export declare class BlockContext extends ParserRuleContext {}

export declare class StatementContext extends ParserRuleContext {
  ifStatement(): IfStatementContext;

  whileStatement(): WhileStatementContext;

  forStatement(): ForStatementContext;

  block(): BlockContext;

  inlineAssemblyStatement(): InlineAssemblyStatementContext;

  doWhileStatement(): DoWhileStatementContext;

  continueStatement(): ContinueStatementContext;

  breakStatement(): BreakStatementContext;

  returnStatement(): ReturnStatementContext;

  throwStatement(): ThrowStatementContext;

  emitStatement(): EmitStatementContext;

  simpleStatement(): SimpleStatementContext;
}

export declare class ExpressionStatementContext extends ParserRuleContext {
  expression(): ExpressionContext;
}

export declare class IfStatementContext extends ParserRuleContext {
  expression(): ExpressionContext;
}

export declare class WhileStatementContext extends ParserRuleContext {
  expression(): ExpressionContext;

  statement(): StatementContext;
}

export declare class SimpleStatementContext extends ParserRuleContext {
  variableDeclarationStatement(): VariableDeclarationStatementContext;

  expressionStatement(): ExpressionStatementContext;
}

export declare class ForStatementContext extends ParserRuleContext {
  statement(): StatementContext;

  simpleStatement(): SimpleStatementContext;

  expressionStatement(): ExpressionStatementContext;

  expression(): ExpressionContext;
}

export declare class InlineAssemblyStatementContext extends ParserRuleContext {
  assemblyBlock(): AssemblyBlockContext;

  StringLiteral(): TerminalNode;
}

export declare class DoWhileStatementContext extends ParserRuleContext {
  statement(): StatementContext;

  expression(): ExpressionContext;
}

export declare class ContinueStatementContext extends ParserRuleContext {
  ContinueKeyword(): TerminalNode;
}

export declare class BreakStatementContext extends ParserRuleContext {
  BreakKeyword(): TerminalNode;
}

export declare class ReturnStatementContext extends ParserRuleContext {
  expression(): ExpressionContext;
}

export declare class ThrowStatementContext extends ParserRuleContext {}

export declare class EmitStatementContext extends ParserRuleContext {
  functionCall(): FunctionCallContext;
}

export declare class VariableDeclarationStatementContext extends ParserRuleContext {
  identifierList(): IdentifierListContext;

  variableDeclaration(): VariableDeclarationContext;

  variableDeclarationList(): VariableDeclarationListContext;

  expression(): ExpressionContext;
}

export declare class VariableDeclarationListContext extends ParserRuleContext {}

export declare class IdentifierListContext extends ParserRuleContext {}

export declare class ElementaryTypeNameContext extends ParserRuleContext {
  Int(): TerminalNode;

  Uint(): TerminalNode;

  Byte(): TerminalNode;

  Fixed(): TerminalNode;

  Ufixed(): TerminalNode;
}

export declare class PrimaryExpressionContext extends ParserRuleContext {
  BooleanLiteral(): TerminalNode;

  numberLiteral(): NumberLiteralContext;

  HexLiteral(): TerminalNode;

  StringLiteral(): TerminalNode;

  identifier(): IdentifierContext;

  TypeKeyword(): TerminalNode;

  tupleExpression(): TupleExpressionContext;

  typeNameExpression(): TypeNameExpressionContext;
}

export declare class ExpressionListContext extends ParserRuleContext {}

export declare class NameValueListContext extends ParserRuleContext {}

export declare class NameValueContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  expression(): ExpressionContext;
}

export declare class FunctionCallArgumentsContext extends ParserRuleContext {
  nameValueList(): NameValueListContext;

  expressionList(): ExpressionListContext;
}

export declare class FunctionCallContext extends ParserRuleContext {
  expression(): ExpressionContext;

  functionCallArguments(): FunctionCallArgumentsContext;
}

export declare class AssemblyBlockContext extends ParserRuleContext {}

export declare class AssemblyItemContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  assemblyBlock(): AssemblyBlockContext;

  assemblyExpression(): AssemblyExpressionContext;

  assemblyLocalDefinition(): AssemblyLocalDefinitionContext;

  assemblyAssignment(): AssemblyAssignmentContext;

  assemblyStackAssignment(): AssemblyStackAssignmentContext;

  labelDefinition(): LabelDefinitionContext;

  assemblySwitch(): AssemblySwitchContext;

  assemblyFunctionDefinition(): AssemblyFunctionDefinitionContext;

  assemblyFor(): AssemblyForContext;

  assemblyIf(): AssemblyIfContext;

  BreakKeyword(): TerminalNode;

  ContinueKeyword(): TerminalNode;

  subAssembly(): SubAssemblyContext;

  numberLiteral(): NumberLiteralContext;

  StringLiteral(): TerminalNode;

  HexLiteral(): TerminalNode;
}

export declare class AssemblyExpressionContext extends ParserRuleContext {
  assemblyCall(): AssemblyCallContext;

  assemblyLiteral(): AssemblyLiteralContext;
}

export declare class AssemblyCallContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class AssemblyLocalDefinitionContext extends ParserRuleContext {
  assemblyIdentifierOrList(): AssemblyIdentifierOrListContext;

  assemblyExpression(): AssemblyExpressionContext;
}

export declare class AssemblyAssignmentContext extends ParserRuleContext {
  assemblyIdentifierOrList(): AssemblyIdentifierOrListContext;

  assemblyExpression(): AssemblyExpressionContext;
}

export declare class AssemblyIdentifierOrListContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  assemblyIdentifierList(): AssemblyIdentifierListContext;
}

export declare class AssemblyIdentifierListContext extends ParserRuleContext {}

export declare class AssemblyStackAssignmentContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class LabelDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;
}

export declare class AssemblySwitchContext extends ParserRuleContext {
  assemblyExpression(): AssemblyExpressionContext;
}

export declare class AssemblyCaseContext extends ParserRuleContext {
  assemblyLiteral(): AssemblyLiteralContext;

  assemblyBlock(): AssemblyBlockContext;
}

export declare class AssemblyFunctionDefinitionContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  assemblyBlock(): AssemblyBlockContext;

  assemblyIdentifierList(): AssemblyIdentifierListContext;

  assemblyFunctionReturns(): AssemblyFunctionReturnsContext;
}

export declare class AssemblyFunctionReturnsContext extends ParserRuleContext {
  assemblyIdentifierList(): AssemblyIdentifierListContext;
}

export declare class AssemblyForContext extends ParserRuleContext {}

export declare class AssemblyIfContext extends ParserRuleContext {
  assemblyExpression(): AssemblyExpressionContext;

  assemblyBlock(): AssemblyBlockContext;
}

export declare class AssemblyLiteralContext extends ParserRuleContext {
  StringLiteral(): TerminalNode;

  DecimalNumber(): TerminalNode;

  HexNumber(): TerminalNode;

  HexLiteral(): TerminalNode;
}

export declare class SubAssemblyContext extends ParserRuleContext {
  identifier(): IdentifierContext;

  assemblyBlock(): AssemblyBlockContext;
}

export declare class TupleExpressionContext extends ParserRuleContext {}

export declare class TypeNameExpressionContext extends ParserRuleContext {
  elementaryTypeName(): ElementaryTypeNameContext;

  userDefinedTypeName(): UserDefinedTypeNameContext;
}

export declare class NumberLiteralContext extends ParserRuleContext {
  DecimalNumber(): TerminalNode;

  HexNumber(): TerminalNode;

  NumberUnit(): TerminalNode;
}

export declare class IdentifierContext extends ParserRuleContext {
  Identifier(): TerminalNode;
}

export declare class TypeNameContext extends ParserRuleContext {
  elementaryTypeName(): ElementaryTypeNameContext;

  userDefinedTypeName(): UserDefinedTypeNameContext;

  mapping(): MappingContext;

  functionTypeName(): FunctionTypeNameContext;

  PayableKeyword(): TerminalNode;

  typeName(): TypeNameContext;

  expression(): ExpressionContext;
}

export declare class ExpressionContext extends ParserRuleContext {
  typeName(): TypeNameContext;

  primaryExpression(): PrimaryExpressionContext;

  functionCallArguments(): FunctionCallArgumentsContext;

  identifier(): IdentifierContext;
}

export declare class SolidityParser extends Parser {
  readonly ruleNames: string[];
  readonly literalNames: string[];
  readonly symbolicNames: string[];

  constructor(input: CommonTokenStream);

  sourceUnit(): SourceUnitContext;

  pragmaDirective(): PragmaDirectiveContext;

  pragmaName(): PragmaNameContext;

  pragmaValue(): PragmaValueContext;

  version(): VersionContext;

  versionOperator(): VersionOperatorContext;

  versionConstraint(): VersionConstraintContext;

  importDeclaration(): ImportDeclarationContext;

  importDirective(): ImportDirectiveContext;

  natSpec(): NatSpecContext;

  contractDefinition(): ContractDefinitionContext;

  inheritanceSpecifier(): InheritanceSpecifierContext;

  contractPart(): ContractPartContext;

  stateVariableDeclaration(): StateVariableDeclarationContext;

  usingForDeclaration(): UsingForDeclarationContext;

  structDefinition(): StructDefinitionContext;

  constructorDefinition(): ConstructorDefinitionContext;

  modifierDefinition(): ModifierDefinitionContext;

  modifierInvocation(): ModifierInvocationContext;

  functionDefinition(): FunctionDefinitionContext;

  returnParameters(): ReturnParametersContext;

  modifierList(): ModifierListContext;

  eventDefinition(): EventDefinitionContext;

  enumValue(): EnumValueContext;

  enumDefinition(): EnumDefinitionContext;

  parameterList(): ParameterListContext;

  parameter(): ParameterContext;

  eventParameterList(): EventParameterListContext;

  eventParameter(): EventParameterContext;

  functionTypeParameterList(): FunctionTypeParameterListContext;

  functionTypeParameter(): FunctionTypeParameterContext;

  variableDeclaration(): VariableDeclarationContext;

  userDefinedTypeName(): UserDefinedTypeNameContext;

  mapping(): MappingContext;

  functionTypeName(): FunctionTypeNameContext;

  storageLocation(): StorageLocationContext;

  stateMutability(): StateMutabilityContext;

  block(): BlockContext;

  statement(): StatementContext;

  expressionStatement(): ExpressionStatementContext;

  ifStatement(): IfStatementContext;

  whileStatement(): WhileStatementContext;

  simpleStatement(): SimpleStatementContext;

  forStatement(): ForStatementContext;

  inlineAssemblyStatement(): InlineAssemblyStatementContext;

  doWhileStatement(): DoWhileStatementContext;

  continueStatement(): ContinueStatementContext;

  breakStatement(): BreakStatementContext;

  returnStatement(): ReturnStatementContext;

  throwStatement(): ThrowStatementContext;

  emitStatement(): EmitStatementContext;

  variableDeclarationStatement(): VariableDeclarationStatementContext;

  variableDeclarationList(): VariableDeclarationListContext;

  identifierList(): IdentifierListContext;

  elementaryTypeName(): ElementaryTypeNameContext;

  primaryExpression(): PrimaryExpressionContext;

  expressionList(): ExpressionListContext;

  nameValueList(): NameValueListContext;

  nameValue(): NameValueContext;

  functionCallArguments(): FunctionCallArgumentsContext;

  functionCall(): FunctionCallContext;

  assemblyBlock(): AssemblyBlockContext;

  assemblyItem(): AssemblyItemContext;

  assemblyExpression(): AssemblyExpressionContext;

  assemblyCall(): AssemblyCallContext;

  assemblyLocalDefinition(): AssemblyLocalDefinitionContext;

  assemblyAssignment(): AssemblyAssignmentContext;

  assemblyIdentifierOrList(): AssemblyIdentifierOrListContext;

  assemblyIdentifierList(): AssemblyIdentifierListContext;

  assemblyStackAssignment(): AssemblyStackAssignmentContext;

  labelDefinition(): LabelDefinitionContext;

  assemblySwitch(): AssemblySwitchContext;

  assemblyCase(): AssemblyCaseContext;

  assemblyFunctionDefinition(): AssemblyFunctionDefinitionContext;

  assemblyFunctionReturns(): AssemblyFunctionReturnsContext;

  assemblyFor(): AssemblyForContext;

  assemblyIf(): AssemblyIfContext;

  assemblyLiteral(): AssemblyLiteralContext;

  subAssembly(): SubAssemblyContext;

  tupleExpression(): TupleExpressionContext;

  typeNameExpression(): TypeNameExpressionContext;

  numberLiteral(): NumberLiteralContext;

  identifier(): IdentifierContext;
}
