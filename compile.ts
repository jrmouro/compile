import { State } from "./state";
import { Transition } from "./trasition";

var state0 = new State<number,string>(0, false, true, '@');
var state1 = new State<number,string>(1, false, false, '@');
var state2 = new State<number,string>(2, false, false, '@');

var state3 = new State<number,string>(3, true, false, '@');

var state4 = new State<number,string>(4, false, false, '@');
var state5 = new State<number,string>(5, false, false, '@');
var state6 = new State<number,string>(6, false, false, '@');

state0.add(new Transition(' ', state0));
state0.add(new Transition('a', state2));
state0.add(new Transition('b', state2));
state0.add(new Transition('c', state2));
state0.add(new Transition('d', state2));
state0.add(new Transition('e', state2));
state0.add(new Transition('f', state2));
state0.add(new Transition('g', state2));
state0.add(new Transition('h', state2));
state0.add(new Transition('i', state2));
state0.add(new Transition('j', state2));
state0.add(new Transition('k', state2));
state0.add(new Transition('l', state2));
state0.add(new Transition('m', state2));
state0.add(new Transition('n', state2));
state0.add(new Transition('o', state2));
state0.add(new Transition('p', state2));
state0.add(new Transition('q', state2));
state0.add(new Transition('r', state2));
state0.add(new Transition('s', state2));
state0.add(new Transition('t', state2));
state0.add(new Transition('u', state2));
state0.add(new Transition('v', state2));
state0.add(new Transition('x', state2));
state0.add(new Transition('w', state2));
state0.add(new Transition('y', state2));
state0.add(new Transition('z', state2));

state1.add(new Transition(' ', state1));
state1.add(new Transition('0', state5));
state1.add(new Transition('1', state5));
state1.add(new Transition('2', state5));
state1.add(new Transition('3', state5));
state1.add(new Transition('4', state5));
state1.add(new Transition('5', state5));
state1.add(new Transition('6', state5));
state1.add(new Transition('7', state5));
state1.add(new Transition('8', state5));
state1.add(new Transition('9', state5));
state1.add(new Transition('a', state4));
state1.add(new Transition('b', state4));
state1.add(new Transition('c', state4));
state1.add(new Transition('d', state4));
state1.add(new Transition('e', state4));
state1.add(new Transition('f', state4));
state1.add(new Transition('g', state4));
state1.add(new Transition('h', state4));
state1.add(new Transition('i', state4));
state1.add(new Transition('j', state4));
state1.add(new Transition('k', state4));
state1.add(new Transition('l', state4));
state1.add(new Transition('m', state4));
state1.add(new Transition('n', state4));
state1.add(new Transition('o', state4));
state1.add(new Transition('p', state4));
state1.add(new Transition('q', state4));
state1.add(new Transition('r', state4));
state1.add(new Transition('s', state4));
state1.add(new Transition('t', state4));
state1.add(new Transition('u', state4));
state1.add(new Transition('v', state4));
state1.add(new Transition('x', state4));
state1.add(new Transition('w', state4));
state1.add(new Transition('y', state4));
state1.add(new Transition('z', state4));

state2.add(new Transition(' ', state2));
state2.add(new Transition('=', state1));
state2.add(new Transition(';', state3));

state3.add(new Transition(' ', state3));

state4.add(new Transition(' ', state4));
state4.add(new Transition(';', state3));
state4.add(new Transition('+', state1));
state4.add(new Transition('-', state1));
state4.add(new Transition('*', state1));
state4.add(new Transition('/', state1));

state5.add(new Transition(' ', state6));
state5.add(new Transition('0', state5));
state5.add(new Transition('1', state5));
state5.add(new Transition('2', state5));
state5.add(new Transition('3', state5));
state5.add(new Transition('4', state5));
state5.add(new Transition('5', state5));
state5.add(new Transition('6', state5));
state5.add(new Transition('7', state5));
state5.add(new Transition('8', state5));
state5.add(new Transition('9', state5));
state5.add(new Transition(';', state3));

state6.add(new Transition(' ', state6));
state6.add(new Transition(';', state3));
state6.add(new Transition('+', state1));
state6.add(new Transition('-', state1));
state6.add(new Transition('*', state1));
state6.add(new Transition('/', state1));



console.log(state0.toString());
console.log(state0.recognize(Array.from('a = a + b;')));
