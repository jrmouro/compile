export interface IExpressionFilter {
    concat(term: string): void;
    clear(): void;
    get(): string;
}

export class ExpressionFilter implements IExpressionFilter {

    protected expression: string = '';

    constructor(
        protected filter: string = 'abcdfghijklmnopqsrtuvxzwy1234567890=-*+') { }

    get(): string {
        return this.expression;
    }

    clear(): void {
        this.expression = '';
    }

    concat(term: string): void {

        for (var index = 0; index < term.length; index++) {

            let c = term.charAt(index);

            if (this.filter.indexOf(c) > -1) {

                this.expression += c;

            }

        }
    }

}