// Wait for DOM content to load before executing scripts
window.onload = function () {
    console.log("✅ Script loaded successfully!");

    // Get the registration form
    const registerForm = document.getElementById("registration-form");

    // Debugging: Check if the form exists
    if (!registerForm) {
        console.error("❌ Registration form not found! Check HTML structure.");
        return;
    }

    console.log("✅ Registration form found!", registerForm);

    // 🔹 Registration Function (Sends Data to Backend)
    async function registerUser(event) {
        event.preventDefault();

        // Get form data
        const formData = Object.fromEntries(new FormData(registerForm));

        // Ensure correct field names and validate passwords
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Send data to the backend API
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Registration successful! You can now log in.");
                window.location.href = "login.html"; // Redirect to login
            } else {
                alert(`❌ Error: ${result.message}`);
            }
        } catch (error) {
            console.error("❌ Error registering user:", error);
            alert("An error occurred. Please try again.");
        }
    }

    // Attach submit event to the form
    registerForm.addEventListener("submit", registerUser);
};

// ✅ Login Function (Fixed to Work with Backend)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            // ✅ Save token properly
            const userData = {
                username: result.user.username,
                token: result.token, // Ensure token is saved!
            };
            localStorage.setItem("loggedInUser", JSON.stringify(userData));

            alert("Login successful! Redirecting...");
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid username or password.");
        }
    });
}


// 🔹 Display Welcome Message on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        alert("You are not logged in!");
        window.location.href = "login.html";
    } else {
        document.getElementById("welcome-message").innerHTML = `<h2>Welcome, ${user.fullName}!</h2>`;
        document.getElementById("user-display").innerHTML = `Welcome, ${user.fullName}! <button id="logout-btn">Logout</button>`;
        document.getElementById("logout-btn").addEventListener("click", logoutUser);
    }
}

// 🔹 Populate dropdowns dynamically
function populateDropdown(id, options) {
    const select = document.getElementById(id);
    if (select) {
        select.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
    }
}

populateDropdown("country", ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
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
    "Yemen", "Zambia", "Zimbabwe"]);
populateDropdown("sex", ["Male", "Female"]);
populateDropdown("course", ["Web Development", "Mobile App Development", "Cloud Computing", "Data Science",
    "Graphic Design", "Digital Marketing", "Cybersecurity", "Artificial Intelligence",
    "Blockchain Technology", "Project Management"]);

// 🔹 Fetch and display courses dynamically
async function fetchCourses() {
    try {
        const userData = localStorage.getItem("loggedInUser");

        if (!userData) {
            console.error("No user data found. Please log in.");
            alert("You must log in first!");

            // ✅ Prevent infinite loop by checking the current page
            if (!window.location.href.includes("login.html")) {
                window.location.href = "login.html";
            }
            return;
        }

        const user = JSON.parse(userData);
        if (!user.token) {
            throw new Error("Token missing. Please log in again.");
        }

        const response = await fetch("http://localhost:3000/courses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`, // ✅ Send token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const courses = await response.json();
        console.log("Courses loaded:", courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// ✅ Call fetchCourses only when not on the login page
if (!window.location.href.includes("login.html")) {
    fetchCourses();
}




// 🔹 Contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Your message has been sent successfully!");
        contactForm.reset();
    });
}

// 🔹 Course Card Click Event
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".course-card").forEach(card => {
        card.addEventListener("click", function () {
            const courseId = this.dataset.course;
            if (courseId) {
                localStorage.setItem("selectedCourse", courseId);
                window.location.href = `course-details.html?course=${courseId}`;
            }
        });
    });
});

window.onload = function () {
    console.log("✅ Script loaded successfully!");

    const publicPages = ["index.html", "about-us.html", "register.html", "contact.html", "courses.html"];

    const currentPage = window.location.pathname.split("/").pop(); // Get current page filename

    // Redirect only if the user is not logged in AND they are on a private page
    if (!localStorage.getItem("loggedInUser") && !publicPages.includes(currentPage)) {
        console.warn("⚠️ You need to log in first!");
        window.location.href = "login.html"; // Redirect to login only for private pages
    } else {
        console.log("✅ Access granted:", currentPage);
    }
};
