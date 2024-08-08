
import style from '../../css/option.module.json' with {type: 'json'}; /* JSON file instead of CSS import as no support from Safari */
import {JSONtoCSS} from '../utils/helpers.js';
/* CSS Module import is NOT supported in Safari:
> Shadow DOM styling is achieved by parsing one JSON file containing all CSS rules which will be parsed to CSS
> One CSSStyleSheet Object (built-in) is then created and pushed to the styleSheets Collection of the Shadow DOM
> Whenever importing CSS module (eg: Chrome) is supported:
    --> import style from './file.CSS' with {type: 'CSS'}; */


export default class Option extends HTMLElement {
static get observedAttributes() {return ['key', 'class', 'data-icon', 'data-caption', 'data-handle'];}
#FONTAWESOME = {/* Font Awesome CDN public keys */
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css',
    integrity: 'sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=='
}
#setAccessors(list)     {Object.defineProperties(this, list.reduce(
    (properties, attribute) => {
        if (Option.observedAttributes.includes(attribute)) {properties[attribute] = { /* Global HTML Attributes */
            set: (value) => {this.setAttribute(attribute, value);},
            get: () => this.getAttribute(attribute),
            enumerable: false};
        return properties;};
        if (Option.observedAttributes.includes('data-' + attribute)) {properties[attribute] = { /* data-* Attributes */
            set: (value) => {this.dataset[attribute] = value;},
            get: () => this.dataset[attribute],
            enumerable: false};
        return properties;};
        if (!Option.observedAttributes.includes(attribute)) {properties[attribute] = { /* Properties */
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
    this.shadow.adoptedStyleSheets = [JSONtoCSS(style)];
}
#render()               {/* Expressed in HTML as JSX  */ return (`
    <link rel="stylesheet" href=${this.#FONTAWESOME.url} integrity=${this.#FONTAWESOME.integrity} crossorigin="anonymous" referrerpolicy="no-referrer" />
    <span class='fa-li'><i class='${this.icon}'></i></span>
    <span>${this.caption}</span>`); 
}
};

customElements.define('tk-option', Option);