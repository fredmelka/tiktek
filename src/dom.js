
const _COLORS = {
    palette: ['red', 'orange', 'beige', 'lime', 'geekblue', 'purple', 'pink', 'rose', 'yellow', 'violet', 'blue', 'brown'],
    computed: 'white'
};

const _ICONS = {
    xmark: {fontAwesome: 'circle-xmark', class: ['fa-regular', 'fa-circle-xmark']},
    kickoff: {fontAwesome: 'rotate-right', class: ['fa-solid', 'fa-rotate-right']},
    life: {fontAwesome: 'user-shield', class: ['fa-solid', 'fa-user-shield']},
};

export const setBoard = (length) => {
    let spots = [];
    for (let id = 0; id < length; id++) {let e = document.createElement('div'); e.id = id; e.classList.add('spot'); spots.push(e);};
    document.getElementById('board').replaceChildren(...spots);
};
export const fillState = ({start, attempts, target, tokens}) => {
    {/* Header */
    let kickoff = document.createElement('i');
        kickoff.classList.add(..._ICONS.kickoff.class); kickoff.onclick = start;
    let goal = document.createElement('p');
        goal.innerText = `${target}`.padStart(3,'0');
    let count = document.createElement('div');
        {let life = document.createElement('i'); life.classList.add(..._ICONS.life.class);
        let trials = document.createElement('span'); trials.innerText = ` `+`${attempts}`.padStart(2,'0');
        count.replaceChildren(life, trials);};
    document.getElementById('score').replaceChildren(kickoff, goal, count);
    };
    {/* Board */
    let {palette} = _COLORS;
    let spots = document.querySelectorAll('div.spot'); spots.forEach(node => node.replaceChildren());
    for (let [i, token] of tokens.entries()) {
        let e = document.createElement('p'); e.classList.add(`number`, palette[Math.floor(Math.random() * palette.length)]);
        e.innerText = token; e.setAttribute('data-text', `${token}`);
        spots[i].appendChild(e);};
    };
};
export const updateState = (from, to, next) => {
    from.replaceChildren(); to.replaceChildren();
    let e = document.createElement('p'); e.classList.add('number', _COLORS.computed);
    e.innerText = next.value; e.setAttribute('data-text', next.text);
    to.appendChild(e);
    return e;
};
export const listen = (callBack, HOF) => {
    document.querySelectorAll('p.number').forEach(node => callBack(node, HOF));
};
export const print = (step) => {
    let e = document.createElement('div'); e.classList.add('expression');
    e.setAttribute('data-text', step.text); e.setAttribute('data-value', step.value);
    let text = document.createElement('span'); text.innerText = step.text;
    let xmark = document.createElement('i'); xmark.classList.add(..._ICONS.xmark.class);
    xmark.onclick = (e) => {e.target.parentNode.remove();};
    e.replaceChildren(text, xmark); document.getElementById('console').prepend(e);
};
export const dialog = () => {
    const symbols = [{img: '➕', math: '+'}, {img: '➖', math: '-'}, {img: '✖️', math: '*'}, {img: '➗', math: '/'}];
    let dialog = document.createElement('dialog');
    for (let operator of symbols) {
        let e = document.createElement('div'); e.classList.add('symbol');
        e.innerText = operator.img; e.setAttribute('data-math', operator.math);
        dialog.appendChild(e);};
    document.getElementById('board').appendChild(dialog);
    dialog.showModal();
    return dialog;
};

const DOM = {dialog, fillState, listen, print, setBoard, updateState};
export default DOM;