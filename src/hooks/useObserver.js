
import {dialog as DOMdialog, update as DOMupdate} from '../dom.js';

const threshold = 0.70;
export default function useObserver (callBack) {

let element, oldX, oldY, newX, newY;
return drag;

function drag (event) {
    if (event.target.tagName !== 'TK-TOKEN') {return;}; /* EVENT-DELEGATION: EXIT IF TARGET IS NOT ONE INNER TOKEN ELEMENT */
    element = event.target;
    event.preventDefault(); event.stopPropagation();
    element.classList.add('dragged');
    [oldX, oldY] = [event.clientX, event.clientY];
    document.addEventListener('pointerup', end); document.addEventListener('pointermove', move);
};
function move (event) {
    event.preventDefault();
    element.classList.add('dragBackground');
    [newX, newY] = [oldX - event.clientX, oldY - event.clientY];
    [oldX, oldY] = [event.clientX, event.clientY];
    [element.style.left, element.style.top] = [`${element.offsetLeft - newX}px`, `${element.offsetTop - newY}px`];
};
function end (event) {
    event.preventDefault();

    const abortSignal = () => {
        element.classList.remove('dragged', 'dragBackground'); element.removeAttribute('style');
        document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', end);
    };

    let isDropped = false,
        from = element.parentNode, to = null,
        OP_1 = {value: +element.dataset.value, text: element.dataset.text}, OP_2 = null,
        symbol = null, expression = null;

    let dropZones = Array.from(document.querySelectorAll('tk-slot')).filter(node => node.id !== from.id);
    for (let target of dropZones) {if (isIN(element, target)) {isDropped = true; to = target; break;};};

    if (!isDropped) {abortSignal(); return;}; /* NOT A VALID MOVE */
    if (!to.hasChildNodes()) {abortSignal(); to.appendChild(element); return;}; /* MOVE TO EMPTY SLOT */

    OP_2 = {value: +to.firstChild.dataset.value, text: to.firstChild.dataset.text};
    let dialog = DOMdialog();
    document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', end);

    dialog.onclick = () => {dialog.close(); dialog.remove();
        element.classList.remove('dragged', 'dragBackground'); element.removeAttribute('style');
    };
    document.querySelectorAll('i.symbol').forEach(node => node.onclick = function () {
        symbol = node.dataset.math;
        expression = callBack({OP_1, OP_2, symbol});
        DOMupdate(from, to, expression);
    });
};
function isIN (element, target) {
    let figure = element.getBoundingClientRect(), zone = target.getBoundingClientRect();
    let inX = Math.max(0, Math.min(1, (figure.right - zone.left) / figure.width, (zone.right - figure.left) / figure.width));
    let inY = Math.max(0, Math.min(1, (figure.bottom - zone.top) / figure.height, (zone.bottom - figure.top) / figure.height));
return inX * inY > threshold;
};
};