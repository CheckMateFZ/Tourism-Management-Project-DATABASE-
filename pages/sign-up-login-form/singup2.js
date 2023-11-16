document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector(".signup form");
  
    signUpForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const usernameInput = signUpForm.querySelector('input[name="username"]');
      const passwordInput = signUpForm.querySelector('input[name="password"]');
      const emailInput = signUpForm.querySelector('input[name="email"]');
  
      // Check if the inputs are not null before accessing their values
      if (usernameInput && passwordInput && emailInput) {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const email = emailInput.value;
  
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
            console.log("User created successfully(signup2)");
            // You can add code here to handle the case of successful user creation, like showing a success message or redirecting the user to the login page.

            // Redirect to the main HTML page after successful signup
            window.location.href = "../../index.html";
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
      } else {
        console.error("One or more form inputs are null");
      }
    });
  
    // ... (other existing code)
});
