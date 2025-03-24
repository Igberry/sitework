// Select the form and login container
const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const errorMessage = document.getElementById('errorMessage');

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get user input values
    const studentID = document.getElementById('studentID').value;
    const password = document.getElementById('password').value;

    // Simulate login validation (replace with actual validation logic)
    if (studentID === '12345' && password === 'password') { // Replace with actual login logic
        // Clear any previous error message
        errorMessage.textContent = '';

        // Update the login container to show "logged in" state
        loginContainer.innerHTML = `
            <h2>Welcome!</h2>
            <p>You are now logged in as Student ID: ${studentID}</p>
        `;
    } else {
        // Display error message if credentials are incorrect
        errorMessage.textContent = 'Invalid Student ID or Password';
    }
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
  
hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});
  