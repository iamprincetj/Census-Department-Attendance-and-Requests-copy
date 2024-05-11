/**import createAttendance from './services/user_attendance'

// Selecting form and input elements
const form = document.querySelector("#attendance-form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();

    // Retrieving input elements
    const fullnameInput = document.getElementById("posting");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const postingInput = document.getElementById("posting");
    const currentTime = document.getElementById('time')

    // Getting trimmed values from input fields
    const fullname = fullnameInput.options[fullnameInput.selectedIndex].text;
    //const email = emailInput.value.trim();
    //const password = passwordInput.value.trim();
    const date = dateInput.value;
    const time = currentTime.value;
    const posting = postingInput.options[postingInput.selectedIndex].text;

    console.log(fullname, date, time, posting)
    const data = {
        fullname,
        date,
        time,
        posting
    }

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }

    if (date === "") {
        showError(dateInput, "Select date");
    }
    if (posting === "") {
        showError(postingInput, "Select posting");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    // Submitting the form
}


// Handling form submission event
form.addEventListener("submit", handleFormData);**/
const form = document.querySelector('#attendance-form')


const showError = (field, errorText) => {
    field.classList.add('error')
    const errorElement = document.createElement('small')
    errorElement.classList.add('error-text')
    errorElement.innerText = errorText
    field.closest('.form-group').appendChild(errorElement)
}


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Retrieving input elements
    const fullnameInput = document.getElementById('posting')
    const dateInput = document.getElementById('date')
    const postingInput = document.getElementById('postingOffice')
    const currentTime = document.getElementById('time')
    const latitude = document.getElementById('latitude')
    const longitude = document.getElementById('longitude')

    let fullname = fullnameInput.options[fullnameInput.selectedIndex].text
    let date = dateInput.value
    let time = currentTime.value
    let posting = postingInput.options[postingInput.selectedIndex].text
    let lat = latitude.textContent
    let long = longitude.textContent

    if (fullname == 'Select Name') {
        showError(fullnameInput, 'Select your full name')
    }else {
        const data = {
            fullname,
            time,
            posting,
            date,
            lat,
            long
        }

        const request =  await axios.post('http://localhost:3002/api/users_attendance', data)
        fullnameInput.options[fullnameInput.selectedIndex].text = 'Select Name'
        window.location.href = 'thankyoupage.html'
    }
})