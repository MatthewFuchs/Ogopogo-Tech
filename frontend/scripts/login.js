/**
 * This script handles user interactions on a webpage, including FAQ toggling,
 * form submission for login, updating login status, and user logout.
 */

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Toggles FAQ answers on click events
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            // Toggle display of the answer
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Handles login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Updates the login status and adjusts UI accordingly
    updateLoginStatus();

    // Handles user logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

/**
 * Handles the login form submission, sends user credentials to the server,
 * and processes the response.
 * @param {Event} e - The event object associated with the form submission.
 */
function handleLogin(e) {
    e.preventDefault(); // Prevents the default form submission action

    // Collects user credentials from form inputs
    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    // Sends a POST request to the server with user credentials
    fetch('http://localhost:8002/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            // Stores the login status and token in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userToken', data.token);
            // Updates UI based on login status
            updateLoginStatus();
            alert('Login successful!');
            // Redirects to the profile page
            window.location.href = '/frontend/profile.html';
        }
    })
    .catch(error => {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);
    });
}

/**
 * Updates the UI based on the user's login status.
 */
function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginProfileLink = document.getElementById('loginProfileLink');

    // Adjusts navigation links based on whether the user is logged in
    if (isLoggedIn === 'true') {
        loginProfileLink.href = '/frontend/profile.html';
        loginProfileLink.innerText = 'Profile';
    } else {
        loginProfileLink.href = 'log-in.html';
        loginProfileLink.innerText = 'Log In';
    }
}

/**
 * Logs out the user by clearing stored credentials and updating the UI.
 */
function logout() {
    // Clears login status and token from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    // Updates UI to reflect logged-out state
    updateLoginStatus();
    alert('You have been logged out.');
    // Redirects to the home page
    window.location.href = '/index.html';
}

/**
 * Placeholder for change password functionality.
 */
function changePassword() {
    console.log('Change password clicked');
    // This function can be implemented to handle password changes
}
