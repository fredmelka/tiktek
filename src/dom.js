
import Gameboard from './components/board.js';
import Token from './components/token.js';
import Menu from './components/menu.js';

const _FONTAWESOME = {/* Web component name */ 
    bars: {classes: ['fa-solid', 'fa-bars', 'menu']},
    clipboardList: {classes: ['fa-solid', 'fa-clipboard-list']},
    circleXmark: {classes: ['fa-solid', 'fa-circle-xmark']},
    lightbulb: {classes: ['fa-solid', 'fa-lightbulb']},
    paperPlane: {classes: ['fa-solid', 'fa-paper-plane']},
    rotateRight: {classes: ['fa-solid', 'fa-rotate-right']},
    plus: {classes: ['fa-solid', 'fa-plus', 'fa-2xl', 'symbol'], symbol: '+'},
    minus: {classes: ['fa-solid', 'fa-minus', 'fa-2xl', 'symbol'], symbol: '-'},
    xmark: {classes: ['fa-solid', 'fa-xmark', 'fa-2xl', 'symbol'], symbol: '*'},
    divide: {classes: ['fa-solid', 'fa-divide', 'fa-2xl', 'symbol'], symbol: '/'}
};

export const menu = (start, attempts) => {
const options = {
    quit:   {icon: 'fa-solid fa-paper-plane', caption: `Quit`, handler: null},
    solve:  {icon: 'fa-solid fa-lightbulb', caption: `Solve`, handler: null},
    log:    {icon: 'fa-solid fa-clipboard-list', caption: `History`,
                handler: () => {let log = document.getElementById('console'); log.classList.toggle('appear'); log.classList.toggle('hide');}},
    draw:   {icon: 'fa-solid fa-dice', caption: `Draw`, handler: null},
    start:  {icon: 'fa-solid fa-rotate-right', caption: `Trial${attempts > 1 ? 's' : ''} ${attempts}`, handler: start}
};
document.querySelector('tk-menu')?.remove();
let menu = new Menu({options, attempts}); menu.classList.add('inPlay');
document.getElementById('game').appendChild(menu);
};
export const set = (boardSize, data, moveCallback) => {
let console = document.getElementById('console'); console.classList.add('hide'); console.classList.remove('appear');
document.querySelector('tk-game')?.remove();
let game = new Gameboard(boardSize, data, moveCallback);
document.getElementById('game').appendChild(game);
};
export const button = ({target, tokens}) => {
const options = {open: {icon: 'fa-solid fa-bars', caption: target, handler: null}};
document.querySelector('.mainButton')?.remove();
let button = new Menu({options}); button.classList.add('mainButton');
document.getElementById('game').appendChild(button);
};
export const update = (from, to, computation) => {
    from.replaceChildren(); to.replaceChildren();
    let token = new Token(); ['text', 'value'].forEach(attribute => token[attribute] = computation[attribute]);
    to.appendChild(token);
    return token;
};
export const log = (attempt) => {
    let log = document.createElement('div'); log.classList.add('log'); log.dataset.attempt = attempt;
    let closeButton = document.createElement('i'); closeButton.classList.add(..._FONTAWESOME.circleXmark.classes);
    closeButton.onclick = (event) => {event.target.parentNode.remove();};
    log.appendChild(closeButton);
    document.getElementById('console').prepend(log);
};
export const print = (message) => {
    const messenger = document.getElementById('messenger'), console = document.getElementById('console');
    let expression = document.createElement('span');
    expression.classList.add('slide-down');
    expression.innerText = `${message.text} = ${message.value}`;
    ['text', 'value'].forEach(attribute => expression.dataset[attribute] = message[attribute]);
    messenger.appendChild(expression);
    setTimeout(() => {expression.classList.add('fade-out');}, 4000); // Does not work --> TO BE FIXED!
    setTimeout(() => {expression.className = ''; console.firstChild.appendChild(expression);}, 5000);
};
export const dialog = () => {
    let dialog = document.createElement('dialog');
    for (let icon in _FONTAWESOME) {
        if (!('symbol' in _FONTAWESOME[icon])) {continue;};
        let symbol = document.createElement('i'); symbol.dataset.math = _FONTAWESOME[icon].symbol;
        symbol.classList.add(..._FONTAWESOME[icon].classes);
        dialog.appendChild(symbol);
    };
    document.getElementById('game').appendChild(dialog);
    dialog.showModal();
    return dialog;
};

const DOM = {button, dialog, log, menu, print, set, update};
export default DOM;