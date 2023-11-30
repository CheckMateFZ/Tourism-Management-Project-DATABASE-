// script.js

// Amenities hotels
function openNewPage(pagePath) {
  window.open(pagePath, '_blank');
}

// Function to toggle user dropdown visibility
function toggleUserDropdown() {
// Retrieve data from sessionStorage
const storedData = sessionStorage.getItem("loggedInUser");

// Check if data exists in sessionStorage and isLoggedIn is true
if (storedData) {
  // Parse the JSON data
  const userData = JSON.parse(storedData);

  // Display the dropdown only if the user is logged in
  if (userData.isLoggedIn) {
    var userDropdown = document.getElementById("userDropdown");
    userDropdown.style.display = (userDropdown.style.display === "block") ? "none" : "block";
  } else {
    // If the user is not logged in, you may want to handle this case (optional)
    console.log("User is not logged in");
  }
} else {
  console.log("No data found in sessionStorage");
}
}

// Function to handle logout
function handleLogout() {
// Retrieve data from sessionStorage
const storedData = sessionStorage.getItem("loggedInUser");

// Check if data exists in sessionStorage
if (storedData) {
  // Parse the JSON data
  const userData = JSON.parse(storedData);

  // Set isLoggedIn to false
  sessionStorage.setItem("loggedInUser", JSON.stringify({
    isLoggedIn: false
  }));

  // Log the user data after setting isLoggedIn to false
  console.log("User data after logout:", userData);

  // Refresh the page
  location.reload();
} else {
  console.log("No data found in sessionStorage");
}
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.header__user-icon')) {
  var userDropdown = document.getElementById("userDropdown");

  // Retrieve data from sessionStorage
  const storedData = sessionStorage.getItem("loggedInUser");

  // Check if data exists in sessionStorage and isLoggedIn is true
  if (storedData) {
    // Parse the JSON data
    const userData = JSON.parse(storedData);

    // Hide the dropdown only if the user is logged in
    if (userData.isLoggedIn && userDropdown.style.display === "block") {
      userDropdown.style.display = "none";
    }
  } else {
    console.log("No data found in sessionStorage");
  }
}
};

document.addEventListener("DOMContentLoaded", function () {
// Event listener for the logout link
const logoutLink = document.querySelector("#userDropdown a[href='#logout']");
if (logoutLink) {
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    handleLogout();
  });
}
});
