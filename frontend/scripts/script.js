document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Example check for user login status
    // This could be replaced with a more secure method, like an API call that verifies the user's session
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Assume this gets set upon login

    if (isLoggedIn) {
        const loginProfileLink = document.getElementById('loginProfileLink');
        loginProfileLink.href = 'profile.html';
        loginProfileLink.innerText = 'Profile';
    }
});

function changePassword() {
    // Implement change password functionality or redirect
    console.log('Change password clicked');
}

function logout() {
    // Implement logout functionality
    console.log('Log out clicked');
}
