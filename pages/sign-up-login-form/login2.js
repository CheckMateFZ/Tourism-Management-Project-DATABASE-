document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const emailInput = loginForm.querySelector('input[name="lemail"]');
            const passwordInput = loginForm.querySelector('input[name="lpass"]');

            // Check if the inputs are not null before accessing their values
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

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

                        // Extract user information from the response
                        const userData = await response.json();

                        // Store user information and login status in localStorage
                        localStorage.setItem("loggedInUser", JSON.stringify({
                            email: userData.email,
                            userId: userData.userId,
                            username: userData.username,
                            isLoggedIn: true
                        }));

                        // Redirect to the main HTML page
                        window.location.href = "../../index.html";
                    } else if (response.status === 401) {
                        console.log("Invalid credentials");
                        // You can add code here to handle the case of invalid credentials, like showing an error message.
                    } else {
                        console.error("Failed to log in");
                        // You can add code here to handle other error cases.
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            } else {
                console.error("One or more form inputs are null");
            }
        });
    } else {
        console.error("Login form not found");
    }

    // ... (other existing code)
});
