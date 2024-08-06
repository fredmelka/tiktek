
export default class Token extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-text', 'data-value'];}
#COLORS = {/* CSS CLASSES FOR COLORING */
    palette: ['red', 'orange', 'lime', 'cyan', 'gold', 'purple', 'magenta'],
    computed: 'computed-geekblue'
}
#setProps()         {Object.defineProperties(this, Token.observedAttributes.reduce(
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
constructor()       {super(); this.#setProps();}
connectedCallback() {this.ownerDocument.defaultView && this.#render();}
#render()           {let  {palette} = this.#COLORS;
    (this.text === this.value)
        ? this.class = palette[Math.floor(Math.random() * palette.length)]
        : this.class = this.#COLORS.computed;
    this.innerText = Number.isInteger(+this.value) ? this.value : `${Math.floor(this.value)}..`;
}
};

customElements.define('tk-token', Token);
// attributeChangedCallback(attribute, previous, next) {console.log(`Property ${attribute}: ${previous} -> ${next}`)};