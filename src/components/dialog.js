
import MathBar from './mathbar.js';


export default function Dialog (callback) { /* Native HTML element Not a custom element */
let dialogElement = document.createElement('dialog');
dialogElement.addEventListener('click', () => {dialogElement.close(); dialogElement.remove();});
let setOperator = new MathBar({symbolHandler: callback}); dialogElement.appendChild(setOperator); /* Prop callback is explicitly passed here */
document.getElementById('game').appendChild(dialogElement);
return dialogElement;
};