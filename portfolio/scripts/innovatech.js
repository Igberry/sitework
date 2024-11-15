document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {  // Ensure the elements exist
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Toggle 'active' class to show/hide nav-links
        });
    } else {
        console.error("Required elements not found in the DOM");
    }
});
