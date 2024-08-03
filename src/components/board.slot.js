
export default class Slot extends HTMLElement {
static get observedAttributes() {return ['id'];}
#setProps()     {Object.defineProperties(this, Slot.observedAttributes.reduce(
    (properties, attribute) => {properties[attribute] = {
        set: (value) => {this.setAttribute(attribute, value);},
        get: () => this.getAttribute(attribute),
        enumerable: false};
        return properties;}
    , {}));
}
constructor()   {super(); this.#setProps();}
};

customElements.define('tk-slot', Slot);