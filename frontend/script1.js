 // JavaScript to populate the list of names
 document.addEventListener("DOMContentLoaded", function() {
    // Array of example names
    var names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

    var selectElement = document.getElementById("nameList");

    // Add each name to the select element as options
    names.forEach(function(name) {
      var option = document.createElement("option");
      option.text = name;
      selectElement.add(option);
    });
  });