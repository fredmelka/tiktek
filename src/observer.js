
import {dialog as DOMdialog, updateState as DOMupdate} from './dom.js';

const threshold = 0.70;
export default function useObserver (element, callBack) {

let oldX, oldY, newX, newY;
element.onpointerdown = start;

function start (event) {
    event.preventDefault();
    element.classList.add('dragSTART');
    [oldX, oldY] = [event.clientX, event.clientY];
    document.onpointerup = end; document.onpointermove = move;
};
function move (event) {
    event.preventDefault();
    element.classList.add('dragMOVE');
    [newX, newY] = [oldX - event.clientX, oldY - event.clientY];
    [oldX, oldY] = [event.clientX, event.clientY];
    [element.style.left, element.style.top] = [`${element.offsetLeft - newX}px`, `${element.offsetTop - newY}px`];
};
function end (event) {
    event.preventDefault();
    let done = false,
        from = event.target.parentNode, to = null,
        OP_1 = {value: +element.innerText, text: element.dataset.text},
        OP_2,
        symbol = null, next = null;
    let DZ = Array.from(document.querySelectorAll('div.spot')).filter(node => node.id !== from.id);
    for (let target of DZ) {if (isIN(element, target)) {done = true; to = target; break;};};
    if (!done) {
        element.classList.remove('dragSTART', 'dragMOVE'); element.style = null;
        document.onpointermove = null; document.onpointerup = null;
    return;};
    if (!to.hasChildNodes()) {
        element.classList.remove('dragSTART', 'dragMOVE'); element.style = null;
        to.appendChild(element);
        document.onpointermove = null; document.onpointerup = null;
    return;};
    OP_2 = {value: +to.firstChild.innerText, text: to.firstChild.dataset.text};
    let dialog = DOMdialog();
    dialog.onclick = () => {dialog.close(); dialog.remove();
        element.classList.remove('dragSTART', 'dragMOVE'); element.style = null;
    };
    document.querySelectorAll('div.symbol').forEach(node => node.onclick = function () {
        symbol = node.dataset.math;
        next = callBack({OP_1, OP_2, symbol});
        let newFigure = DOMupdate(from, to, next); useObserver(newFigure, callBack);
    });
    document.onpointermove = null; document.onpointerup = null;
};
function isIN (element, target) {
    let figure = element.getBoundingClientRect(), zone = target.getBoundingClientRect();
    let inX = Math.max(0, Math.min(1, (figure.right - zone.left) / figure.width, (zone.right - figure.left) / figure.width));
    let inY = Math.max(0, Math.min(1, (figure.bottom - zone.top) / figure.height, (zone.bottom - figure.top) / figure.height));
return inX * inY > threshold;
};
};