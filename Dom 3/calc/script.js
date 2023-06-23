function PRESS(value) {
  var result = document.getElementById("result");
  result.value += value;
}

function performCalculation() {
  var result = document.getElementById("result");
  var expression = result.value;

  var regex = /^[\d+\-*/().]+$/;
  if (!regex.test(expression)) {
    alert("Only numbers and operators are allowed!");
    return;
  }

  
  try {
    var resultInput = eval(expression);
    var truncatedResult = resultInput.toFixed(0); 
    result.value = truncatedResult;
  } catch (error) {
    alert("Invalid expression!");
  }
}


function clearresult() {
  var result = document.getElementById("result");
  result.value = "";
}
