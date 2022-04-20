import { IAutomaton } from "./automaton";
import { ExpressionEval, IEvalBuilder, MulBuilder, SubBuilder, SumBuilder } from "./eval";
import { ExpressionFilter, IExpressionFilter } from "./expression";

export interface IProcess {
    exec(): void;
}

export class Process implements IProcess {

    constructor(
        private filename: string,
        private automaton: IAutomaton<number, string>,
        private finalTermExpression: string = ';',
        private filterExpression: string = 'abcdfghijklmnopqsrtuvxzwy1234567890=-*+',
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
        ]) { }

    exec(): void {

        const fs = require('fs');

        let self = this;

        fs.readFile(this.filename, function (err: any, data: { toString: () => string; }) {

            if (err) throw err;

            let memoryMap: Map<string, number> = new Map();

            const arr: string[] = data.toString().replace(/\r\n/g, '\n').split('\n');


            let lineIndex = 0;

            let expfilter = new ExpressionFilter(self.filterExpression);

            for (let i of arr) {
                
                arr.forEach((line) => {

                    line.split(self.finalTermExpression).forEach((exp) => {

                        if (exp.length > 1) { 

                            let length = self.automaton.recognize(Array.from(exp + self.finalTermExpression), 0);

                            if (length === i.length) {

                                expfilter.clear();
            
                                expfilter.concat(exp);

                                let filteredExpression = expfilter.get();

                                self.processExpression(memoryMap, filteredExpression);
            
                            } else {
            
                                throw new Error('syntax error on line ' + lineIndex);
            
                            }
            
                        }

                    });
                });

                lineIndex++;

            }

        });
    }

    processExpression(memoryMap: Map<string, number>, expression:string):void{

        let index = expression.indexOf('=');

        if(expression.indexOf('=') > -1){

            let first = expression.slice(0, index);
            let last = expression.slice(index + 1);

            memoryMap.set(first, new ExpressionEval(last, memoryMap, this.operators).value());

        }else{

            console.log(new ExpressionEval(expression, memoryMap, this.operators).value())

        }

    }

}

