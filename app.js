document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.calc-button');
    const resultElement = document.getElementById('result');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleInput(value);
        });
    });

    function handleInput(value) {
        if (isNumber(value) || value === '.') {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === 'AC') {
            handleClear();
        } else if (value === '±') {
            handlePlusMinus();
        } else if (value === '%') {
            handlePercentage();
        } else if (value === '=') {
            handleEquals();
        }
        updateDisplay();
    }

    function handleNumber(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(value) {
        if (operator && previousInput !== null) {
            handleEquals();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '0';
    }

    function handleClear() {
        currentInput = '0';
        operator = null;
        previousInput = null;
    }

    function handlePlusMinus() {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
    }

    function handlePercentage() {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }

    function handleEquals() {
        if (operator && previousInput !== null) {
            currentInput = evaluate(previousInput, currentInput, operator).toString();
            operator = null;
            previousInput = null;
        }
    }

    function evaluate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 0;
        }
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function updateDisplay() {
        resultElement.textContent = currentInput;
    }
});
