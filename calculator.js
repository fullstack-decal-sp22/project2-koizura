// (total) operation (operand) = (new total) .... aka (5) * (10) = (50)
// focus = 0 -> total is selected, focus = 1 -> operation is selected, and focus = 2 -> operand is selected
let total = 0, operation = "", operand = 0, focus = 0;
// grab all the buttons and add a click function to it
document.querySelectorAll(".buttons").forEach((button) => 
  { button.addEventListener("click", () => handleClick(button.innerHTML)); });
// grab the result text label so we can change it later
const resultLabel = document.querySelector(".result-screen");

function handleClick(input) {
  if (input == "C") reset(0);
  if (input == "←") {
    if (operation == "") total = Math.floor(total / 10);
    else operand = Math.floor(operand / 10);
    if (focus == 1) focus = 0;
  }
  if ('+-x÷'.includes(input)) {
    if (focus == 2) calculate();
    operation = input;
    focus = 1;
  }
  if ('0123456789'.includes(input)) {
    input = Number(input);
    if (focus == 0) total = total * 10 + input;
    if (focus == 1 || focus == 2) focus = 2, operand = operand * 10 + input;
  } 
  if (input == "=") calculate();

  if (focus == 0 || focus == 1) resultLabel.innerHTML = total;
  if (focus == 2) resultLabel.innerHTML = operand;
}
function calculate() {
  if (operation == "") reset(total);
  if (operation == "÷" && operand == 0) reset(0);
  if (operation == "÷" && operand != 0 ) reset(total / operand);
  if (operation == "+") reset(total + operand);
  if (operation == "x") reset(total * operand);
  if (operation == "-") reset(total - operand);
}
function reset(num) { total = num, operation = "", operand = 0, focus = 0; }