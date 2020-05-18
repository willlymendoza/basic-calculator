const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const result = document.querySelector("#result");
const clear = document.querySelector(".clear");
const dot = document.querySelector(".dot");

var actualVal = "";
var arrayResults = [];
var dotPressed = false;

/* INPUT FROM USER */
numbers.forEach(item => {
  item.addEventListener(
    "click",
    function(e) {
      let value = item.innerHTML;
      actualVal += value;
      result.innerHTML = actualVal.toString();
      if (arrayResults.length === 4) {
        arrayResults = [];
      }
    },
    false
  );
});

/* ACTIONS FOR NUMBERS */
operators.forEach(item => {
  item.addEventListener(
    "click",
    function(e) {
      if (item.innerHTML === "=") {
        if (arrayResults.length === 2 && actualVal !== "") {
          arrayResults.push(actualVal);
          let resultOp = calculate(arrayResults);
          arrayResults.push(resultOp.toString());
          result.innerHTML = resultOp.toString();
          actualVal = "";
          dotPressed = false;
        }
      } else {
        if (actualVal !== "" && arrayResults.length === 0) {
          arrayResults.push(actualVal, item.innerHTML);
          actualVal = "";
          dotPressed = false;
        }
        if (arrayResults.length === 4) {
          arrayResults.splice(0, 3);
          arrayResults.push(item.innerHTML);
          actualVal = "";
          dotPressed = false;
        }
      }
    },
    false
  );
});

/* RESET OR CLEAR VALUES */
clear.addEventListener("click", function(e) {
  init();
});

/* ACTION FOR DOT SIMBOL */
dot.addEventListener("click", function(e) {
  if (dotPressed === false) {
    actualVal += ".";
    dotPressed = true;
  }
});

/* CALCULATE OPERATIONS */
function calculate(array) {
  let num1 = array[0];
  let num2 = array[2];
  let op = array[1];
  switch (op) {
    case "-":
      return parseFloat(num1) - parseFloat(num2);
    case "+":
      return parseFloat(num1) + parseFloat(num2);
    case "*":
      return parseFloat(num1) * parseFloat(num2);
    case "/":
      return parseFloat(num1) / parseFloat(num2);
    default:
  }
}

/* INIT FUNCTION */
function init() {
  result.innerHTML = "0";
  actualVal = "";
  arrayResults = [];
  dotPressed = false;
}
