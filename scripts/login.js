// Login form validation
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
const studentID = document.getElementById('studentID').value.trim();
const password = document.getElementById('password').value.trim();
const errorMessage = document.getElementById('errorMessage');
  
    if (studentID === '' || password === '') {
      errorMessage.textContent = 'Both fields are required.';
    } else {
      errorMessage.textContent = '';
      // Add actual authentication logic here
      alert('Login successful! Redirecting to dashboard...');
      window.location.href = 'dashboard.html'; // Redirect to dashboard page
    }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
  
hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});
  