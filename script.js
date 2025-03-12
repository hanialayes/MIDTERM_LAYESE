let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;
const darkModeToggle = document.getElementById('darkModeToggle');
const backspaceButton = document.getElementById('backspace');

function appendToDisplay(value) {
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    display.value = '';
}

function setOperator(op) {
    if (currentInput === '' && op !== '+/-' && op !== '√') return;

    if (op === '+/-') {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.value = currentInput;
        }
        return;
    }

    if (op === '√') {
        if (currentInput !== '') {
            const num = parseFloat(currentInput);
            if (num >= 0) {
                currentInput = Math.sqrt(num).toString();
                display.value = currentInput;
            } else {
                display.value = 'Error';
                currentInput = '';
            }
        }
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        calculate();
    }
    operator = op;
    currentInput = '';
}

function calculate() {
    if (operator === '' || currentInput === '') return;
    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                display.value = 'Error';
                return;
            }
            result = firstOperand / secondOperand;
            break;
        case '%':
            result = (firstOperand / 100) * secondOperand;
            break;
    }

    display.value = result;
    currentInput = result.toString();
    operator = '';
    firstOperand = result;
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendToDisplay(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

document.getElementById('clear').addEventListener('click', clearDisplay);

document.getElementById('equals').addEventListener('click', calculate);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.calculator').classList.toggle('dark-mode');
    document.getElementById('display').classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode'));

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
});

backspaceButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
});