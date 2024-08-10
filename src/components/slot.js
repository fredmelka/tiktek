
export default class Slot extends HTMLElement {
static get observedAttributes() {return ['id'];}
#setAttributes()     {Object.defineProperties(this, Slot.observedAttributes.reduce( /* Only Global attributes */
    (properties, attribute) => {properties[attribute] = {
        set: (value) => {this.setAttribute(attribute, value);},
        get: () => this.getAttribute(attribute),
        enumerable: false};
        return properties;}
    , {}));
}
constructor()   {super(); this.#setAttributes();}
};

customElements.define('game-slot', Slot);