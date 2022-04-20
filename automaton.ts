import { IState, State } from "./state";
import { Transition } from "./transition";

export interface IAutomaton<S, T> extends IState<S, T> {

}

export class Automaton<S, T> implements IAutomaton<S, T>{

    protected _statesMap: Map<S, State<S, T>> = new Map();
    protected _initialState: State<S, T>;

    constructor(
        name: S,
        isFinal: boolean = false,
        epsonTerm: T | undefined = undefined) {

        this._initialState = new State(name, isFinal, true, epsonTerm);
        this._statesMap.set(name, this._initialState);

    }




    recognize(terms: T[], value: number = 0): number {
        return this._initialState.recognize(terms, value);
    }

    addState(stateName: S, isFinal: boolean): State<S, T> | undefined {

        if (this._statesMap.get(stateName) === undefined) {

            let newState = new State<S, T>(stateName, isFinal, false, this._initialState.epsonTerm());
            this._statesMap.set(stateName, newState);

            return newState;

        }

        return undefined;
    }


    deleteState(state: State<S, T>): void {

        this._statesMap.forEach((stateOrig, name) => {
            stateOrig.deleteAllToState(state);
        });

        this._statesMap.delete(state.name());

    }

    addTransition(originStateName: S, targetStateName: S, term: T | T[]): void {

        if (term instanceof Array) {

            term.forEach((t) => {

                this.addTransition(originStateName, targetStateName, t);

            });

        } else {

            let originState = this._statesMap.get(originStateName);
            let targetState = this._statesMap.get(targetStateName);

            if (originState !== undefined && targetState !== undefined) {

                originState.add(new Transition(term, targetState));

            }

        }
    }

    deleteTransition(originStateName: S, targetStateName: S, term: T): boolean {
        let originState = this._statesMap.get(originStateName);
        let targetState = this._statesMap.get(targetStateName);
        if (originState !== undefined && targetState !== undefined) {
            return originState.delete(new Transition(term, targetState));
        }
        return false;
    }


    unVisited(): Set<State<S, T>> {

        let visited = this._initialState.visited((t) => false);

        let unVisited: Set<State<S, T>> = new Set();

        this._statesMap.forEach((state) => {
            unVisited.add(state);
        });

        visited.forEach((state) => {
            unVisited.delete(state);
        });

        return unVisited;

    }

    visited(): Set<State<S, T>> {

        return this._initialState.visited((t) => false);

    }

    minimize(): void {
        this.deleteUnvisited();
        this.deleteNoReachesFinal();
    }

    deleteUnvisited() {
        let unvisited = this.unVisited();
        unvisited.forEach((state) => {
            this.deleteState(state);
        });
    }

    deleteNoReachesFinal() {
        this._statesMap.forEach((state) => {
            if (!state.reachesFinal()) {
                this.deleteState(state);
            }
        });
    }


    toString(): string {
        let ret: string = '';
        this._statesMap.forEach((state) => {
            ret += state.toString() + '\n';
        });
        return ret;
    }



}


