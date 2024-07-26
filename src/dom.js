
const _COLORS = {/* CSS classes */
    palette: ['red', 'orange', 'beige', 'lime', 'geekblue', 'purple', 'pink', 'rose', 'yellow', 'violet', 'blue', 'brown'],
    computed: 'computed-geekblue'
};
const _FONTAWESOME = {/* Web component name */ 
    bars: {classes: ['fa-solid', 'fa-bars', 'menu']},
    circleXmark: {classes: ['fa-solid', 'fa-circle-xmark']},
    lightbulb: {classes: ['fa-solid', 'fa-lightbulb']},
    paperPlane: {classes: ['fa-solid', 'fa-paper-plane']},
    rotateRight: {classes: ['fa-solid', 'fa-rotate-right']},
    plus: {classes: ['fa-solid', 'fa-plus', 'fa-2xl', 'symbol'], symbol: '+'},
    minus: {classes: ['fa-solid', 'fa-minus', 'fa-2xl', 'symbol'], symbol: '-'},
    xmark: {classes: ['fa-solid', 'fa-xmark', 'fa-2xl', 'symbol'], symbol: '*'},
    divide: {classes: ['fa-solid', 'fa-divide', 'fa-2xl', 'symbol'], symbol: '/'}
};
let _IDPRINTS = [];

export const set = (length) => {
    let slots = [];
    for (let id = 0; id < length; id++) {let e = document.createElement('div'); e.id = id; e.classList.add('slot'); slots.push(e);};
    document.getElementById('board').replaceChildren(...slots);
};
export const fill = ({startMethod, attempts, target, tokens}) => {
    {/* Menu */
    let menu = document.getElementById('menu');
    let options = ''; /*  --> TO BE REFACTORED PROPERLY USING LOOP AND SETTING OBJECT! */
    options += `<li>
        <span class='bullet'><i class='${_FONTAWESOME.lightbulb.classes.join(' ')}'></i></span>
        <span>Solve for ${`${target}`.padStart(3,'0')}</span>
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
    };
    {/* Board */
    let {palette} = _COLORS;
    let slots = document.querySelectorAll('div.slot'); slots.forEach(node => node.replaceChildren());
    for (let [i, token] of tokens.entries()) {
        let e = document.createElement('p'); e.classList.add(`number`, palette[Math.floor(Math.random() * palette.length)]);
        e.innerText = token; e.setAttribute('data-text', `${token}`); e.setAttribute('data-value', token);
        slots[i].appendChild(e);};
    };
    {/* Log */
    let menu = document.createElement('i'); menu.classList.add(..._FONTAWESOME.bars.classes);
    let log = document.getElementById('console'); log.classList.add('hide');
    'touchstart touchend'.split(' ').forEach(event => menu.addEventListener(event, function () {}, true));
    menu.onclick = () => {log.classList.toggle('hide'); log.classList.toggle('appear'); log.classList.remove('fade-out');};
    document.getElementById('board').appendChild(menu);
    };
};
export const update = (from, to, next) => {
    from.replaceChildren(); to.replaceChildren();
    let e = document.createElement('p'); e.classList.add('number', _COLORS.computed);
    e.setAttribute('data-text', next.text); e.setAttribute('data-value', next.value);
    e.innerText = Number.isInteger(next.value) ? next.value : `${Math.floor(next.value)}..`;
    to.appendChild(e);
    return e;
};
export const listen = (hook, callBack) => {
    document.querySelectorAll('p.number').forEach(node => hook(node, callBack));
};
export const log = (attempt) => {
    let e = document.createElement('div'); e.classList.add('log', attempt % 2 ? 'even' : 'odd');
    e.setAttribute('data-attempt', attempt);
    let closeButton = document.createElement('i'); closeButton.classList.add(..._FONTAWESOME.circleXmark.classes);
    closeButton.onclick = (event) => {event.target.parentNode.remove();};
    e.appendChild(closeButton);
    document.getElementById('console').prepend(e);
};
export const print = (step) => {

    const log = document.getElementById('console');
    _IDPRINTS.forEach(clearTimeout); _IDPRINTS = [];
    log.classList.remove('fade-out', 'hide'); log.classList.add('appear');

    let e = document.createElement('span'); e.innerText = step.text;
    e.setAttribute('data-text', step.text); e.setAttribute('data-value', step.value);
    log.firstChild.prepend(e);
    _IDPRINTS.push(setTimeout(() => {log.classList.toggle('fade-out');}, 3000));
    _IDPRINTS.push(setTimeout(() => {log.classList.toggle('hide'); log.classList.toggle('appear');}, 4000));
};
export const dialog = () => {
    let dialog = document.createElement('dialog');
    for (let icon in _FONTAWESOME) {
        if (!('symbol' in _FONTAWESOME[icon])) {continue;};
        let e = document.createElement('i'); e.setAttribute('data-math', _FONTAWESOME[icon].symbol);
        e.classList.add(..._FONTAWESOME[icon].classes);
        dialog.appendChild(e);
    };
    document.getElementById('board').appendChild(dialog);
    dialog.showModal();
    return dialog;
};

const DOM = {dialog, fill, listen, log, print, set, update};
export default DOM;