// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Show project details on click
function showProjectDetails(projectName) {
    alert(`More details on ${projectName}`);
}

// Submit form message display
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        document.getElementById('formMessage').textContent = 'Thank you for your message, ' + name + '!';
    } else {
        document.getElementById('formMessage').textContent = 'Please fill in all fields.';
    }
}
