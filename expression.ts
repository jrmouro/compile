export interface IExpression{
    builder(term:string, initial:boolean, final:boolean):void;
    process():void;
}

export abstract class Expression implements IExpression{

    protected acc:string = '';

    constructor(protected memoryMap:Map<string,number>){}

    builder(term: string, initial:boolean, final:boolean = false): void {

        if(initial){
            this.acc = '';
        }

        this.acc += term;
        
        if(final){
            this.process();
        }
    }

    abstract process(): void ;

}

export class AssignExpression extends Expression{

    acc:string = '';

    constructor(memoryMap:Map<string,number>){
        super(memoryMap);
    }

    process(): void {

        

    }

}

export class PrintExpression  extends Expression{

    acc:string = '';

    constructor(memoryMap:Map<string,number>){
        super(memoryMap);
    }

    process(): void {

        if(parseInt(this.acc) === NaN){

            let value = this.memoryMap.get(this.acc);

            if(value){

                console.log(value);

            }else{

                throw new Error('undeclared variable');

            }

        }else{

            console.log(this.acc);

        }

    }

}