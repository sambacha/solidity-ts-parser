import { CommonTokenStream, ParserRuleContext, Token } from "antlr4";
import { ErrorNode, ParseTreeListener, TerminalNode } from "antlr4/tree/Tree";

import { SourceUnitContext } from "./SolidityParser";

import { PragmaDirectiveContext } from "./SolidityParser";

import { PragmaNameContext } from "./SolidityParser";

import { PragmaValueContext } from "./SolidityParser";

import { VersionContext } from "./SolidityParser";

import { VersionOperatorContext } from "./SolidityParser";

import { VersionConstraintContext } from "./SolidityParser";

import { ImportDeclarationContext } from "./SolidityParser";

import { ImportDirectiveContext } from "./SolidityParser";

import { NatSpecContext } from "./SolidityParser";

import { ContractDefinitionContext } from "./SolidityParser";

import { InheritanceSpecifierContext } from "./SolidityParser";

import { ContractPartContext } from "./SolidityParser";

import { StateVariableDeclarationContext } from "./SolidityParser";

import { UsingForDeclarationContext } from "./SolidityParser";

import { StructDefinitionContext } from "./SolidityParser";

import { ConstructorDefinitionContext } from "./SolidityParser";

import { ModifierDefinitionContext } from "./SolidityParser";

import { ModifierInvocationContext } from "./SolidityParser";

import { FunctionDefinitionContext } from "./SolidityParser";

import { ReturnParametersContext } from "./SolidityParser";

import { ModifierListContext } from "./SolidityParser";

import { EventDefinitionContext } from "./SolidityParser";

import { EnumValueContext } from "./SolidityParser";

import { EnumDefinitionContext } from "./SolidityParser";

import { ParameterListContext } from "./SolidityParser";

import { ParameterContext } from "./SolidityParser";

import { EventParameterListContext } from "./SolidityParser";

import { EventParameterContext } from "./SolidityParser";

import { FunctionTypeParameterListContext } from "./SolidityParser";

import { FunctionTypeParameterContext } from "./SolidityParser";

import { VariableDeclarationContext } from "./SolidityParser";

import { TypeNameContext } from "./SolidityParser";

import { UserDefinedTypeNameContext } from "./SolidityParser";

import { MappingContext } from "./SolidityParser";

import { FunctionTypeNameContext } from "./SolidityParser";

import { StorageLocationContext } from "./SolidityParser";

import { StateMutabilityContext } from "./SolidityParser";

import { BlockContext } from "./SolidityParser";

import { StatementContext } from "./SolidityParser";

import { ExpressionStatementContext } from "./SolidityParser";

import { IfStatementContext } from "./SolidityParser";

import { WhileStatementContext } from "./SolidityParser";

import { SimpleStatementContext } from "./SolidityParser";

import { ForStatementContext } from "./SolidityParser";

import { InlineAssemblyStatementContext } from "./SolidityParser";

import { DoWhileStatementContext } from "./SolidityParser";

import { ContinueStatementContext } from "./SolidityParser";

import { BreakStatementContext } from "./SolidityParser";

import { ReturnStatementContext } from "./SolidityParser";

import { ThrowStatementContext } from "./SolidityParser";

import { EmitStatementContext } from "./SolidityParser";

import { VariableDeclarationStatementContext } from "./SolidityParser";

import { VariableDeclarationListContext } from "./SolidityParser";

import { IdentifierListContext } from "./SolidityParser";

import { ElementaryTypeNameContext } from "./SolidityParser";

import { ExpressionContext } from "./SolidityParser";

import { PrimaryExpressionContext } from "./SolidityParser";

import { ExpressionListContext } from "./SolidityParser";

import { NameValueListContext } from "./SolidityParser";

import { NameValueContext } from "./SolidityParser";

import { FunctionCallArgumentsContext } from "./SolidityParser";

import { FunctionCallContext } from "./SolidityParser";

import { AssemblyBlockContext } from "./SolidityParser";

import { AssemblyItemContext } from "./SolidityParser";

import { AssemblyExpressionContext } from "./SolidityParser";

import { AssemblyCallContext } from "./SolidityParser";

import { AssemblyLocalDefinitionContext } from "./SolidityParser";

import { AssemblyAssignmentContext } from "./SolidityParser";

import { AssemblyIdentifierOrListContext } from "./SolidityParser";

import { AssemblyIdentifierListContext } from "./SolidityParser";

import { AssemblyStackAssignmentContext } from "./SolidityParser";

import { LabelDefinitionContext } from "./SolidityParser";

import { AssemblySwitchContext } from "./SolidityParser";

import { AssemblyCaseContext } from "./SolidityParser";

import { AssemblyFunctionDefinitionContext } from "./SolidityParser";

import { AssemblyFunctionReturnsContext } from "./SolidityParser";

import { AssemblyForContext } from "./SolidityParser";

import { AssemblyIfContext } from "./SolidityParser";

import { AssemblyLiteralContext } from "./SolidityParser";

import { SubAssemblyContext } from "./SolidityParser";

import { TupleExpressionContext } from "./SolidityParser";

import { TypeNameExpressionContext } from "./SolidityParser";

import { NumberLiteralContext } from "./SolidityParser";

import { IdentifierContext } from "./SolidityParser";

export declare class SolidityListener implements ParseTreeListener {
  constructor();

  enterSourceUnit(ctx: SourceUnitContext): void;

  exitSourceUnit(ctx: SourceUnitContext): void;

  enterPragmaDirective(ctx: PragmaDirectiveContext): void;

  exitPragmaDirective(ctx: PragmaDirectiveContext): void;

  enterPragmaName(ctx: PragmaNameContext): void;

  exitPragmaName(ctx: PragmaNameContext): void;

  enterPragmaValue(ctx: PragmaValueContext): void;

  exitPragmaValue(ctx: PragmaValueContext): void;

  enterVersion(ctx: VersionContext): void;

  exitVersion(ctx: VersionContext): void;

  enterVersionOperator(ctx: VersionOperatorContext): void;

  exitVersionOperator(ctx: VersionOperatorContext): void;

  enterVersionConstraint(ctx: VersionConstraintContext): void;

  exitVersionConstraint(ctx: VersionConstraintContext): void;

  enterImportDeclaration(ctx: ImportDeclarationContext): void;

  exitImportDeclaration(ctx: ImportDeclarationContext): void;

  enterImportDirective(ctx: ImportDirectiveContext): void;

  exitImportDirective(ctx: ImportDirectiveContext): void;

  enterNatSpec(ctx: NatSpecContext): void;

  exitNatSpec(ctx: NatSpecContext): void;

  enterContractDefinition(ctx: ContractDefinitionContext): void;

  exitContractDefinition(ctx: ContractDefinitionContext): void;

  enterInheritanceSpecifier(ctx: InheritanceSpecifierContext): void;

  exitInheritanceSpecifier(ctx: InheritanceSpecifierContext): void;

  enterContractPart(ctx: ContractPartContext): void;

  exitContractPart(ctx: ContractPartContext): void;

  enterStateVariableDeclaration(ctx: StateVariableDeclarationContext): void;

  exitStateVariableDeclaration(ctx: StateVariableDeclarationContext): void;

  enterUsingForDeclaration(ctx: UsingForDeclarationContext): void;

  exitUsingForDeclaration(ctx: UsingForDeclarationContext): void;

  enterStructDefinition(ctx: StructDefinitionContext): void;

  exitStructDefinition(ctx: StructDefinitionContext): void;

  enterConstructorDefinition(ctx: ConstructorDefinitionContext): void;

  exitConstructorDefinition(ctx: ConstructorDefinitionContext): void;

  enterModifierDefinition(ctx: ModifierDefinitionContext): void;

  exitModifierDefinition(ctx: ModifierDefinitionContext): void;

  enterModifierInvocation(ctx: ModifierInvocationContext): void;

  exitModifierInvocation(ctx: ModifierInvocationContext): void;

  enterFunctionDefinition(ctx: FunctionDefinitionContext): void;

  exitFunctionDefinition(ctx: FunctionDefinitionContext): void;

  enterReturnParameters(ctx: ReturnParametersContext): void;

  exitReturnParameters(ctx: ReturnParametersContext): void;

  enterModifierList(ctx: ModifierListContext): void;

  exitModifierList(ctx: ModifierListContext): void;

  enterEventDefinition(ctx: EventDefinitionContext): void;

  exitEventDefinition(ctx: EventDefinitionContext): void;

  enterEnumValue(ctx: EnumValueContext): void;

  exitEnumValue(ctx: EnumValueContext): void;

  enterEnumDefinition(ctx: EnumDefinitionContext): void;

  exitEnumDefinition(ctx: EnumDefinitionContext): void;

  enterParameterList(ctx: ParameterListContext): void;

  exitParameterList(ctx: ParameterListContext): void;

  enterParameter(ctx: ParameterContext): void;

  exitParameter(ctx: ParameterContext): void;

  enterEventParameterList(ctx: EventParameterListContext): void;

  exitEventParameterList(ctx: EventParameterListContext): void;

  enterEventParameter(ctx: EventParameterContext): void;

  exitEventParameter(ctx: EventParameterContext): void;

  enterFunctionTypeParameterList(ctx: FunctionTypeParameterListContext): void;

  exitFunctionTypeParameterList(ctx: FunctionTypeParameterListContext): void;

  enterFunctionTypeParameter(ctx: FunctionTypeParameterContext): void;

  exitFunctionTypeParameter(ctx: FunctionTypeParameterContext): void;

  enterVariableDeclaration(ctx: VariableDeclarationContext): void;

  exitVariableDeclaration(ctx: VariableDeclarationContext): void;

  enterTypeName(ctx: TypeNameContext): void;

  exitTypeName(ctx: TypeNameContext): void;

  enterUserDefinedTypeName(ctx: UserDefinedTypeNameContext): void;

  exitUserDefinedTypeName(ctx: UserDefinedTypeNameContext): void;

  enterMapping(ctx: MappingContext): void;

  exitMapping(ctx: MappingContext): void;

  enterFunctionTypeName(ctx: FunctionTypeNameContext): void;

  exitFunctionTypeName(ctx: FunctionTypeNameContext): void;

  enterStorageLocation(ctx: StorageLocationContext): void;

  exitStorageLocation(ctx: StorageLocationContext): void;

  enterStateMutability(ctx: StateMutabilityContext): void;

  exitStateMutability(ctx: StateMutabilityContext): void;

  enterBlock(ctx: BlockContext): void;

  exitBlock(ctx: BlockContext): void;

  enterStatement(ctx: StatementContext): void;

  exitStatement(ctx: StatementContext): void;

  enterExpressionStatement(ctx: ExpressionStatementContext): void;

  exitExpressionStatement(ctx: ExpressionStatementContext): void;

  enterIfStatement(ctx: IfStatementContext): void;

  exitIfStatement(ctx: IfStatementContext): void;

  enterWhileStatement(ctx: WhileStatementContext): void;

  exitWhileStatement(ctx: WhileStatementContext): void;

  enterSimpleStatement(ctx: SimpleStatementContext): void;

  exitSimpleStatement(ctx: SimpleStatementContext): void;

  enterForStatement(ctx: ForStatementContext): void;

  exitForStatement(ctx: ForStatementContext): void;

  enterInlineAssemblyStatement(ctx: InlineAssemblyStatementContext): void;

  exitInlineAssemblyStatement(ctx: InlineAssemblyStatementContext): void;

  enterDoWhileStatement(ctx: DoWhileStatementContext): void;

  exitDoWhileStatement(ctx: DoWhileStatementContext): void;

  enterContinueStatement(ctx: ContinueStatementContext): void;

  exitContinueStatement(ctx: ContinueStatementContext): void;

  enterBreakStatement(ctx: BreakStatementContext): void;

  exitBreakStatement(ctx: BreakStatementContext): void;

  enterReturnStatement(ctx: ReturnStatementContext): void;

  exitReturnStatement(ctx: ReturnStatementContext): void;

  enterThrowStatement(ctx: ThrowStatementContext): void;

  exitThrowStatement(ctx: ThrowStatementContext): void;

  enterEmitStatement(ctx: EmitStatementContext): void;

  exitEmitStatement(ctx: EmitStatementContext): void;

  enterVariableDeclarationStatement(ctx: VariableDeclarationStatementContext): void;

  exitVariableDeclarationStatement(ctx: VariableDeclarationStatementContext): void;

  enterVariableDeclarationList(ctx: VariableDeclarationListContext): void;

  exitVariableDeclarationList(ctx: VariableDeclarationListContext): void;

  enterIdentifierList(ctx: IdentifierListContext): void;

  exitIdentifierList(ctx: IdentifierListContext): void;

  enterElementaryTypeName(ctx: ElementaryTypeNameContext): void;

  exitElementaryTypeName(ctx: ElementaryTypeNameContext): void;

  enterExpression(ctx: ExpressionContext): void;

  exitExpression(ctx: ExpressionContext): void;

  enterPrimaryExpression(ctx: PrimaryExpressionContext): void;

  exitPrimaryExpression(ctx: PrimaryExpressionContext): void;

  enterExpressionList(ctx: ExpressionListContext): void;

  exitExpressionList(ctx: ExpressionListContext): void;

  enterNameValueList(ctx: NameValueListContext): void;

  exitNameValueList(ctx: NameValueListContext): void;

  enterNameValue(ctx: NameValueContext): void;

  exitNameValue(ctx: NameValueContext): void;

  enterFunctionCallArguments(ctx: FunctionCallArgumentsContext): void;

  exitFunctionCallArguments(ctx: FunctionCallArgumentsContext): void;

  enterFunctionCall(ctx: FunctionCallContext): void;

  exitFunctionCall(ctx: FunctionCallContext): void;

  enterAssemblyBlock(ctx: AssemblyBlockContext): void;

  exitAssemblyBlock(ctx: AssemblyBlockContext): void;

  enterAssemblyItem(ctx: AssemblyItemContext): void;

  exitAssemblyItem(ctx: AssemblyItemContext): void;

  enterAssemblyExpression(ctx: AssemblyExpressionContext): void;

  exitAssemblyExpression(ctx: AssemblyExpressionContext): void;

  enterAssemblyCall(ctx: AssemblyCallContext): void;

  exitAssemblyCall(ctx: AssemblyCallContext): void;

  enterAssemblyLocalDefinition(ctx: AssemblyLocalDefinitionContext): void;

  exitAssemblyLocalDefinition(ctx: AssemblyLocalDefinitionContext): void;

  enterAssemblyAssignment(ctx: AssemblyAssignmentContext): void;

  exitAssemblyAssignment(ctx: AssemblyAssignmentContext): void;

  enterAssemblyIdentifierOrList(ctx: AssemblyIdentifierOrListContext): void;

  exitAssemblyIdentifierOrList(ctx: AssemblyIdentifierOrListContext): void;

  enterAssemblyIdentifierList(ctx: AssemblyIdentifierListContext): void;

  exitAssemblyIdentifierList(ctx: AssemblyIdentifierListContext): void;

  enterAssemblyStackAssignment(ctx: AssemblyStackAssignmentContext): void;

  exitAssemblyStackAssignment(ctx: AssemblyStackAssignmentContext): void;

  enterLabelDefinition(ctx: LabelDefinitionContext): void;

  exitLabelDefinition(ctx: LabelDefinitionContext): void;

  enterAssemblySwitch(ctx: AssemblySwitchContext): void;

  exitAssemblySwitch(ctx: AssemblySwitchContext): void;

  enterAssemblyCase(ctx: AssemblyCaseContext): void;

  exitAssemblyCase(ctx: AssemblyCaseContext): void;

  enterAssemblyFunctionDefinition(ctx: AssemblyFunctionDefinitionContext): void;

  exitAssemblyFunctionDefinition(ctx: AssemblyFunctionDefinitionContext): void;

  enterAssemblyFunctionReturns(ctx: AssemblyFunctionReturnsContext): void;

  exitAssemblyFunctionReturns(ctx: AssemblyFunctionReturnsContext): void;

  enterAssemblyFor(ctx: AssemblyForContext): void;

  exitAssemblyFor(ctx: AssemblyForContext): void;

  enterAssemblyIf(ctx: AssemblyIfContext): void;

  exitAssemblyIf(ctx: AssemblyIfContext): void;

  enterAssemblyLiteral(ctx: AssemblyLiteralContext): void;

  exitAssemblyLiteral(ctx: AssemblyLiteralContext): void;

  enterSubAssembly(ctx: SubAssemblyContext): void;

  exitSubAssembly(ctx: SubAssemblyContext): void;

  enterTupleExpression(ctx: TupleExpressionContext): void;

  exitTupleExpression(ctx: TupleExpressionContext): void;

  enterTypeNameExpression(ctx: TypeNameExpressionContext): void;

  exitTypeNameExpression(ctx: TypeNameExpressionContext): void;

  enterNumberLiteral(ctx: NumberLiteralContext): void;

  exitNumberLiteral(ctx: NumberLiteralContext): void;

  enterIdentifier(ctx: IdentifierContext): void;

  exitIdentifier(ctx: IdentifierContext): void;

  visitTerminal(node: TerminalNode): void;

  visitErrorNode(node: ErrorNode): void;

  enterEveryRule(node: ParserRuleContext): void;

  exitEveryRule(node: ParserRuleContext): void;
}
