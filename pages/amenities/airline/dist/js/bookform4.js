document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const airlineInfoSection = document.getElementById('airlineFormSection');
    const airlineInfoForm = document.getElementById('airlineForm');
    const flightInfoSection = document.getElementById('flightInfoFormSection');
    const flightInfoForm = document.getElementById('flightInfoForm');
    let bookingId; // Store the booking ID

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.isLoggedIn) {
        const nameInput = basicInfoForm.querySelector('input[name="name"]');
        const emailInput = basicInfoForm.querySelector('input[name="email"]');

        if (nameInput && emailInput) {
            nameInput.value = loggedInUser.username;
            emailInput.value = loggedInUser.email;
            nameInput.readOnly = true;
            emailInput.readOnly = true;
        }
    }

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
                    const responseData = await response.json();
                    bookingId = responseData.bookingId;

                    basicInfoForm.style.display = "none";
                    airlineInfoSection.style.display = "block";
                } else {
                    console.error("Failed to submit basic information");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("One or more basic information form inputs are null");
        }
    };

    window.submitAirlineInfo = async function (event) {
        console.log("submitAirlineInfo function called");
        event.preventDefault();

        const airlineClassInput = airlineInfoForm.querySelector('select[name="airlineClass"]');
        const airlineCompanyInput = airlineInfoForm.querySelector('input[name="airlineCompany"]');

        if (airlineClassInput && airlineCompanyInput) {
            const airlineClass = airlineClassInput.value;
            const airlineCompany = airlineCompanyInput.value;

            try {
                const response = await fetch("http://localhost:3000/createAirlineBooking", {
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

                    // Include this part to get the cost based on the airlineClass
                    const costResponse = await fetch("http://localhost:3000/get-cost", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            category: getCategoryFromAirlineClass(airlineClass),
                        }),
                    });

                    if (costResponse.status === 200) {
                        const costData = await costResponse.json();
                        const flightCost = costData.cost;
                        window.flightCost = flightCost;

                        // Hide the airline information form
                        airlineInfoSection.style.display = "none";

                        // Show the flight information form
                        flightInfoSection.style.display = "block";
                    } else {
                        console.error("Failed to retrieve cost");
                        // Handle other status codes or errors
                    }
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

    // Add an event listener for the change event on the numberOfPeople dropdown
    const numberOfPeopleInput = flightInfoForm.querySelector('select[name="numberOfPeople"]');
    const flightCostInput = flightInfoForm.querySelector('input[name="flightCost"]');

    if (numberOfPeopleInput && flightCostInput) {
        numberOfPeopleInput.addEventListener('change', function () {
            const baseCost = window.flightCost;
            const numberOfPeople = numberOfPeopleInput.value;
            const totalFlightCost = calculateTotalCost(baseCost, numberOfPeople);
            flightCostInput.value = totalFlightCost;
        });
    }

    window.submitFlightInfo = async function (event) {
        event.preventDefault();

        const flightTimeInput = flightInfoForm.querySelector('input[name="flightTime"]');
        const flightDateInput = flightInfoForm.querySelector('input[name="flightDate"]');
        const flightSourceInput = flightInfoForm.querySelector('input[name="flightSource"]');
        const flightDestinationInput = flightInfoForm.querySelector('input[name="flightDestination"]');
        const numberOfPeopleInput = flightInfoForm.querySelector('select[name="numberOfPeople"]');
        const flightCostInput = flightInfoForm.querySelector('input[name="flightCost"]');

        if (flightTimeInput && flightDateInput && flightSourceInput && flightDestinationInput && numberOfPeopleInput && flightCostInput) {
            const flightTime = flightTimeInput.value;
            const flightDate = flightDateInput.value;
            const flightSource = flightSourceInput.value;
            const flightDestination = flightDestinationInput.value;
            const numberOfPeople = numberOfPeopleInput.value;

            const baseCost = window.flightCost;
            const totalFlightCost = calculateTotalCost(baseCost, numberOfPeople);

            try {
                const response = await fetch("http://localhost:3000/createFlightBooking", {
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
                        airlineID: window.airlineID,
                        numberOfPeople: numberOfPeople,
                        flightCost: totalFlightCost,
                    }),
                });

                if (response.status === 201) {
                    console.log("Flight information submitted successfully");
                } else {
                    console.error("Failed to submit flight information");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("One or more flight information form inputs are null");
        }
    };

    function calculateTotalCost(baseCost, numberOfPeople) {
        const totalCost = baseCost * numberOfPeople;
        return totalCost;
    }

    function getCategoryFromAirlineClass(airlineClass) {
        switch (airlineClass) {
            case 'economy':
                return 'Airline_eco';
            case 'premium':
                return 'Airline_prem';
            case 'business':
                return 'Airline_bus';
            case 'first-class':
                return 'Airline_first_class';
            default:
                return '';
        }
    }
});
