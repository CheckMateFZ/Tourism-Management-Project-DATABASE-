document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const attractionsInfoSection = document.getElementById('attractionsInfoFormSection'); // Corrected variable name
    const attractionsInfoForm = document.getElementById('attractionsInfoForm'); // Corrected variable name

    let bookingId; // Store the booking ID

    // Define the submitBasicInfo function
    window.submitBasicInfo = async function (event) {
        event.preventDefault();

        const nameInput = basicInfoForm.querySelector('input[name="name"]');
        const emailInput = basicInfoForm.querySelector('input[name="email"]');
        const contactInput = basicInfoForm.querySelector('input[name="Number"]');
        if (nameInput && emailInput && contactInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const contact = contactInput.value;
            const UserId = loggedInUser.userId;
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
                        UserId: UserId,
                    }),
                });

                if (response.status === 201) {
                    console.log("Basic information submitted successfully");

                    // Extract booking ID from the response
                    const responseData = await response.json();
                    bookingId = responseData.bookingId;

                    // Hide the basic information form
                    basicInfoForm.style.display = "none";

                    // Show the cab-related information form
                    attractionsInfoSection.style.display = "block";
                } else {
                    console.error("Failed to submit basic information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more basic information form inputs are null");
        }
    };

    // Assuming that `attractionsInfoForm` is the variable representing the attractionsinfoform section

    attractionsInfoForm.addEventListener("submit", async function (event) {
        console.log("submitAttractionsInfo function called");
        event.preventDefault();

        // Retrieve attractions-related information from the attractions form
        const countryInput = attractionsInfoForm.querySelector('input[name="country"]');
        const cityInput = attractionsInfoForm.querySelector('input[name="city"]');
        const attractionNameInput = attractionsInfoForm.querySelector('input[name="attractionName"]');

        if (countryInput && cityInput && attractionNameInput) {
            const country = countryInput.value;
            const city = cityInput.value;
            const attractionName = attractionNameInput.value;

            try {
                const response = await fetch("http://localhost:3000/createAttractionBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        country: country,
                        city: city,
                        attractionName: attractionName,
                        bookingID: bookingId, // Pass the booking ID
                    }),
                });

                if (response.status === 201) {
                    console.log("Attractions information submitted successfully");
                    console.log("BOOKING ID SENT : ", bookingId);
                    // You can add further actions after successfully submitting attractions information
                } else {
                    console.error("Failed to submit attractions information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more attractions information form inputs are null");
        }
    });
});
