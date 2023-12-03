document.addEventListener("DOMContentLoaded", function () {
    const basicInfoForm = document.getElementById('bookingForm');
    const cabInfoSection = document.getElementById('carRentalFormSection');
    const cabInfoForm = document.getElementById('carRentalForm');

    let bookingId;
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

    const typeSelect = cabInfoForm.querySelector('select[name="type"]');
    const costInput = cabInfoForm.querySelector('input[name="cost"]');

    typeSelect.addEventListener("change", async function () {
        const selectedType = typeSelect.value;

        try {
            const response = await fetch("http://localhost:3000/get-cost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: getCategoryFromType(selectedType),
                }),
            });

            if (response.status === 200) {
                const responseData = await response.json();
                const categoryCost = responseData.cost;

                costInput.value = categoryCost;
            } else {
                console.error("Failed to fetch cost");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

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

                    const responseData = await response.json();
                    bookingId = responseData.bookingId;

                    basicInfoForm.style.display = "none";
                    cabInfoSection.style.display = "block";
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

    cabInfoForm.addEventListener("submit", async function (event) {
        console.log("submitCabInfo function called");
        event.preventDefault();

        const pickupLocationInput = cabInfoForm.querySelector('input[name="pickupLocation"]');
        const dropOffLocationInput = cabInfoForm.querySelector('input[name="dropOffLocation"]');
        const dateInput = cabInfoForm.querySelector('input[name="date"]');
        const timeInput = cabInfoForm.querySelector('input[name="time"]');
        const costInput = cabInfoForm.querySelector('input[name="cost"]');

        if (pickupLocationInput && dropOffLocationInput && dateInput && timeInput && typeSelect) {
            const pickupLocation = pickupLocationInput.value;
            const dropOffLocation = dropOffLocationInput.value;
            const date = dateInput.value;
            const time = timeInput.value;
            const selectedType = typeSelect.value;
            const cost = costInput.value;

            try {
                const response = await fetch("http://localhost:3000/createCabBooking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pickupLocation: pickupLocation,
                        dropOffLocation: dropOffLocation,
                        date: date,
                        time: time,
                        type: selectedType,
                        cost: cost,
                        bookingID: bookingId,
                    }),
                });

                if (response.status === 201) {
                    console.log("Cab information submitted successfully");
                    console.log("BOOKING ID SENT : ", bookingId);
                } else {
                    console.error("Failed to submit cab information");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("One or more cab information form inputs are null");
        }
    });

    function getCategoryFromType(selectedType) {
        switch (selectedType) {
            case "regular":
                return "cab_reg";
            case "extended":
                return "cab_ext";
            case "crew":
                return "cab_crew";
            default:
                return null;
        }
    }
});
