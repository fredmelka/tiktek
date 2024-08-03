
export default class PlayOption extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-text'];}
#setProps()     {Object.defineProperties(this, Token.observedAttributes.reduce(
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
constructor()   {super(); this.#setProps();}
connectedCallback() {this.ownerDocument.defaultView && this.#render();}
#render()       {}
};

customElements.define('nav-option', PlayOption);