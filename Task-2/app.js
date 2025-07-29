const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let operand1 = '';
let operand2 = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.getAttribute('data-value');

    if (button.classList.contains('operator')) {
      if (currentInput !== '') {
        operand1 = currentInput;
        operator = val;
        currentInput = '';
      }
    } else if (button.id === 'equals') {
      if (operand1 && operator && currentInput) {
        operand2 = currentInput;
        let result;
        switch (operator) {
          case '+': result = parseFloat(operand1) + parseFloat(operand2); break;
          case '-': result = parseFloat(operand1) - parseFloat(operand2); break;
          case '*': result = parseFloat(operand1) * parseFloat(operand2); break;
          case '/': 
            result = parseFloat(operand2) === 0 ? 'Error' : parseFloat(operand1) / parseFloat(operand2); 
            break;
        }
        updateDisplay(result);
        currentInput = result.toString();
        operator = '';
        operand1 = '';
        operand2 = '';
      }
    } else if (button.id === 'clear') {
      currentInput = '';
      operator = '';
      operand1 = '';
      operand2 = '';
      updateDisplay('0');
    } else {
      // Digits and dot
      if (!(val === '.' && currentInput.includes('.'))) {
        currentInput += val;
        updateDisplay(currentInput);
      }
    }
  });
});
