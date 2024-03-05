// Toggle hamburger menu
document.getElementById('hamburgerMenu').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});

// Close the hamburger menu when a menu item is clicked
function toggleMenu() {
    document.getElementById('menu').classList.remove('active');
}

// Attach toggleMenu function to menu items if necessary
document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', toggleMenu);
});

// Modals
var loginModal = document.getElementById('loginModal');
var signupModal = document.getElementById('signupModal');
var spans = document.getElementsByClassName('close');

document.getElementById('loginBtn').addEventListener('click', function() {
    loginModal.style.display = 'block';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    signupModal.style.display = 'block';
});

for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', function() {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
}

window.onclick = function(event) {
    if (event.target == loginModal || event.target == signupModal) {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    }
};

function showWelcomeMessage() {
    const now = new Date();
    const hour = now.getHours();
    let message = "Hello! Welcome to our E-Learning Platform.";
    if (hour < 12) {
        message = "Good morning! Welcome to our E-Learning Platform.";
    } else if (hour < 18) {
        message = "Good afternoon! Welcome to our E-Learning Platform.";
    } else {
        message = "Good evening! Welcome to our E-Learning Platform.";
    }
    document.getElementById('welcomeMessage').innerText = message;
}

showWelcomeMessage();
