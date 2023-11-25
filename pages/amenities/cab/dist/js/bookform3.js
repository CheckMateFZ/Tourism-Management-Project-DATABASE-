document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const cabInfoSection = document.getElementById('carRentalFormSection'); // Updated to match your HTML
    const cabInfoForm = document.getElementById('carRentalForm'); // Updated to match your HTML

    let bookingId; // Store the booking ID

    // Define the submitBasicInfo function
    window.submitBasicInfo = async function (event) {
        console.log("submitBasicInfo function called");
        event.preventDefault();

        const nameInput = basicInfoForm.querySelector('input[name="name"]');
        const emailInput = basicInfoForm.querySelector('input[name="email"]');
        const contactInput = basicInfoForm.querySelector('input[name="Number"]');

        if (nameInput && emailInput && contactInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const contact = contactInput.value;

            try {
                const response = await fetch("http://localhost:3002/createBooking", {
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
                    console.log("Basic information submitted successfully");

                    // Extract booking ID from the response
                    const responseData = await response.json();
                    bookingId = responseData.bookingId;

                    // Hide the basic information form
                    basicInfoForm.style.display = "none";

                    // Show the cab-related information form
                    cabInfoSection.style.display = "block";
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

    cabInfoForm.addEventListener("submit", async function (event) {
        console.log("submitCabInfo function called");
        event.preventDefault();

        // Retrieve cab-related information from the cab form
        const pickupLocationInput = cabInfoForm.querySelector('input[name="pickupLocation"]');
        const dropOffLocationInput = cabInfoForm.querySelector('input[name="dropOffLocation"]');
        const dateInput = cabInfoForm.querySelector('input[name="date"]');
        const timeInput = cabInfoForm.querySelector('input[name="time"]');
        const numberOfPassengersInput = cabInfoForm.querySelector('input[name="passengers"]'); // Updated to match your HTML
        const typeInput = cabInfoForm.querySelector('select[name="type"]');

        if (pickupLocationInput && dropOffLocationInput && dateInput && timeInput && numberOfPassengersInput && typeInput) {
            const pickupLocation = pickupLocationInput.value;
            const dropOffLocation = dropOffLocationInput.value;
            const date = dateInput.value;
            const time = timeInput.value;
            const numberOfPassengers = numberOfPassengersInput.value;
            const type = typeInput.value;

            try {
                const response = await fetch("http://localhost:3007/createCabBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pickupLocation: pickupLocation,
                        dropOffLocation: dropOffLocation,
                        date: date,
                        time: time,
                        numberOfPassengers: numberOfPassengers,
                        type: type,
                        bookingID: bookingId, // Pass the booking ID
                    }),
                });

                if (response.status === 201) {
                    console.log("Cab information submitted successfully");
                    console.log("BOOKING ID SENT : ",bookingId)
                    // You can add further actions after successfully submitting cab information
                } else {
                    console.error("Failed to submit cab information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more cab information form inputs are null");
        }
    });
});
