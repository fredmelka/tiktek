
import style from '../../css/component.option.css' with {type: 'css'};

export default class Option extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-icon', 'data-caption', 'data-handle'];}
#FONTAWESOME = {/* FONTAWESOME CDN ACCESS */
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css',
    integrity: 'sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=='
}
#setAccessors(list)    {Object.defineProperties(this, list.reduce(
    (properties, attribute) => {
        if (Option.observedAttributes.includes(attribute)) {properties[attribute] = { /* GLOBAL HTML ATTRIBUTES */
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        return properties;};
        if (Option.observedAttributes.includes('data-' + attribute)) {properties[attribute] = { /* DATA-* ATTRIBUTES */
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        return properties;};
        if (!Option.observedAttributes.includes(attribute)) {properties[attribute] = { /* ALL OTHER PROPS */
            set: (value) => {this.props[attribute] = value;},
            get: () => this.props[attribute],
            enumerable: false};
        return properties;};
    }, {}));
    list.forEach(attribute => this[attribute] = this.props[attribute]);
}
set props(object)       {this._props = object;}
get props()             {return this._props;}
constructor(props)      {super(); this.props = props; this.#setAccessors(Object.keys(this.props));}
connectedCallback()     {if (!this.ownerDocument.defaultView) {return;};
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = this.#render();
    this.shadow.adoptedStyleSheets = [style];
}
#render()           {console.log('foe', this.icon, this.caption, this.attempts);
    return (`
    <link rel="stylesheet" href=${this.#FONTAWESOME.url} integrity=${this.#FONTAWESOME.integrity} crossorigin="anonymous" referrerpolicy="no-referrer" />
    <span class='fa-li'><i class='${this.icon}'></i></span>
    <span>${this.caption}</span>`); /* EXPRESSED IN HTML LIKE JSX */
}
};

customElements.define('tk-option', Option);