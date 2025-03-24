document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
// Get the input values
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

// Simulate an email sending process
const responseMessage = document.getElementById('responseMessage');
responseMessage.innerHTML = `Thank you, ${name}! Your message has been sent. We will get back to you at ${email}.`;

// Clear the form fields
document.getElementById('contactForm').reset();
});

  // JavaScript (script.js)
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
  
hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});
  