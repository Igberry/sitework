document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };
    const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const result = await res.json();
    document.getElementById('responseMessage').textContent = result.message;
});
// Theme toggle functionality
const toggleBtn = document.getElementById('toggleTheme');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggleBtn.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
});

