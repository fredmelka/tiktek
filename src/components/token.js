
export default class Token extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-text', 'data-value'];} /* Attributes MUST BE listed to be tracked by Component */
#COLORS = {/* CSS classes for coloring */
    palette: ['red', 'orange', 'lime', 'cyan', 'gold', 'purple', 'magenta'],
    computed: 'computed-geekblue'
}
#setAccessors(list)     {Object.defineProperties(this, list.reduce(
    (properties, attribute) => {
        if (Token.observedAttributes.includes(attribute)) {properties[attribute] = { /* Global HTML Attributes */
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        return properties;};
        if (Token.observedAttributes.includes('data-' + attribute)) {properties[attribute] = { /* data-* Attributes */
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        return properties;};
        if (!Token.observedAttributes.includes(attribute)) {properties[attribute] = { /* Properties */
            set: (value) => {this.props[attribute] = value;},
            get: () => this.props[attribute],
            enumerable: false};
        return properties;};
    }, {}));
    list.forEach(attribute => this[attribute] = this.props[attribute]);
}
set props(object)       {this._props = object;}
get props()             {return this._props;}
constructor(props)      {super(); this.props = props; this.#setAccessors([...Object.keys(this.props), 'class']);}
connectedCallback()     {this.ownerDocument.defaultView && this.#render();}
#render()               {let  {palette} = this.#COLORS;
    (this.text === this.value)
        ? this.class = palette[Math.floor(Math.random() * palette.length)]
        : this.class = this.#COLORS.computed;
    this.innerText = Number.isInteger(+this.value) ? this.value : `${Math.floor(this.value)}..`;
}
};

customElements.define('tk-token', Token);
/*
attributeChangedCallback(attribute, previous, next) {console.log(`Property ${attribute}: ${previous} -> ${next}`)};
filter: drop-shadow(0 0 2em #61dafbaa);
*/