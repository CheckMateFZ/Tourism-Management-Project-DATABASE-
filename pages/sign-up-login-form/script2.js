// frontend.js

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".signup form");
  const loginForm = document.querySelector(".login form");

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // ... (your existing signup code)
  });

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="pswd"]').value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        console.log("User logged in successfully");

        // Redirect the user to the desired page after a successful login
        console.log("Redirecting to http://127.0.0.1:8082/");
        window.location.href = "http://127.0.0.1:8082/";

        // You can also use relative paths based on your project structure
        // window.location.href = "/";
      } else if (response.status === 401) {
        console.log("Invalid credentials");
        // You can add code here to handle the case of invalid credentials
      } else {
        console.error("Failed to log in");
        // You can add code here to handle other error cases
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // ... (other existing code)
});
