/**
 * This script is responsible for fetching the current user's data from the server
 * and updating the profile page with this data. It also handles the redirection
 * to the update user page when the "Edit Profile" button is clicked.
 */

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Attempt to retrieve the user's token from localStorage
    const token = localStorage.getItem('userToken');

    // If a token exists, attempt to fetch the user's data from the server
    if (token) {
      fetch('http://localhost:8002/api/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // If the server responds with an error, throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        // parse the JSON response
        return response.json();
      })
      .then(user => {
        // Update the DOM elements with the fetched user data
        document.getElementById('userFullNameHeading').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('userFullName').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userBirthday').textContent = user.birthday.split('T')[0];

        const profilePhotoElement = document.getElementById('profilePhoto');
        if (user.profilePhoto) {
            // If user has a profile photo, convert the Buffer to base64 and set as img src
            profilePhotoElement.src = `data:image/jpeg;base64,${user.profilePhoto}`;
          } else {
            // If no profile photo, use a default image from your static files
            profilePhotoElement.src = '/path/to/default-profile-photo.jpg'; 
        }
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // If no token is found, redirect the user to the login page
      window.location.href = '/frontend/log-in.html';
    }
  });

// Add an event listener to the "Edit Profile" button for redirecting to the update user page
document.getElementById('editProfileButton').addEventListener('click', function() {
    window.location.href = 'update-user.html'; 
});

// Handle logout button click
document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear user session information
    localStorage.removeItem('userToken'); // Assuming 'userToken' is the key where the token is stored
    localStorage.removeItem('isLoggedIn'); // Clear logged in status if you're using this flag
    
    // Redirect to the login page
    window.location.href = 'log-in.html';
});