// Combined Project.js - Fully Restored with All Functionalities

// Navigation & Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// Explore Button Scroll
document.getElementById("explore-btn")?.addEventListener("click", function () {
    document.getElementById("courses")?.scrollIntoView({ behavior: 'smooth' });
});

// Backend API URL
const API_URL = "http://localhost:3000";

// Register User
async function registerUser(event) {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const sex = document.getElementById("sex").value;
    const course = document.getElementById("course").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    console.log("Collected form data:", { fullName, email, country, sex, course, username, password, confirmPassword });

    // Ensure passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, country, sex, course, username, password })
        });

        console.log("Response received:", response);

        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
            alert("Registration successful! Redirecting to login page...");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred while registering.");
    }
}
document.getElementById("registration-form")?.addEventListener("submit", registerUser);

// Populate Dropdown Options
document.addEventListener("DOMContentLoaded", function () {
    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
        "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
        "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic (Czechia)", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
        "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
        "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
        "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
        "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
        "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
        "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
        "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
        "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
        "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
        "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
        "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen", "Zambia", "Zimbabwe"];
    const sexes = ["Male", "Female"];
    const courses = ["Web Development", "Mobile App Development", "Cloud Computing",
        "Data Science", "Graphic Design", "Digital Marketing",
        "Cybersecurity", "Artificial Intelligence", "Blockchain Technology", "Project Management"];

    function populateDropdown(id, options) {
        const selectElement = document.getElementById(id);
        if (!selectElement) return;
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.toLowerCase().replace(/\s+/g, "-");
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    populateDropdown("country", countries);
    populateDropdown("sex", sexes);
    populateDropdown("course", courses);
});

// Login User
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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

document.getElementById("login-form")?.addEventListener("submit", loginUser);

// Fetch Courses
async function fetchCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
        });
        const courses = await response.json();
        console.log("Courses:", courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Contact Form Submission
document.getElementById("contact-form")?.addEventListener("submit", async function (event) {
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
