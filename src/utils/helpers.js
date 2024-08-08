
// Utility Function => Convert data from one JSON Object to one CSS constructible CSSstyleSheet 
export const JSONtoCSS = (style) => {
let CSScontent = Object.entries(style).map(([selector, properties]) => `${selector} ${properties}`).join(' ');
let styleSheet = new CSSStyleSheet(); styleSheet.replaceSync(CSScontent);
return styleSheet;
};