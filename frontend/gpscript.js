function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var latitudeElement = document.getElementById("latitude");
    var longitudeElement = document.getElementById("longitude");
    var latitudeInput = document.getElementById("latitudeInput");
    var longitudeInput = document.getElementById("longitudeInput");

    latitudeElement.textContent = position.coords.latitude;
    longitudeElement.textContent = position.coords.longitude;

    // Set the latitude and longitude values in the hidden input fields
    latitudeInput.value = position.coords.latitude;
    longitudeInput.value = position.coords.longitude;
}

// Call getLocation() when the page loads to get the user's location
getLocation();
