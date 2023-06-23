function PRESS(value) {
  var display = document.getElementById("display");
  display.value += value;
}

function performCalculation() {
  var display = document.getElementById("display");
  var expression = display.value;

  var regex = /^[\d+\-*/().]+$/;
  if (!regex.test(expression)) {
    alert("Only numbers and operators are allowed!");
    return;
  }

  
  try {
    var result = eval(expression);
    var truncatedResult = result.toFixed(4); 
    display.value = truncatedResult;
  } catch (error) {
    alert("Invalid expression!");
  }
}


function clearDisplay() {
  var display = document.getElementById("display");
  display.value = "";
}
