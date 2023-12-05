document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const hotelInfoSection = document.getElementById('hotelFormSection');
    const hotelInfoForm = document.getElementById('hotelForm');

    let bookingId; // Store the booking ID

    // Check if user is logged in and retrieve user information from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.isLoggedIn) {
        // Autofill the name and email in the basic information form
        const nameInput = basicInfoForm.querySelector('input[name="name"]');
        const emailInput = basicInfoForm.querySelector('input[name="email"]');

        if (nameInput && emailInput) {
            // Set readOnly attribute to make email and username unchangeable
            nameInput.value = loggedInUser.username;
            emailInput.value = loggedInUser.email;
            nameInput.readOnly = true;
            emailInput.readOnly = true;
        }
    }

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

                    // Show the hotel-related information form
                    hotelInfoSection.style.display = "block";
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

    hotelInfoForm.addEventListener("submit", async function (event) {
        console.log("submitHotelInfo function called");
        event.preventDefault();

        // Retrieve hotel-related information from the hotel form
        const hotelNameInput = hotelInfoForm.querySelector('input[name="hotelName"]');
        const countryInput = hotelInfoForm.querySelector('input[name="country"]');
        const cityInput = hotelInfoForm.querySelector('input[name="city"]');
        const costInput = hotelInfoForm.querySelector('input[name="cost"]');
        const numOfPeopleInput = hotelInfoForm.querySelector('select[name="numOfPeople"]');

        if (hotelNameInput && countryInput && cityInput && costInput && numOfPeopleInput) {
            const hotelName = hotelNameInput.value;
            const country = countryInput.value;
            const city = cityInput.value;

            // Retrieve the selected number of people
            const numOfPeople = parseInt(numOfPeopleInput.value);

            try {
                // Call the /get-cost route to retrieve the cost for the 'Hotel' category
                const costResponse = await fetch("http://localhost:3000/get-cost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: 'Hotel',
                    }),
                });

                if (costResponse.status === 200) {
                    const costData = await costResponse.json();

                    // Calculate the total cost by multiplying the cost with the number of people
                    const totalCost = costData.cost * numOfPeople;

                    // Set the calculated cost in the input field
                    costInput.value = totalCost;

                    // Continue with submitting hotel information
                    const cost = costInput.value;

                    const response = await fetch("http://localhost:3000/createHotelBooking", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            hotelName: hotelName,
                            country: country,
                            city: city,
                            cost: cost,
                            bookingID: bookingId, // Pass the booking ID
                        }),
                    });

                    if (response.status === 201) {
                        console.log("Hotel information submitted successfully");
                        window.location.href = "../../../bill/bill.html";
                        // You can add further actions after successfully submitting hotel information
                    } else {
                        console.error("Failed to submit hotel information");
                        // Handle other status codes or errors
                    }
                } else {
                    console.error("Failed to retrieve cost information");
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

    // Add an event listener for the 'numOfPeople' dropdown
    const numOfPeopleInput = hotelInfoForm.querySelector('select[name="numOfPeople"]');
    const costInput = hotelInfoForm.querySelector('input[name="cost"]');

    if (numOfPeopleInput && costInput) {
        numOfPeopleInput.addEventListener("change", async function () {
            // Retrieve the selected number of people
            const numOfPeople = parseInt(numOfPeopleInput.value);

            try {
                // Call the /get-cost route to retrieve the cost for the 'Hotel' category
                const costResponse = await fetch("http://localhost:3000/get-cost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: 'Hotel',
                    }),
                });

                if (costResponse.status === 200) {
                    const costData = await costResponse.json();

                    // Calculate the total cost by multiplying the cost with the number of people
                    const totalCost = costData.cost * numOfPeople;

                    // Set the calculated cost in the input field
                    costInput.value = totalCost;
                } else {
                    console.error("Failed to retrieve cost information");
                    // Handle other status codes or errors
                }
            } catch (error) {
                console.error("Error:", error);
                // Handle fetch errors
            }
        });
    }
});
