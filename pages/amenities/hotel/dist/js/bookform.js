document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.getElementById('bookingForm');
  
    signUpForm.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const nameInput = signUpForm.querySelector('input[name="name"]');
        console.log(nameInput); // Add this line
        const emailInput = signUpForm.querySelector('input[name="email"]');
        console.log(emailInput); // Add this line
        const contactInput = signUpForm.querySelector('input[name="Number"]');
        console.log(contactInput); // Add this line
  
        if (nameInput && emailInput && contactInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const contact = contactInput.value;
  
            try {
                const response = await fetch("http://localhost:3000/createBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookerName: name,
                        bookerEmail: email,
                        bookerContact: contact,
                    }),
                });
  
                if (response.status === 201) {
                    console.log("Booking created successfully");
                    // Handle success, e.g., show a success message
                } else {
                    console.error("Failed to create booking");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more form inputs are null");
        }
    });
});
