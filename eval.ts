export interface IEval {
    value(_value?:number): number;
}

export class Const implements IEval {

    constructor(private _value: number) { }

    value(_value?:number): number {
        return this._value;
    }

}

export class Variable implements IEval {

    constructor(private name: string, private memoryMap: Map<string, number>) { }

    value(_value?:number): number {

        let v = this.memoryMap.get(this.name);

        if (v !== undefined){

            if(_value !== undefined){

                this.memoryMap.set(this.name, _value);

                return _value;

            }

            return v;

        }
            

        throw new Error('unallocated variable');

    }

}

export class Sum implements IEval {

    constructor(private eval1: IEval, private eval2: IEval) { }

    value(_value?:number): number {

        return this.eval1.value() + this.eval2.value();

    }

}

export class Sub implements IEval {

    constructor(private eval1: IEval, private eval2: IEval) { }

    value(_value?:number): number {

        return this.eval1.value() - this.eval2.value();

    }

}

export class Mul implements IEval {

    constructor(private eval1: IEval, private eval2: IEval) { }

    value(_value?:number): number {

        return this.eval1.value() * this.eval2.value();

    }

}

var teste = 'a+b';
var s = teste.split('*');
console.log(s)