export interface IEval {
    value(_value?: number): number;
}

export class Const implements IEval {

    constructor(private _value: number) { }

    value(_value?: number): number {
        return this._value;
    }

}

export class Variable implements IEval {

    constructor(private name: string, private memoryMap: Map<string, number>) { }

    value(_value?: number): number {

        let v = this.memoryMap.get(this.name);

        if (v !== undefined) {

            if (_value !== undefined) {

                this.memoryMap.set(this.name, _value);

                return _value;

            }

            return v;

        }


        throw new Error('unallocated variable');

    }

}

export abstract class OperationEval implements IEval {

    constructor(protected eval1: IEval, protected eval2: IEval) { }

    abstract value(_value?: number): number;

}


export class Sum extends OperationEval {

    constructor(eval1: IEval, eval2: IEval) {

        super(eval1, eval2);

    }

    value(_value?: number): number {

        return this.eval1.value() + this.eval2.value();

    }

}

export class Sub extends OperationEval {

    constructor(eval1: IEval, eval2: IEval) {

        super(eval1, eval2);

    }

    value(_value?: number): number {

        return this.eval1.value() - this.eval2.value();

    }

}

export class Mul extends OperationEval {

    constructor(eval1: IEval, eval2: IEval) {

        super(eval1, eval2);

    }

    value(_value?: number): number {

        return this.eval1.value() * this.eval2.value();

    }

}

export interface IEvalBuilder {

    builder(eval1: IEval, eval2: IEval): IEval;

}

export class SumBuilder implements IEvalBuilder {

    builder(eval1: IEval, eval2: IEval): IEval {

        return new Sum(eval1, eval2);

    }

};

export class SubBuilder implements IEvalBuilder {

    builder(eval1: IEval, eval2: IEval): IEval {

        return new Sub(eval1, eval2);

    }

};

export class MulBuilder implements IEvalBuilder {

    builder(eval1: IEval, eval2: IEval): IEval {

        return new Mul(eval1, eval2);

    }

};



export class ExpressionEval implements IEval {

    constructor(
        private expression: string,
        private memoryMap: Map<string, number>,
        private operators: Map<string, IEvalBuilder>[] =
            [
                new Map(
                    [
                        ['*', new MulBuilder()]
                    ],
                ),
                new Map(
                    [
                        ['+', new SumBuilder()],
                        ['-', new SubBuilder()],
                    ],
                ),
            ]
    ) { }

    value(_value?: number): number {

        for (var mop of this.operators) {

            for (var [op, builder] of mop) {

                let index = this.expression.indexOf(op);

                if( index > -1 ){

                    let first = this.expression.slice(0, index);
                    let last = this.expression.slice(index + 1);

                    return builder.builder(
                        new ExpressionEval(first, this.memoryMap, this.operators),
                        new ExpressionEval(last, this.memoryMap, this.operators) ).value();
                }

            }

        }

        let aux = parseInt(this.expression);

        if( aux === NaN){

            let aux2 = this.memoryMap.get(this.expression);

            if(aux2){

                return aux2;

            }else{

                throw new Error('expression error');

            }

        }
        
        return aux;

    }

}

// var teste = 'a+b';
// var s = teste.split('*');
// console.log(s)