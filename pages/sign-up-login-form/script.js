document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".signup form");
  const loginForm = document.querySelector(".login form");

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = signUpForm.querySelector('input[name="txt"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="pswd"]').value;

    try {
      const response = await fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("User created successfully");
        // You can add code here to handle a successful signup
      } else if (response.status === 409) {
        console.log("User already exists");
        // You can add code here to handle the case where the user already exists
      } else {
        console.error("Failed to create user");
        // You can add code here to handle other error cases
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

        // Redirect the user to the previous page
        const previousPage = sessionStorage.getItem("previousPage");
        if (previousPage) {
          window.location.href = previousPage;
        } else {
          // If there's no previous page, you can redirect to a default page
          window.location.href = "/";
        }

        // Clear the previous page from sessionStorage
        sessionStorage.removeItem("previousPage");
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

  // Store the current page in sessionStorage when navigating to the login page
  const loginLink = document.querySelector(".login label[for='chk']");
  loginLink.addEventListener("click", function () {
    sessionStorage.setItem("previousPage", window.location.href);
  });

  // ... (other existing code)
});
