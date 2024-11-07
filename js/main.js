// Calculator class definition
class Calculator {
  // Constructor to initialize the calculator state
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement // element to display previous operand
    this.currentOperandTextElement = currentOperandTextElement // element to display current operand
    this.clear() // Initialize the calculator to an empty state
  }

  // Method to reset the calculator to its initial state
  clear() {
    this.currentOperand = '' // Current operand is empty
    this.previousOperand = '' // Previous operand is empty
    this.operation = undefined // No operation selected yet
  }

  // Method to delete the last digit of the current operand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1) // Remove last character from current operand
  }

  // Method to append a number to the current operand
  appendNumber(number) {
    // Prevent adding a second decimal point
    if (number === '.' && this.currentOperand.includes('.')) return
    // Add the number to the current operand
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // Method to set the operation (e.g., +, -, *, ÷)
  chooseOperation(operation) {
    // If there's no current operand, do nothing
    if (this.currentOperand === '') return
    // If there's a previous operand, perform the calculation before setting the new operation
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation // Set the selected operation
    this.previousOperand = this.currentOperand // Move current operand to previous operand
    this.currentOperand = '' // Reset current operand for the next input
  }

  // Method to perform the calculation based on the selected operation
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand) // Convert previous operand to a number
    const current = parseFloat(this.currentOperand) // Convert current operand to a number
    // If either operand is not a valid number, return without computation
    if (isNaN(prev) || isNaN(current)) return
    // Perform the selected operation
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    // Set the current operand to the result of the computation
    this.currentOperand = computation
    this.operation = undefined // Clear the operation
    this.previousOperand = '' // Clear the previous operand
  }

  // Method to format the number for display
  getDisplayNumber(number) {
    const stringNumber = number.toString() // Convert the number to a string
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // Get the integer part of the number
    const decimalDigits = stringNumber.split('.')[1] // Get the decimal part of the number
    let integerDisplay
    // Format the integer part with comma as thousand separator
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    // Return the formatted number (integer part and decimal part if present)
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // Method to update the displayed numbers on the screen
  updateDisplay() {
    // Update the current operand display
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    // If there is an operation, show it along with the previous operand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '' // Clear previous operand if no operation
    }
  }
}

// Select the calculator buttons and display elements
const numberButtons = document.querySelectorAll('[data-number]') // All number buttons
const operationButtons = document.querySelectorAll('[data-operation]') // All operation buttons
const equalsButton = document.querySelector('[data-equals]') // Equals button
const deleteButton = document.querySelector('[data-delete]') // Delete button
const allClearButton = document.querySelector('[data-all-clear]') // All-clear button
const previousOperandTextElement = document.querySelector('[data-previous-operand]') // Element for previous operand display
const currentOperandTextElement = document.querySelector('[data-current-operand]') // Element for current operand display

// Create a new instance of the Calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText) // Append the clicked number
    calculator.updateDisplay() // Update the display
  })
})

// Add event listeners to operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText) // Set the selected operation
    calculator.updateDisplay() // Update the display
  })
})

// Add event listener to equals button to compute the result
equalsButton.addEventListener('click', button => {
  calculator.compute() // Perform the calculation
  calculator.updateDisplay() // Update the display with the result
})

// Add event listener to all-clear button to reset the calculator
allClearButton.addEventListener('click', button => {
  calculator.clear() // Clear the calculator
  calculator.updateDisplay() // Update the display
})

// Add event listener to delete button to remove the last digit
deleteButton.addEventListener('click', button => {
  calculator.delete() // Delete the last digit
  calculator.updateDisplay() // Update the display
})
