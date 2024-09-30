document.getElementById("explore-btn").addEventListener("click", function() {
    document.getElementById("courses").scrollIntoView({ behavior: 'smooth' });
});
  
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for contacting us. We will get back to you soon!");
});
  
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
  
hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});