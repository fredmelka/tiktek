
import DOM from './dom.js';
import useObserver from './observer.js';
import './utils.js';

class Game {
#data = {target: null, inputs: null}
#BOARDSIZE = 8
#MATHS = {/* Visitor pattern */
    '+': {numeric: (a,b) => a.value + b.value, text: (a,b) => `(${a.text}) + (${b.text})`},
    '-': {numeric: (a,b) => a.value - b.value, text: (a,b) => `(${a.text}) - (${b.text})`},
    '*': {numeric: (a,b) => a.value * b.value, text: (a,b) => `(${a.text}) × (${b.text})`},
    '/': {numeric: (a,b) => a.value / b.value, text: (a,b) => `(${a.text}) / (${b.text})`}
}
set data({target, tokens})  {this.#data.target = target; this.#data.tokens = tokens;}
get data()                  {return this.#data;}
set attempts(num)           {this._attempts = num;}
get attempts()              {return this._attempts;}
set moves(array)            {this._moves = array;}
get moves()                 {return this._moves;}
get steps()                 {return this._steps;}
get eog()                   {return (this.moves.length === (this.data.tokens.length - 1)) && this.steps.at(-1).value === this.data.target;}
constructor()               {this._moves = []; this._steps = []; this._attempts = 0;}
start()                     {this.attempts++; this.moves = []; this.data.tokens.fisherYates();
    DOM.setBoard(this.#BOARDSIZE);
    DOM.fillState({start: this.start.bind(this), attempts: this.attempts, ...this.data});
    DOM.listen(useObserver, this.move.bind(this));}
move(drop)                  {this.moves.push(drop); let {OP_1, OP_2, symbol} = this.moves.at(-1);
    let step = {value: this.#MATHS[symbol].numeric(OP_1, OP_2), text: this.#MATHS[symbol].text(OP_1, OP_2).cleanBracket()};
    this.steps.push(step); this.print();
    if (this.eog) {setTimeout(() => this.end(), 1000);};
    return step;}
print()                     {DOM.print(this.steps.at(-1));}
end()                       {console.log('Well done!', this.moves);}
};

let tokens = Array(6).fill(0).map(() => 1 + Math.floor(Math.random() * 10));
let target = Math.floor(Math.random() * 100);

let jeu = new Game(); jeu.data = {target, tokens}; jeu.start();