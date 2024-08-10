
import Slot from './slot.js';
import Token from './token.js';
import useObserver from '../hooks/useObserver.js';


export default class Gameboard extends HTMLElement {
static get observedAttributes() {return ['id', 'data-attempt'];}
#BOARDSIZE = null
#DATA = {target: null, tokens: null}
#setAccessors(list)    {Object.defineProperties(this, list.reduce(
    (properties, attribute) => {
        if (Gameboard.observedAttributes.includes(attribute)) {properties[attribute] = { /* Global HTML Attributes */
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        return properties;};
        if (Gameboard.observedAttributes.includes('data-' + attribute)) {properties[attribute] = { /* data-* Attributes */
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        return properties;};
        if (!Gameboard.observedAttributes.includes(attribute)) {properties[attribute] = { /* Props */
            set: (value) => {this.props[attribute] = value;},
            get: () => this.props[attribute],
            enumerable: true};
        return properties;};
    }, {}));
    list.forEach(attribute => this[attribute] = this.props[attribute]);
}
set board(i)            {this.#BOARDSIZE = i;}
get board()             {return this.#BOARDSIZE;}
set tokens(arr)         {this.#DATA.tokens = arr;}
get tokens()            {return this.#DATA.tokens;}
set move(fn)            {this._move = fn;}
get move()              {return this._move;}
constructor(size, data, fn) {super(); /*this.#setAccessors();*/ this.board = size; this.tokens = data.tokens; this.move = fn;}
connectedCallback()     {this.ownerDocument.defaultView && this.#render();}
#render()               {for (let id = 0; id < this.#BOARDSIZE; id++) {
    let slot = new Slot(); slot.id = id;
    if (this.tokens[id]) {let token = new Token({text: this.tokens[id], value: this.tokens[id]}); slot.appendChild(token);};
    this.appendChild(slot);};
    this.addEventListener('pointerdown', useObserver(this.move)); /* Event delegation principle -> Event Listener set on the container */
}
};

customElements.define('tiktek-game', Gameboard);