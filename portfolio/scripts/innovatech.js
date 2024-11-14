// Get the hamburger menu and the navigation links
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Toggle the 'active' class on the navigation links when hamburger is clicked
hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
