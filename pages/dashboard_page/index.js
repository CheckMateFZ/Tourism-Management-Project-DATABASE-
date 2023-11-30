// JavaScript (frontend.js)
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from session storage
    const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Populate form fields with user data
    document.getElementById('input-username').value = userData.username;
    document.getElementById('input-email').value = userData.email;

    // Update username button click event
    document.getElementById('updateBtn').addEventListener('click', function () {
        const password = document.getElementById('input-password').value;
        const newUsername = document.getElementById('input-new-username').value;

        // Validate password and new username
        if (!password || !newUsername) {
            alert('Please enter password and new username.');
            return;
        }

        // Make a request to the server to update the username
        fetch('http://localhost:3050/update-username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: password,
                newUsername: newUsername,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Update session storage and form field on successful update
            if (data.message === 'Username updated successfully.') {
                userData.username = newUsername;
                sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
                document.getElementById('input-username').value = newUsername;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the username.');
        });
    });

    // Allow users to click on the username field to enable editing
    document.getElementById('input-username').addEventListener('click', function () {
        document.getElementById('input-username').readOnly = false;
    });
});