document.getElementById("explore-btn").addEventListener("click", function () {
    document.getElementById("courses").scrollIntoView({ behavior: 'smooth' });
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Backend API URL
const API_URL = "http://localhost:3000"; // Change this if deployed

// Register User
async function registerUser(fullName, email, password, country, sex, course) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password, country, sex, course })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Registration error:", error);
    }
}

// Login User
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            alert("Login successful");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
    }
}

// Fetch Courses
async function fetchCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
        });
        const courses = await response.json();
        console.log("Courses:", courses);
        // You can update the UI with courses here
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Submit Contact Form
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData);

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Contact form error:", error);
    }
});
