document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the logged-in user data from session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  
    // Autofill the username and email in the form
    const usernameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
  
    if (loggedInUser) {
      usernameInput.value = loggedInUser.username || "";
      emailInput.value = loggedInUser.email || "";
    }
  
    // Add click event listeners to "Become a Member" buttons
    const becomeMemberButtons = document.querySelectorAll('.plan__button a.btn');
    becomeMemberButtons.forEach((button, index) => {
      button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior
  
        // Retrieve the data-membership-id attribute
        const membershipId = button.getAttribute('data-membership-id');
  
        // Map membershipId to corresponding membership type
        const membershipTypeMap = {
          '1': 'sapphire',
          '2': 'nitro',
          '3': 'elite'
        };
  
        // Autofill the corresponding radio button based on membershipId
        const radioInput = document.getElementById(`membership-${membershipId}`);
        if (radioInput) {
          radioInput.checked = true;
        }
  
        // Scroll to the "Get your membership" section
        const contactSection = document.querySelector(".contact-section");
        contactSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  
    // Handle the form submission
    const form = document.querySelector(".form");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      // Give the browser some time to autofill the radio button
      await new Promise(resolve => setTimeout(resolve, 200));
  
      // Get the selected membership type
      const selectedMembership = document.querySelector('input[name="membership"]:checked');
      const membershipId = selectedMembership ? selectedMembership.id : null;
  
      // Check if a membership type is selected
      if (!membershipId) {
        alert("Please select a membership type");
        return;
      }
  
      // Map membershipId to corresponding membership type
      const membershipTypeMap = {
        'membership-1': 'sapphire',
        'membership-2': 'nitro',
        'membership-3': 'elite'
      };
  
      const membershipType = membershipTypeMap[membershipId];
  
      // Prepare data to send to the server
      const requestData = {
        membershipType,
        userId: loggedInUser.userId,
      };
  
      try {
        // Send a POST request to the server
        const response = await fetch("http://localhost:3000/createMembership", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        // Check the response status
        if (response.status === 201) {
          // Update membership type in sessionStorage
          loggedInUser.membershipType = membershipType;
          sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  
          alert("Membership created successfully!");
        } else if (response.status === 409) {
          alert("Membership already exists for this user");
        } else {
          alert("Error creating membership");
        }
      } catch (error) {
        console.error("Error creating membership:", error.message);
      }
    });
  
    // Add click event listener to the "Send" button in the contact section
    const sendButton = document.querySelector('.btn-rectangular--white');
    sendButton.addEventListener('click', function (event) {
      // Fetch data or perform any other actions before form submission
      console.log("Fetching data before form submission...");
  
      // Now, submit the form
      form.dispatchEvent(new Event("submit"));
    });
  });
  