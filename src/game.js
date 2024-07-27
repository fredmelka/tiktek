
import DOM from './dom.js';
import useObserver from './hooks.js';
import './utils.js';

class Game {
#DATA = {target: null, inputs: null}
#BOARDSIZE = 8
#MATHS = {/* Visitor pattern */
    '+': {algebraic: (a, b) => a.value + b.value, text: (a, b) => `(${a.text}) + (${b.text})`},
    '-': {algebraic: (a, b) => a.value - b.value, text: (a, b) => `(${a.text}) - (${b.text})`},
    '*': {algebraic: (a, b) => a.value * b.value, text: (a, b) => `(${a.text}) × (${b.text})`},
    '/': {algebraic: (a, b) => a.value / b.value, text: (a, b) => `(${a.text}) / (${b.text})`}
}
set data({target, tokens})  {this.#DATA.target = target; this.#DATA.tokens = tokens;}
get data()                  {return this.#DATA;}
set attempts(num)           {this._attempts = num;}
get attempts()              {return this._attempts;}
set moves(array)            {this._moves = array;}
get moves()                 {return this._moves;}
get expressions()           {return this._expressions;}
get eog()                   {return (this.moves.length === (this.data.tokens.length - 1)) && this.expressions.at(-1).value === this.data.target;}
constructor()               {this._moves = []; this._expressions = []; this._attempts = 0;}
start()                     {this.attempts++; this.moves = []; this.data.tokens.fisherYates();
    DOM.set(this.#BOARDSIZE);
    DOM.fill({startMethod: this.start.bind(this), attempts: this.attempts, ...this.data});
    DOM.listen(useObserver, this.move.bind(this));
}
move(drop)                  {let {OP_1, OP_2, symbol} = drop; this.moves.push(drop);
    let expression = {value: this.#MATHS[symbol].algebraic(OP_1, OP_2), text: this.#MATHS[symbol].text(OP_1, OP_2).cleanBracket()};
    this.expressions.push(expression); this.print();
    if (this.eog) {setTimeout(() => this.end(), 1000);};
    return expression;
}
print()                     {this.moves.length === 1 && DOM.log(this.attempts); DOM.print(this.expressions.at(-1));}
end()                       {console.log('Well done!', this.moves);}
};

let tokens = Array(5).fill(0).map(() => 1 + Math.floor(Math.random() * 10));
let target = Math.floor(Math.random() * (200 - 0) + 0);
let jeu = new Game(); jeu.data = {target, tokens}; jeu.start();