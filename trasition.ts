import { IState, State } from "./state";


export interface ITransition<S,T>{
    target():State<S,T>,
    name():T
}

export class Transition<S,T> implements ITransition<S,T>{
    
    constructor(private _name:T, private _target:State<S,T>){}
    
    target(): State<S, T> {
        return this._target;
    }

    name(): T {
        return this._name;
    }

    toString():string{
        let ret:string = '';
        if(this._target.isInitial()) ret += '[';
        ret += this._target.name();
        if(this._target.isFinal()){
            ret += ']'
        }
        return this._name + '->' + ret;
    }

}
