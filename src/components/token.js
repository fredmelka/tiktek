
import useObserver from '../hooks/observer.js';

export default class Token extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-text', 'data-value'];}
#COLORS = {/* CSS classes */
    palette: ['red', 'orange', 'beige', 'lime', 'geekblue', 'purple', 'pink', 'rose', 'yellow', 'violet', 'blue', 'brown'],
    computed: 'computed-geekblue'
}
#setProps()     {Object.defineProperties(this, Token.observedAttributes.reduce(
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
set move(fn)    {this._callback = fn;}
get move()      {return this._callback;}
constructor()   {super(); this.#setProps();}
connectedCallback() {this.ownerDocument.defaultView && this.#render();}
#render()       {let  {palette} = this.#COLORS;
    (this.text === this.value)
        ? this.classList.add(palette[Math.floor(Math.random() * palette.length)])
        : this.classList.add(this.#COLORS.computed);
    this.innerText = Number.isInteger(+this.value) ? this.value : `${Math.floor(this.value)}..`;
    this.addEventListener('pointerdown', useObserver(this.move));
}
/* attributeChangedCallback(att, previous, next) {} */
};

customElements.define('tk-token', Token);