
import Gameboard from './components/board.js';
import Menu from './components/menu.js';

const _FONTAWESOME = {/* Web component name */
    circleInfo: {class: 'fa-solid fa-circle-info'},
    circleXmark: {class: 'fa-solid fa-circle-xmark'},
};

export const set = (boardSize, data, moveCallback) => {
let log = document.getElementById('log'); log.classList.add('hide'); log.classList.remove('appear');
document.querySelector('tiktek-game')?.remove();
let game = new Gameboard(boardSize, data, moveCallback);
document.getElementById('game').appendChild(game);
};

export const button = ({target, tokens}) => {
const options = {open: {icon: 'fa-solid fa-bars', caption: target, handler: null}};
document.querySelector('menu-inplay.button')?.remove();
let button = new Menu({options}); button.classList.add('button');
document.getElementById('game').appendChild(button);
};

export const menu = (start, attempts) => {
const options = {
    quit:   {icon: 'fa-solid fa-right-from-bracket', caption: `Quit`, handler: null},
    solve:  {icon: 'fa-solid fa-lightbulb', caption: `Solve`, handler: null},
    log:    {icon: 'fa-solid fa-clipboard-list', caption: `History`,
                handler: () => {let log = document.getElementById('log'); log.classList.toggle('appear'); log.classList.toggle('hide');}},
    draw:   {icon: 'fa-solid fa-dice', caption: `Draw`, handler: null},
    start:  {icon: 'fa-solid fa-rotate-right', caption: `${attempts} trial${attempts > 1 ? 's' : ''}`, handler: start}
};
document.querySelector('menu-inplay.nav')?.remove();
let menu = new Menu({options, attempts}); menu.classList.add('nav');
document.getElementById('game').appendChild(menu);
};

export const log = (attempt) => {
let attemptLog = document.createElement('div'); attemptLog.classList.add('attemptLog'); attemptLog.dataset.attempt = attempt;
let closeButton = document.createElement('i'); closeButton.setAttribute('class', _FONTAWESOME.circleXmark.class);
closeButton.onclick = (event) => {event.target.parentNode.remove();};
attemptLog.appendChild(closeButton);
document.getElementById('log').prepend(attemptLog);
};

export const print = (message) => {
const board = document.getElementById('messageBoard');
const log = document.getElementById('log');
const info = document.createElement('i'); info.className = 'fa-solid fa-circle-info info';

let expression = document.createElement('span');
['text', 'value'].forEach(attribute => expression.dataset[attribute] = message[attribute]);
expression.innerText = `${message.text} = ${message.value}`;

let wrapper = document.createElement('span'); wrapper.classList.add('wrapper');
wrapper.replaceChildren(info, expression); wrapper.classList.add('slide-down');
board.appendChild(wrapper);

setTimeout(() => {wrapper.classList.add('fade-out');}, 4000); // Does not work --> TO BE FIXED!
setTimeout(() => {expression.removeAttribute('class'); log.firstChild.appendChild(expression); wrapper.remove();}, 5000);
};

const DOM = {button, log, menu, print, set};
export default DOM;