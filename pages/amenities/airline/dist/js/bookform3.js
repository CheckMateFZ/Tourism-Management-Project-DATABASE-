document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const airlineInfoSection = document.getElementById('airlineFormSection');
    const airlineInfoForm = document.getElementById('airlineForm');
    const flightInfoSection = document.getElementById('flightInfoFormSection');
    const flightInfoForm = document.getElementById('flightInfoForm');

    let bookingId; // Store the booking ID

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

                    // Show the airline information form
                    airlineInfoSection.style.display = "block";
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

    window.submitAirlineInfo = async function (event) {
        console.log("submitAirlineInfo function called");
        event.preventDefault();
    
        // Retrieve airline-related information from the airline form
        const airlineClassInput = airlineInfoForm.querySelector('select[name="airlineClass"]');
        const airlineCompanyInput = airlineInfoForm.querySelector('input[name="airlineCompany"]');
    
        if (airlineClassInput && airlineCompanyInput) {
            const airlineClass = airlineClassInput.value;
            const airlineCompany = airlineCompanyInput.value;
    
            try {
                const response = await fetch("http://localhost:3005/createAirlineBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        airlineClass: airlineClass,
                        airlineCompany: airlineCompany,
                    }),
                });
    
                if (response.status === 201) {
                    console.log("Airline information submitted successfully");
    
                    // Extract AirlineID from the response
                    const responseData = await response.json();
                    const airlineID = responseData.airlineID;
    
                    // Store AirlineID for later use
                    window.airlineID = airlineID;
    
                    // Hide the airline information form
                    airlineInfoSection.style.display = "none";
    
                    // Show the flight information form
                    flightInfoSection.style.display = "block";
                } else {
                    console.error("Failed to submit airline information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more airline information form inputs are null");
        }
    };
    
    window.submitFlightInfo = async function (event) {
        console.log("submitFlightInfo function called");
        event.preventDefault();
    
        // Retrieve flight-related information from the flight form
        const flightTimeInput = flightInfoForm.querySelector('input[name="flightTime"]');
        const flightDateInput = flightInfoForm.querySelector('input[name="flightDate"]');
        const flightSourceInput = flightInfoForm.querySelector('input[name="flightSource"]');
        const flightDestinationInput = flightInfoForm.querySelector('input[name="flightDestination"]');
    
        if (flightTimeInput && flightDateInput && flightSourceInput && flightDestinationInput) {
            const flightTime = flightTimeInput.value;
            const flightDate = flightDateInput.value;
            const flightSource = flightSourceInput.value;
            const flightDestination = flightDestinationInput.value;
    
            try {
                const response = await fetch("http://localhost:3006/createFlightBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        flightTime: flightTime,
                        flightDate: flightDate,
                        flightSource: flightSource,
                        flightDestination: flightDestination,
                        bookingID: bookingId,
                        airlineID: window.airlineID, // Pass the AirlineID
                    }),
                });
    
                if (response.status === 201) {
                    console.log("Flight information submitted successfully");
    
                    // You can add further actions after successfully submitting flight information
                } else {
                    console.error("Failed to submit flight information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        } else {
            console.error("One or more flight information form inputs are null");
        }
    };
});
