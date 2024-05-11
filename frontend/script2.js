// Get the current date
var currentDate = new Date();

// Format the date to YYYY-MM-DD (required by input type=date)
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
var day = currentDate.getDate().toString().padStart(2, '0');
var formattedDate = year + '-' + month + '-' + day;

// Set the value of the input field to the current date
document.getElementById("date").value = formattedDate;