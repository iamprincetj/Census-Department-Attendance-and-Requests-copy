// Selecting form and input elements
/**const form = document.querySelector("#requestForm");
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
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const genderInput = document.getElementById("gender");

    // Getting trimmed values from input fields
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const date = dateInput.value;
    const gender = genderInput.value;

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }
    if (date === "") {
        showError(dateInput, "Select your date of birth");
    }
    if (gender === "") {
        showError(genderInput, "Select your gender");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

}

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
**/

const form = document.querySelector('#requestForm')



const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}


const fullnameInput = document.getElementById("fullname")
const emailInput = document.getElementById("email")
const dateInput = document.getElementById("date")
const genderInput = document.getElementById("gender")
const phoneNumberInput = document.getElementById('phoneNumber')
const addressInput = document.getElementById('address')
const stateInput = document.getElementById('posting')
const LGAInput = document.getElementById('LGA')
const timeInput = document.getElementById('time')
const timelineInput = document.querySelector('.postingTimeline')
const textArea = document.getElementById('user_request')


// Handling form submission event
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const fullname = fullnameInput.value
    const email = emailInput.value
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    const date = dateInput.value
    const phoneNumber = phoneNumberInput.value
    const address = addressInput.value
    const LGA = LGAInput.value
    const time = timeInput.value
    const timeline = timelineInput.options[timelineInput.selectedIndex].text
    const gender = genderInput.options[genderInput.selectedIndex].text
    const state = stateInput.options[stateInput.selectedIndex].text
    const user_request = textArea.value

    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (gender === "") {
        showError(genderInput, "Select your gender");
    }
    if (phoneNumber === "") {
        showError(phoneNumberInput, "Enter your phone number")
    }
    if (address === "") {
        showError(addressInput, "Enter your address")
    }
    if (LGA === "") {
        showError(LGAInput, "Enter your LGA")
    }
    if (state === "Select State") {
        showError(stateInput, "Select a state")
    }
    if (timeline === "Select Timeline") {
        showError(timelineInput, "Select a timeline")
    }
    if (gender === "Select your gender") {
        showError(genderInput, "Select a gender")
    }
    if (user_request === '') {
        showError(textArea, 'Enter your request')
    }
    else {
        const data = {fullname, phoneNumber, address, email, state, LGA, date, timeline, gender, time, user_request}
        const request = await axios.post('http://localhost:3002/api/request', data)

        window.location.href = "thankyoupage.html"

    }
});