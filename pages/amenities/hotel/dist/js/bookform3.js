// bookform3.js

document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const hotelInfoSection = document.getElementById('hotelFormSection');
    const hotelInfoForm = document.getElementById('hotelForm');

    basicInfoForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nameInput = basicInfoForm.querySelector('input[name="name"]');
        const emailInput = basicInfoForm.querySelector('input[name="email"]');
        const contactInput = basicInfoForm.querySelector('input[name="Number"]');

        if (nameInput && emailInput && contactInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const contact = contactInput.value;

            try {
                const response = await fetch("http://localhost:3001/createBooking", {
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
                    const { bookingId } = await response.json();

                    console.log("Basic information submitted successfully");

                    // Hide the basic information form
                    basicInfoForm.style.display = "none";

                    // Show the hotel-related information form
                    hotelInfoSection.style.display = "block";

                    // Store the booking ID for later use
                    basicInfoForm.dataset.bookingId = bookingId;
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
    });

    hotelInfoForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const bookingId = basicInfoForm.dataset.bookingId;

        const hotelNameInput = hotelInfoForm.querySelector('input[name="hotelName"]');
        const countryInput = hotelInfoForm.querySelector('input[name="country"]');
        const cityInput = hotelInfoForm.querySelector('input[name="city"]');
        const costInput = hotelInfoForm.querySelector('input[name="cost"]');

        if (hotelNameInput && countryInput && cityInput && costInput) {
            const hotelName = hotelNameInput.value;
            const country = countryInput.value;
            const city = cityInput.value;
            const cost = costInput.value;

            try {
                const response = await fetch("http://localhost:3000/createHotelBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookingId: bookingId,
                        hotelName: hotelName,
                        country: country,
                        city: city,
                        cost: cost,
                    }),
                });

                if (response.status === 201) {
                    console.log("Hotel information submitted successfully");
                    // You can add further actions after successfully submitting hotel information
                } else {
                    console.error("Failed to submit hotel information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more hotel information form inputs are null");
        }
    });
});

// Define the submitBasicInfo function
window.submitBasicInfo = async function (event) {
    document.getElementById('bookingForm').dispatchEvent(new Event("submit"));
};

// Define the submitHotelInfo function
window.submitHotelInfo = async function (event) {
    document.getElementById('hotelForm').dispatchEvent(new Event("submit"));
};
