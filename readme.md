### _tik tek_

This repository is the client side for playing **Tik Tek** game application.
Server-side rendering for algebra parse and solver.

<details>
<summary>Readings</summary>

https://developer.mozilla.org/en-US/docs/Web/API/Web_components
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView

https://javascript.info/web-components
https://javascript.info/ui

https://www.neosoft.fr/nos-publications/blog-tech/html-5-introduction-aux-web-components/
https://blog.openreplay.com/an-introduction-to-native-web-components/
https://web.dev/articles/custom-elements-v1

https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements
https://dom.spec.whatwg.org/

https://dev.to/joanllenas/web-components-custom-elements-5cdk
https://beeit.io/blog/custom-javascript-web-components
https://kinsta.com/blog/web-components/

https://stackoverflow.com/questions/73013528/is-it-possible-to-create-web-components-without-using-class

https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch04
https://gomakethings.com/progressively-enhancing-a-web-component/
https://gomakethings.com/handling-asychronous-rendering-in-web-components/
https://gomakethings.com/articles/page/5/
https://itnext.io/handling-data-with-web-components-9e7e4a452e6e
https://hartenfeller.dev/blog/web-components-step-by-step
https://simbyone.com/building-dynamic-web-components-with-javascript-and-web-apis/

https://eisenbergeffect.medium.com/debunking-web-component-myths-and-misconceptions-ea9bb13daf61
https://eisenbergeffect.medium.com/about-web-components-7b2a3ed67a78
https://eisenbergeffect.medium.com/2023-state-of-web-components-c8feb21d4f16

https://medium.com/@avicsebooks/super-vs-reflect-construct-2445eefd3b3a
https://medium.com/swlh/functional-web-components-90a0edc2aa90


```javascript
function CustomElement() {
    return Reflect.construct(HTMLElement, [], CustomElement);
}
Object.setPrototypeOf(CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(CustomElement, HTMLElement);

customElements.define('custom-element', CustomElement);
```
</details>