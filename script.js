let currentResult = 0;
let buffer = '';
let pendingOp = null;

const screen  = document.querySelector('.screen');
const buttons = document.querySelector('.button-group');

const operation = {
  add:      (a,b) => a + b,
  subtract: (a,b) => a - b,
  multiply: (a,b) => a * b,
  divide:   (a,b) => b === 0 ? NaN : a / b
};

function commit(){
  if(buffer === '') return;

  const value = parseFloat(buffer);
  currentResult = pendingOp ? pendingOp(currentResult, value) : value;
  screen.textContent = currentResult;
  buffer = '';
}

buttons.addEventListener('click', e => {
  if(!e.target.matches('button')) return;

  const id = e.target.id;

  if(!isNaN(parseInt(id)) || id === 'zero'){
    const digit = id === 'zero' ? 0 : id;
    if(buffer === 0) buffer = '';
    buffer += digit;
    screen.textContent = buffer;
    return;
  }

  if(id === 'decimal'){
    if(!buffer.includes('.')){
      if(buffer === '') buffer = 0;
      buffer += '.';
    }
    screen.textContent = buffer;
    return;
  }

  if(id === 'clear'){
    currentResult = 0;
    buffer = '';
    pendingOp = null;
    screen.textContent = 0;
    return;
  }

  if(id === 'backspace'){
    buffer = buffer.slice(0, -1);
    screen.textContent = buffer || 0;
    return;
  }

  if(id === 'equals'){
    commit();
    pendingOp = null;
    return;
  }

  commit();
  switch(id){
    case 'add':
      pendingOp = operation.add;
      break;
    
    case 'subtract': 
      pendingOp = operation.subtract; 
      break;

    case 'multiply': 
      pendingOp = operation.multiply; 
      break;

    case 'divide':   
      pendingOp = operation.divide; 
      break;
  }
});