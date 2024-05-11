// Function to update the time input field with the current time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').value = currentTime;
}

// Update the time initially and set interval to update it every second
updateTime();
setInterval(updateTime, 1000);
