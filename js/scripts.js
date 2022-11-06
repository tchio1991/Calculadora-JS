const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // adicionar dígito à tela da calculadora
  addDigit(digit) {
    console.log(digit);
    // Verifique se o número já tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processar todas as operações da calculadora
  processOperation(operation) {
    // Verifique se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Alterar operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Obter valores atuais e anteriores
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    if(operation == "+") {
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
    } else if (operation == "-") {
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
    } else if (operation == "*") {
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
    } else if (operation == "/") {
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
    } else if (operation == "DEL") {
        this.processDelOperator();
    } else if (operation == "CE") {
        this.processClearCurrentOperator();
    } else if (operation == "C") {
        this.processClearOperator();
    } else if (operation == "=") {
        this.processEqualOperator();
    } else {
        return;
    }
}

  // Alterar valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Anexar número ao valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Verifique se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      // Adicionar valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Alterar operação matemática
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Excluir um dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpar operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpar todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processar uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

// Ação do botão igual
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});