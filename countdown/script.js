// Countdown function using callback
function startCountdown(count, callback) {
    if (count > 0) {
        // Display the countdown
        document.getElementById("countdown").innerHTML = count;
        // Wait for 1 second before decreasing the count
        setTimeout(function() {
            startCountdown(count - 1, callback);
        }, 1000);
    } else {
        // Countdown finished, call the callback function
        callback();
    }
}

// Display message function
function displayMessage(message) {
    // Display the message
    document.getElementById("countdown").innerHTML = message;
}
