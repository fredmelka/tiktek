
import DOM from './dom.js';
import './utils/protos.js';

class Game {
#DATA = {target: null, tokens: null}
#BOARDSIZE = 8
#MATHS = {/* VISITOR PATTERN */
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
    DOM.set(this.#BOARDSIZE, this.data, this.move.bind(this));
    DOM.menu(this.start.bind(this), this.attempts);
    DOM.button({...this.data});
}
move(drop)                  {let {OP_1, OP_2, symbol} = drop; this.moves.push(drop);
    let computation = {value: this.#MATHS[symbol].algebraic(OP_1, OP_2), text: this.#MATHS[symbol].text(OP_1, OP_2).cleanBracket()};
    this.expressions.push(computation);
    this.print();
    if (this.eog) {setTimeout(() => this.end(), 1000);};
    return computation;
}
print()                     {this.moves.length === 1 && DOM.log(this.attempts); DOM.print(this.expressions.at(-1));}
end()                       {console.log('Well done!', this.moves);}
};

let gameRules = {
    countDown: () => {/* Countdown classic */
    let items = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,25,50,75,100], min = 100, max = 999, length = 6;
    return {target: Math.floor(Math.random() * (max + 1 - min) + min), tokens: Array(length).fill(0).map(() => items.fisherYates().pop())};
    }
};

let jeu = new Game(); jeu.data = gameRules.countDown(); jeu.start();