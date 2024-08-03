
import Gameboard from './components/board.js';
import Token from './components/board.token.js';

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

export const set = (boardSize, data, moveCallback) => {
    document.querySelector('tk-game') && document.querySelector('tk-game').remove();
    let game = new Gameboard(boardSize, data, moveCallback);
    document.getElementById('game').appendChild(game);
};
export const fill = ({startMethod, attempts, target, tokens}) => {
    {/* Menu */
    let menu = document.getElementById('menu');
    let options = ''; /*  --> TO BE REFACTORED PROPERLY USING LOOP AND SETTING OBJECT! */
    options += `<li>
        <span class='bullet'><i class='${_FONTAWESOME.lightbulb.classes.join(' ')}'></i></span>
        <span>Solve for ${`${target}`.padStart(3,'0')}</span>
        </li>`;
    options += `<li class='button_history'>
        <span class='bullet'><i class='${_FONTAWESOME.clipboardList.classes.join(' ')}'></i></span>
        <span>History</span>
        </li>`;
    options += `<li class='button_attempts'>
        <span class='bullet'><i class='${_FONTAWESOME.rotateRight.classes.join(' ')}'></i></span>
        <span>Attempt # ${`${attempts}`.padStart(2,'0')}</span>
        </li>`;
    options += `<li>
        <span class='bullet'><i class='${_FONTAWESOME.paperPlane.classes.join(' ')}'></i></span>
        <span>Quit</span>
        </li>`;
    options = '<ul>'+options+'</ul>';
    menu.innerHTML = options;
    document.querySelector('.button_attempts').onclick = startMethod;
    document.querySelector('.button_history').onclick = () => {let log = document.getElementById('console');
        log.classList.toggle('appear'); log.classList.toggle('hide');};
    };
    {/* Board
    document.querySelectorAll('tk-slot').forEach((node, index) => {
        node.replaceChildren();
        if (tokens[index]) {node.innerHTML = `<tk-token data-text=${tokens[index]} data-value=${tokens[index]} />`;};});
    */
    };
    {/* Log */
    let menu = document.createElement('i'); menu.classList.add(..._FONTAWESOME.bars.classes);
    let log = document.getElementById('console'); log.classList.add('hide');
    'touchstart touchend'.split(' ').forEach(event => menu.addEventListener(event, function () {}, true));
    document.querySelector('tk-game').appendChild(menu);
    };
};
export const update = (from, to, expression) => {
    from.replaceChildren(); to.replaceChildren();
    let token = new Token();
    ['text', 'value'].forEach(attribute => token[attribute] = expression[attribute]);
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

const DOM = {dialog, fill, log, print, set, update};
export default DOM;