/**
 * Fetches and fills the user's current data from the server and populates the form fields.
 * This function makes a GET request to the '/api/user/me' endpoint to retrieve the user's details,
 * then fills the form fields with this data. It handles any errors that occur during the fetch operation.
 */
function fetchAndFillUserData() {
    fetch('http://localhost:8002/api/user/me', { 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Authorization header with JWT token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Populating form fields with the fetched data
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('email').value = data.email;
        document.getElementById('dob').value = data.birthday.split('T')[0];
        document.getElementById('dob').value = datePart;
    })
    .catch(error => {
        console.error('There has been a problem with fetching user data:', error);
    });
}

/**
 * Formats a date string into 'YYYY-MM-DD' format for input[type="date"] fields.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    // Ensuring month and day are 2 digits
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-'); // Concatenating in 'YYYY-MM-DD' format
}

// Adding an event listener for the form submission to update user details
document.getElementById('updateProfileForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Preventing default form submission behavior

    // Gathering form data to send in the update request
    const formData = new FormData();
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('birthday', new Date(document.getElementById('dob').valueAsNumber + new Date().getTimezoneOffset() * 60000).toISOString());
    
    const password = document.getElementById('password').value;
    if (password) formData.append('password', password);

    const profilePhoto = document.getElementById('profilePhoto').files[0];
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    // Send formData with fetch using 'PUT' method and multipart/form-data
    // Note: Omit the 'Content-Type' header to allow the browser to set it with the boundary
    fetch('http://localhost:8002/api/user/me', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Profile updated successfully!');
        window.location.href = '/frontend/profile.html'; 
        fetchAndFillUserData(); // Refreshing user data on the page
    })
    .catch(error => {
        console.error('There has been a problem with your update operation:', error);
    });
});

// Fetching and filling user data when the page loads
fetchAndFillUserData();
