document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from session storage
    const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Populate form fields with user data
    const usernameField = document.getElementById('input-username');
    const emailField = document.getElementById('input-email');
    const newUsernameField = document.getElementById('input-new-username');
    const newPasswordField = document.getElementById('input-new-password');

    if (userData) {
        usernameField.value = userData.username || '';
        emailField.value = userData.email || '';
    }

    // Hide both new username and new password fields initially
    newUsernameField.style.display = 'none';
    newPasswordField.style.display = 'none';

    // Update username on username field click
    usernameField.addEventListener('click', function () {
        usernameField.readOnly = false;
    });

    // Show/hide fields based on dropdown selection
    const selectUpdate = document.getElementById('select-update');
    selectUpdate.addEventListener('change', function () {
        const selectedValue = selectUpdate.value;

        // Hide both fields initially
        newUsernameField.style.display = 'none';
        newPasswordField.style.display = 'none';

        // Show the selected field
        if (selectedValue === 'username') {
            newUsernameField.style.display = 'block';
        } else if (selectedValue === 'password') {
            newPasswordField.style.display = 'block';
        }
    });

    // Update username and/or password button click event
    document.getElementById('updateBtn').addEventListener('click', function () {
        const password = document.getElementById('input-password').value;
        const newUsername = document.getElementById('input-new-username').value;
        const newPassword = document.getElementById('input-new-password').value;

        // Validate password and new username
        if (!password && !newUsername && !newPassword) {
            alert('Please enter at least one field to update.');
            return;
        }

        // Make a request to the server to update the username and/or password
        fetch('http://localhost:3050/update-username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: password,
                newUsername: newUsername,
                newPassword: newPassword,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            // Update session storage and form fields on successful update
            if (data.message === 'User information updated successfully.') {
                if (newUsername) {
                    userData.username = newUsername;
                    usernameField.value = newUsername;
                }
                // Handle updating the password as needed
                sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
                usernameField.readOnly = true; // Set the field back to read-only after updating
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating user information.');
        });
    });
});