
// Modern version of the Fisher–Yates shuffle algorithm
Array.prototype.fisherYates = function () {
    let i = this.length - 1;
    do {let j = ~~(Math.random() * (i + 1)); [this[i], this[j]] = [this[j], this[i]];} while (--i);
    return this;
};

// TOKENIZED Expression => String Prototype
String.prototype.cleanBracket = function () {
    const OPS = {'+': 2, '-': 2, '×': 1, '/': 1}; // Reverse order of Operator Precedence
    const toKeep = (token) => token !== 'X';
    const toSpace = (token) => token in OPS ? ` ${token} ` : token;
    const mark = (bracket) => {tokens[bracket.in] = 'X'; tokens[bracket.out] = 'X';};
    let tokens = this.match(/[0-9Ee.]+|[^\sa-z]|[a-z]+/g).map(t => isNaN(t) ? t : +t);
    let map = [], at = null, ante = null, post = null;
    for (let [i, token] of tokens.entries()) {/* Mapping of Brackets */
        if (token === '(') {map.push({in: i, parent: at, value: 0, ante}); at = map.length - 1; ante = null;};
        if (token === ')') {for (let j = map.length - 1; j >= 0; j--) {if (!map[j].out) {map[j].out = i; at = map[j].parent; post = j; break;};};};
        if (Object.keys(OPS).includes(token)) {ante = token; if (at != null) {map[at].value = Math.max(OPS[token], map[at].value);}; if (post != null) {map[post].post = token; post = null;};};
    };
    for (let bracket of map) {let {ante, post, value} = bracket; /* Liminary Clean-up for Inheritance requirement */
        if ((!ante && !post) || // Outermost
            (value === 0)) // Operator-free
        {mark(bracket); return tokens.filter(toKeep).join('').cleanBracket();};
    };
    for (let bracket of map) {let {ante, post, value} = bracket; /* Executive Clean-up for Operated brackets */
        if ((['-','/'].includes(ante) && value < OPS[ante] && (value <= OPS[post] || !post)) || // Left-to-right Associativity sensitive (Strict <)
            (['+','×'].includes(ante) && value <= OPS[ante] && (value <= OPS[post] || !post)) || // Not Associativity sensitive (Unstrict <=)
            (!ante && value <= OPS[post])) // Null Left Context
        {mark(bracket);};
    };
return tokens.filter(toKeep).map(toSpace).join('');
};