import { Token } from "../Token";
import { BrsType } from "../brsTypes";

export interface Visitor<T> {
    visitAssign(expression: Assign): T;
    visitBinary(expression: Binary): T;
    visitCall(expression: Call): T;
    visitGet(expression: Get): T;
    visitGrouping(expression: Grouping): T;
    visitLiteral(expression: Literal): T;
    visitLogical(expression: Logical): T;
    visitM(expression: M): T;
    visitSet(expression: Set): T;
    visitUnary(expression: Unary): T;
    visitVariable(expression: Variable): T;
}

export interface Expression {
    accept <R> (visitor: Visitor<R>): R;
}

export class Assign implements Expression {
    constructor(
        readonly name: Token,
        readonly value: Expression
    ) {}

    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitAssign(this);
    }
}

export class Binary implements Expression {
    constructor(
        readonly left: Expression,
        readonly token: Token,
        readonly right: Expression
    ) { }


    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitBinary(this);
    }
}

export class Call implements Expression {
    // TODO: Check against a Roku device (that'll be fun)
    static MaximumArguments = 32;

    constructor(
        readonly callee: Expression,
        readonly closingParen: Token,
        readonly args: Expression[]
    ) {}

    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitCall(this);
    }
}

export class Get implements Expression {
    constructor(
        readonly obj: Expression,
        readonly name: Token
    ) {}

    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitGet(this);
    }
}

export class Grouping implements Expression {

    constructor(
        readonly expression: Expression
    ) {}

    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitGrouping(this);
    }
}

export class Literal implements Expression {
    constructor(readonly value: BrsType) {}

    accept <R> (visitor: Visitor<R>): R {
        return visitor.visitLiteral(this);
    }
}

export class Logical implements Expression {
    constructor(
        readonly left: Expression,
        readonly operator: Token,
        readonly right: Expression
    ) {}

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitLogical(this);
    }
}

export class M implements Expression {
    constructor(readonly keyword: Token) {}

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitM(this);
    }
}

export class Set implements Expression {
    constructor(
       readonly obj: Expression,
       readonly name: Token,
       readonly value: Expression
    ) {}

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitSet(this);
    }
}

export class Unary implements Expression {
    constructor(
        readonly operator: Token,
        readonly right: Expression
    ) {}

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitUnary(this);
    }
}

export class Variable implements Expression {
    constructor(
        readonly name: Token
    ) {}

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitVariable(this);
    }
}