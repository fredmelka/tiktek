
import Token from '../components/token.js';
import Dialog from '../components/dialog.js';


const threshold = 0.70;
export default function useObserver (callBack) {

let element, oldX, oldY, newX, newY;
return select;

function select (event) {
if (event.target.tagName !== 'GAME-TOKEN') {return;}; /* Event delegation --> Returns if target isn't one inner Token element */
element = event.target;
event.preventDefault(); event.stopPropagation();
element.classList.add('dragged');
[oldX, oldY] = [event.clientX, event.clientY];
document.addEventListener('pointerup', drop); document.addEventListener('pointermove', drag);
};
function drag (event) {
event.preventDefault();
element.classList.add('dragging');
[newX, newY] = [oldX - event.clientX, oldY - event.clientY];
[oldX, oldY] = [event.clientX, event.clientY];
[element.style.left, element.style.top] = [`${element.offsetLeft - newX}px`, `${element.offsetTop - newY}px`];
};
function drop (event) {
event.preventDefault();

const abortSignal = () => {
    element.classList.remove('dragged', 'dragging'); element.removeAttribute('style');
    document.removeEventListener('pointerup', drop); document.removeEventListener('pointermove', drag);
};
const callBackhandler = (event) => {
    symbol = event.composedPath()[0].dataset.math;
    let {text, value} = callBack({OP_1, OP_2, symbol});
    let computedToken = new Token({text, value});
    from.replaceChildren(); to.replaceChildren(computedToken);
};

let isDropped = false,
    from = element.parentNode,
    to = null,
    OP_1 = {value: +element.dataset.value, text: element.dataset.text},
    OP_2 = null,
    symbol = null;

let dropZones = document.querySelectorAll(`game-slot:not([id='${from.id}'])`);
for (let target of dropZones) {if (isIN(element, target)) {isDropped = true; to = target; break;};};

if (!isDropped) {abortSignal(); return;}; /* Not a valid move */
if (!to.hasChildNodes()) {abortSignal(); to.appendChild(element); return;}; /* Move to an empty slot */

OP_2 = {value: +to.firstChild.dataset.value, text: to.firstChild.dataset.text};

let modal = new Dialog(callBackhandler); modal.showModal();
modal.addEventListener('click', () => {element.classList.remove('dragged', 'dragging'); element.removeAttribute('style');});

document.removeEventListener('pointerup', drop); document.removeEventListener('pointermove', drag);
};
function isIN (element, target) {
    let figure = element.getBoundingClientRect(), zone = target.getBoundingClientRect();
    let inX = Math.max(0, Math.min(1, (figure.right - zone.left) / figure.width, (zone.right - figure.left) / figure.width));
    let inY = Math.max(0, Math.min(1, (figure.bottom - zone.top) / figure.height, (zone.bottom - figure.top) / figure.height));
return inX * inY > threshold;
};
};