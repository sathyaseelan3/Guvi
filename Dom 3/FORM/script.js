document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var firstName = document.getElementById('first-name').value;
  var lastName = document.getElementById('last-name').value;
  var address = document.getElementById('address').value;
  var pincode = document.getElementById('pincode').value;
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var foodOptions = document.getElementById('food').selectedOptions;
  var foods = Array.from(foodOptions).map(function(option) {
    return option.value;
  });
  var state = document.getElementById('state').value;
  var country = document.getElementById('country').value;

  if (foods.length < 2) {
    showMessage('error', 'Please choose at least 2 food options');
    return;
  }

  var newRow = document.createElement('tr');
  newRow.innerHTML = '<td>' + firstName + '</td>' +
                     '<td>' + lastName + '</td>' +
                     '<td>' + address + '</td>' +
                     '<td>' + pincode + '</td>' +
                     '<td>' + gender + '</td>' +
                     '<td>' + foods.join(', ') + '</td>' +
                     '<td>' + state + '</td>' +
                     '<td>' + country + '</td>';

  document.querySelector('#dataTable tbody').appendChild(newRow);
  showMessage('success', 'Record added successfully');

  document.getElementById('form').reset();
});

function showMessage(className, message) {
  var messageContainer = document.createElement('div');
  messageContainer.className = className;
  messageContainer.textContent = message;

  var form = document.getElementById('form');
  form.appendChild(messageContainer);

  setTimeout(function() {
    form.removeChild(messageContainer);
  }, 3000);
}
