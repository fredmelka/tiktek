
import Option from './option.js';


export default class Menu extends HTMLElement {
static get observedAttributes() {return ['attempts'];} /* Props being also attributes MUST BE listed also HERE to be tracked by the Web Component */
#setAccessors(list)    {Object.defineProperties(this, list.reduce(
    (properties, attribute) => {
        if (Menu.observedAttributes.includes(attribute)) {properties[attribute] = { /* Global HTML Attributes */
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        return properties;};
        if (Menu.observedAttributes.includes('data-' + attribute)) {properties[attribute] = { /* data-* Attributes */
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        return properties;};
        if (!Menu.observedAttributes.includes(attribute)) {properties[attribute] = { /* Props */
            set: (value) => {this.props[attribute] = value;},
            get: () => this.props[attribute],
            enumerable: true};
        return properties;};
    }, {}));
    list.forEach(attribute => this[attribute] = this.props[attribute]);
}
set props(object)       {this._props = object;}
get props()             {return this._props;}
constructor(props)      {super(); this.props = props; this.props && this.#setAccessors(Object.keys(this.props));}
connectedCallback()     {if (!this.ownerDocument.defaultView) {return;};
    this.#render();
    this.addEventListener('click', (event) => {this.options?.[event.target.handle].handler();}); /* Optional chaining to fix */
}
#render()               {let menu = document.createElement('ul'); menu.classList.add('fa-ul');
    let options = Object.entries(this.options).map(([action, {icon, caption}]) => {
        let item = document.createElement('li');
        let button = new Option({icon, caption, handle: action});
        item.append(button); return item;});
    menu.append(...options); this.append(menu);
}
};

customElements.define('menu-inplay', Menu);