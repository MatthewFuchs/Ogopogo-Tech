// Script to handle user authentication via JWT tokens
document.addEventListener("DOMContentLoaded", function() {
    // Attempt to retrieve the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        // If no token is found, redirect to the login page
        window.location.href = 'log-in.html';
    } else {
        // If a token is found, validate it by sending a request to the backend
        fetch('/api/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => {
            if (!response.ok) {
                // If the token is invalid, redirect to the login page
                throw new Error('Token validation failed');
            }
            // Token is valid; user can stay on the page (optional: load user-specific content here)
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'log-in.html';
        });
    }
});
