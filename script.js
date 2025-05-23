const screen  = document.querySelector('.screen');
const buttons = document.querySelector('.button-group');

const operation = {
  add:      (a,b) => a + b,
  subtract: (a,b) => a - b,
  multiply: (a,b) => a * b,
  divide:   (a,b) => b === 0 ? NaN : a / b
};