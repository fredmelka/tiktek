### _tik tek_

This repository is the client side for playing **Tik Tek** game application.

Server-side rendering for algebra parsing and solver.

<details>
<summary>Readings</summary>

https://html.spec.whatwg.org

https://dom.spec.whatwg.org/

https://mostly-adequate.gitbook.io/mostly-adequate-guide

https://gomakethings.com/articles/

https://www.stefanjudis.com/blog/

https://eisenbergeffect.medium.com/debunking-web-component-myths-and-misconceptions-ea9bb13daf61

https://github.com/stefanjudis/sparkly-text

https://medium.com/swlh/functional-web-components-90a0edc2aa90

https://stackoverflow.com/questions/73013528/is-it-possible-to-create-web-components-without-using-class
</details>

<details>
<summary>Function Web Component</summary>

Read about Reflect and Proxy native objects 

```javascript
function CustomElement() {
    return Reflect.construct(HTMLElement, [], CustomElement);
}
Object.setPrototypeOf(CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(CustomElement, HTMLElement);

customElements.define('custom-element', CustomElement);
```
</details>