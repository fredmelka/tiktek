
import Slot from './slot.js';
import Token from './token.js';
import useObserver from '../hooks/useObserver.js';

export default class Gameboard extends HTMLElement {
#BOARDSIZE = null
#DATA = {target: null, tokens: null}
static get      observedAttributes() {return ['id', 'data-attempt'];}
#setProps()     {Object.defineProperties(this, Gameboard.observedAttributes.reduce(
    (properties, attribute) => {
        if (attribute.startsWith('data')) {properties[attribute = attribute.slice(5)] = {
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        } else {properties[attribute] = {
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        };
        return properties;}
    , {}));
}
set board(i)    {this.#BOARDSIZE = i;}
get board()     {return this.#BOARDSIZE;}
set tokens(arr) {this.#DATA.tokens = arr;}
get tokens()    {return this.#DATA.tokens;}
set move(fn)    {this._move = fn;}
get move()      {return this._move;}
constructor(size, data, fn) {super(); this.#setProps(); this.board = size; this.tokens = data.tokens; this.move = fn;}
connectedCallback() {this.ownerDocument.defaultView && this.#render();}
#render()       {for (let id = 0; id < this.#BOARDSIZE; id++) {
    let slot = new Slot(); slot.id = id;
    if (this.tokens[id]) {let token = new Token(); token.text = this.tokens[id]; token.value = this.tokens[id]; slot.appendChild(token);};
    this.appendChild(slot);};
    this.addEventListener('pointerdown', useObserver(this.move)); /* EVENT-DELEGATION: WITH LISTENER SET ON CONTAINER */
}
};

customElements.define('tk-game', Gameboard);