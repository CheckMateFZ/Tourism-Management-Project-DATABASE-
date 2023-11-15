// frontend.js

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".signup form");
  const loginForm = document.querySelector(".login form");

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = signUpForm.querySelector('input[name="username"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;

    try {
      const response = await fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (response.status === 201) {
        console.log("User created successfully");
        // You can add code here to handle the case of successful user creation, like showing a success message or redirecting the user to the login page.
      } else if (response.status === 409) {
        console.log("User already exists");
        // You can add code here to handle the case of a user already existing with the provided username.
      } else {
        console.error("Failed to create user");
        // You can add code here to handle other error cases.
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // ... (other existing code)
});
