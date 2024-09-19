import { backend } from 'declarations/backend';

const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

document.getElementById('equals').addEventListener('click', calculate);

function handleNumber(value) {
    currentInput += value;
    display.value = currentInput;
}

function handleOperator(value) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        calculate();
    }
    operator = value;
    currentInput = '';
}

async function calculate() {
    if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(firstOperand, secondOperand);
                break;
            case '-':
                result = await backend.subtract(firstOperand, secondOperand);
                break;
            case '*':
                result = await backend.multiply(firstOperand, secondOperand);
                break;
            case '/':
                result = await backend.divide(firstOperand, secondOperand);
                break;
        }
        display.value = result;
        firstOperand = result;
        currentInput = '';
        operator = '';
    }
}
