
function startCountdown(count, callback) {
    if (count > 0) {
        document.getElementById("countdown").innerHTML = count;
        setTimeout(function() {
            startCountdown(count - 1, callback);
        }, 1000);
    } else {
        callback();
    }
}

function displayMessage(message) {
    document.getElementById("countdown").innerHTML = message;
}
