document.addEventListener('DOMContentLoaded', () => {
    // Select the hamburger menu and nav links
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    // Add event listener to toggle the 'active' class
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
