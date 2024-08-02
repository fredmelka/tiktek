
import Slot from './slot.js';
import Token from './token.js';

export default class Gameboard extends HTMLElement {
#BOARDSIZE = null
#DATA = {target: null, tokens: null}
static get      observedAttributes() {return ['id', 'data-attempt'];}
#setProps()     {Object.defineProperties(this, Gameboard.observedAttributes.reduce(
    (properties, attribute) => {
        if (attribute.startsWith('data')) {properties[attribute = attribute.slice(5)] = {
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumrable: false};
        } else {properties[attribute] = {
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumrable: false};
        };
    return properties;}
, {}));
}
set board(i)    {this.#BOARDSIZE = i;}
get board()     {return this.#BOARDSIZE;}
set tokens(arr) {this.#DATA.tokens = arr;}
get tokens()    {return this.#DATA.tokens;}
set fn(fn)      {this._fn = fn;}
get fn()        {return this._fn;}
constructor(size, data, fn) {super(); this.#setProps(); this.board = size; this.tokens = data.tokens; this.fn = fn;}
connectedCallback() {this.ownerDocument.defaultView && this.#render();}
#render()       {for (let id = 0; id < this.#BOARDSIZE; id++) {
    let slot = new Slot(); slot.id = id;
    if (this.tokens[id]) {let token = new Token();
        token.text = this.tokens[id]; token.value = this.tokens[id]; token.move = this.fn;
        slot.appendChild(token);};
    this.appendChild(slot);};
}
/* attributeChangedCallback(attribute, previous, next) {console.log(`${attribute}: ${previous} -> ${next}`);} --- Can be later removed */
};

customElements.define('tk-game', Gameboard);