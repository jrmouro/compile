import { Automaton } from "./automaton";
import { Process } from "./process";
import { State } from "./state";
import { Transition } from "./transition";

var automaton = new Automaton(0, false, '@');

automaton.addState(1, false);
automaton.addState(2, false);
automaton.addState(3, true);
automaton.addState(4, false);
automaton.addState(5, false);
automaton.addState(6, false);
automaton.addState(7, false);
automaton.addState(9, false);


automaton.addTransition(7, 9, Array.from('abcdefghijklmnopqrstuvxzyw'));
automaton.addTransition(7, 7, ' ');

automaton.addTransition(8, 5,Array.from('0123456789'));
automaton.addTransition(8, 8, ' ');

automaton.addTransition(9, 9,Array.from('+-*'));
automaton.addTransition(9, 9, ' ');

automaton.addTransition(0, 0, ' ');
automaton.addTransition(0, 7, '-');
automaton.addTransition(0, 2, Array.from('abcdefghijklmnopqrstuvxzyw'));

automaton.addTransition(1, 1, ' ');
automaton.addTransition(1, 8, '-');
automaton.addTransition(1, 5, Array.from('0123456789'));
automaton.addTransition(1, 4, Array.from('abcdefghijklmnopqrstuvxzyw'));

automaton.addTransition(2, 2, ' ');
automaton.addTransition(2, 1, Array.from('=+-*'));
automaton.addTransition(2, 3, ';');

automaton.addTransition(3, 3, ' ');

automaton.addTransition(4, 4, ' ');
automaton.addTransition(4, 3, ';');
automaton.addTransition(4, 1, Array.from('+-*'));

automaton.addTransition(5, 6, ' ');
automaton.addTransition(5, 5, Array.from('0123456789'));
automaton.addTransition(5, 3, ';');

automaton.addTransition(6, 6, ' ');
automaton.addTransition(6, 3, ';');
automaton.addTransition(6, 1, Array.from('+-*'));

automaton.addTransition(7, 9, Array.from('abcdefghijklmnopqrstuvxzyw'));
automaton.addTransition(7, 7, ' ');

automaton.addTransition(8, 5,Array.from('0123456789'));
automaton.addTransition(8, 8, ' ');

automaton.addTransition(9, 9,Array.from('+-*'));
automaton.addTransition(9, 9, ' ');



var process = new Process('program.txt', automaton);
process.exec();

// process.processExpression(new Map(), '1 + 1');