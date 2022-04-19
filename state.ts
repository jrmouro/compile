import { ITransition, Transition } from "./trasition";

export interface IState<S, T> {
    recognize(terms: T[], value: number): number;
}

export class State<S, T> implements IState<S, T>{

    protected _termStatesMap: Map<T, Set<State<S, T>>> = new Map();

    constructor(
        private _name: S,
        private _isFinal: boolean = false,
        private _isInitial: boolean = false,
        private _epsonTerm: T | undefined = undefined) { }


    name(): S {
        return this._name;
    }

    isFinal(): boolean {
        return this._isFinal;
    }

    isInitial(): boolean {
        return this._isInitial;
    }

    epsonTerm(): T | undefined {
        return this._epsonTerm;
    }

    has(transition: ITransition<S, T>): boolean {
        return this.listTransitionsByTerm(
            transition.name(),
            (trans: ITransition<S, T>) => {
                if (trans.target().name() === transition.target().name()) {
                    return true;
                }
                return false;
            });
    }

    add(transition: ITransition<S, T>): boolean {
        if (!this.has(transition)) {
            let set = this._termStatesMap.get(transition.name());
            if (set === undefined) {
                set = new Set<State<S, T>>();
                this._termStatesMap.set(transition.name(), set);
            }
            set.add(transition.target());
            return true;
        }
        return false;
    }

    delete(transition: ITransition<S, T>): boolean {
        let state: State<S, T> | undefined = undefined;
        this.listTransitionsByTerm(
            transition.name(),
            (trans: ITransition<S, T>) => {
                if (trans.target().name() === transition.target().name()) {
                    state = trans.target();
                    return true;
                }
                return false;
            });
        if (state !== undefined) {
            let aux = this._termStatesMap.get(transition.name());
            if (aux !== undefined) {
                aux.delete(state);
                return true;
            }
        }
        return false;
    }

    deleteAllToState(state: State<S, T>): void {
        let set: Set<T> = new Set();
        this.listTransitions((trans) => {
            if (trans.target().name() === state.name()) {
                set.add(trans.name());
            }
            return false;
        });
        set.forEach((term) => {
            this.delete(new Transition(term, state));
        })
    }

    deleteAllByTerm(term: T): void {
        let set = this._termStatesMap.get(term);
        if (set !== undefined) {
            set.clear();
        }
    }

    listTransitions(listCallback: (transition: ITransition<S, T>) => boolean): boolean {
        for (let [term, states] of this._termStatesMap) {
            for (let state of states) {
                if (listCallback(new Transition(term, state))) {
                    return true;
                }
            }
        }
        return false;
    }

    listTransitionsByTerm(term: T, listCallback: (transition: ITransition<S, T>) => boolean): boolean {
        let states = this._termStatesMap.get(term);
        if (states !== undefined) {
            for (let state of states) {
                if (listCallback(new Transition(term, state))) {
                    return true;
                }
            }
        }
        return false;
    }


    recognize(terms: T[], value: number = 0): number {

        if (terms.length > 0) {

            let aux = this._termStatesMap.get(terms[0]);

            let max = value;

            if (aux !== undefined) {

                aux.forEach((state) => {

                    if (terms[0] === this._epsonTerm) {

                        max = Math.max(value, state.recognize(terms,value));

                    } else {

                        max = Math.max(value, state.recognize(terms.slice(1), value + 1));

                    }

                });

            }

            return max;

        }

        if (!this._isFinal) {

            return -value;

        }

        return value;

    }

    indeterminancy(): Set<T> {

        let ret: Set<T> = new Set();
        let aux: Set<T> = new Set();

        this.listTransitions((trans) => {

            if (aux.has(trans.name())) {

                ret.add(trans.name());

            }

            aux.add(trans.name());

            return false;

        });

        return ret;

    }

    visitStates(atualStatefunction: (atualState: State<S, T>, visited: Set<State<S, T>>) => boolean): Set<State<S, T>> {

        let visited: Set<State<S, T>> = new Set();

        this.visitStatesAux(this, visited, atualStatefunction);

        return visited;

    }

    visitStatesAux(atualState: State<S, T>, visited: Set<State<S, T>>, atualStatefunction: (atualState: State<S, T>, visited: Set<State<S, T>>) => boolean): void {

        if (!visited.has(atualState)) {

            visited.add(atualState);

            if (!atualStatefunction(atualState, visited)) {

                atualState.listTransitions((trans) => {

                    this.visitStatesAux(trans.target(), visited, atualStatefunction);

                    return false;

                });

            }

        }
    }

    visited(condition: (transition: ITransition<S, T>) => boolean): Set<State<S, T>> {

        let visited: Set<State<S, T>> = new Set();

        this.visitedAux(this, visited, condition);

        return visited;

    }

    visitedAux(atualState: State<S, T>, visited: Set<State<S, T>>, condition: (transition: ITransition<S, T>) => boolean): void {

        if (!visited.has(atualState)) {

            visited.add(atualState);

            atualState.listTransitions((trans) => {

                if (!condition(trans)) {

                    this.visitedAux(trans.target(), visited, condition);

                    return false;

                }

                return true;

            });

        }
    }

    epsonClosure(): Set<State<S, T>> {

        return this.visited((transition) => {

            if (transition.name() === this._epsonTerm) {
                return false;
            }

            return true;

        });

    }

    getTransitionsStatesNoEpsonFromClosure(closure: Set<State<S, T>>): Map<T, Set<State<S, T>>> {

        let termStatesMap: Map<T, Set<State<S, T>>> = new Map();

        closure.forEach((state) => {

            state.listTransitions((trans) => {

                if (trans.name() !== this._epsonTerm) {

                    let aux = termStatesMap.get(trans.name());

                    if (aux === undefined) {

                        aux = new Set<State<S, T>>();
                        aux.add(trans.target());
                        termStatesMap.set(trans.name(), aux);

                    } else {
                        aux.add(trans.target());
                    }

                }

                return false;

            });

        });

        return termStatesMap;

    }

    reachesFinal(): boolean {

        let visited: Set<State<S, T>> = new Set();

        return this.reachesFinalAux(this, visited);

    }

    reachesFinalAux(state: State<S, T>, visited: Set<State<S, T>>): boolean {

        if (!state.isFinal()) {

            if (!visited.has(state)) {

                visited.add(state);

                return state.listTransitions((trans) => {

                    if (!visited.has(trans.target()))

                        return this.reachesFinalAux(trans.target(), visited);

                    return false;

                });

            } else {

                return false;

            }

        }

        return true;

    }

    toString(): string {
        let ret: string = '';
        if (this._isInitial) ret += '[';
        ret += this._name;
        if (this._isFinal) {
            ret += ']'
        }
        ret += ': '
        this.listTransitions((trans) => {

            ret += ' ' + trans;
            return false;

        });

        return ret;

    }

}