// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select forms
    const registerForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Collect form data
            const fullName = document.getElementById("full-name").value.trim();
            const email = document.getElementById("email").value.trim();
            const dob = document.getElementById("dob").value.trim();
            const sex = document.getElementById("sex").value.trim();
            const country = document.getElementById("country").value.trim();
            const state = document.getElementById("state").value.trim();
            const city = document.getElementById("city").value.trim();
            const address = document.getElementById("address").value.trim();
            const course = document.getElementById("course").value.trim();
            const resumeDate = document.getElementById("resume-date").value.trim();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            // Check for empty fields
            if (!username || !password || !confirmPassword) {
                alert("Please fill in all required fields.");
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName, email, dob, sex, country, state, city, address, course, resumeDate, username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = "login.html"; // Redirect to login page
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error registering:", error);
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error("Invalid username or password.");
                }

                const data = await response.json();

                // Store session data
                sessionStorage.setItem("loggedInUser", JSON.stringify(data));

                // Display full name instead of username
                alert(`Login successful! Welcome, ${data.fullName}`);

                // Redirect to dashboard
                window.location.href = "dashboard.html";
            } catch (error) {
                errorMessage.textContent = "Invalid username or password. Please try again.";
                errorMessage.style.color = "red";
                console.error("Error logging in:", error);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {
            logoutBtn.addEventListener("click", async () => {
                const token = localStorage.getItem("token");

                console.log("Logout button clicked");
                console.log("Token before logout:", token);

                if (!token) {
                    console.warn("No token found, redirecting to login.");
                    window.location.href = "login.html";
                    return;
                }

                try {
                    const response = await fetch("http://localhost:3000/auth/logout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    console.log("Logout request sent:", response.status);

                    if (response.ok) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");

                        console.log("Token removed, redirecting to login...");
                        window.location.href = "login.html";
                    } else {
                        const data = await response.json();
                        console.error("Logout failed:", data.message);
                    }
                } catch (error) {
                    console.error("Error logging out:", error);
                }
            });
        } else {
            console.error("Logout button not found!");
        }
    });

    // 🔹 Populate dropdowns dynamically
    function populateDropdown(id, options) {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
        }
    }

    populateDropdown("country", ["Select Country", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
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
    populateDropdown("sex", ["Select an Option", "Male", "Female"]);
    populateDropdown("course", ["Select Course", "Web Development", "Mobile App Development", "Cloud Computing", "Data Science",
        "Graphic Design", "Digital Marketing", "Cybersecurity", "Artificial Intelligence",
        "Blockchain Technology", "Project Management"]);
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript is running!");

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        console.error("❌ Contact form NOT found!");
        return;
    }

    console.log("✅ Contact form found!");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();  // 🛑 Stop the page from refreshing

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("⚠️ Please fill out all fields.");
            return;
        }

        console.log("📩 Sending data:", { name, email, message });

        fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Server Response:", data);
                alert(data.message);
                contactForm.reset(); // 🎯 Clear the form after success
            })
            .catch(error => {
                console.error("❌ Error:", error);
                alert("An error occurred. Please try again.");
            });
    });
});

// Function to check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        if (window.location.pathname.includes("dashboard")) {
            window.location.href = "login.html";
        }
    } else {
        if (window.location.pathname.includes("login")) {
            window.location.href = "dashboard.html";
        }

        // Update dashboard with user info
        const dashboardUsername = document.getElementById("dashboardUsername");
        if (dashboardUsername) {
            dashboardUsername.textContent = username;
        }
    }
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

document.addEventListener("DOMContentLoaded", function () {
    // Only run this script if we are on the dashboard page
    if (!document.getElementById("welcomeMessage")) {
        return; // Exit early if welcomeMessage is not found
    }

    // Wait for the DOM to fully load before modifying elements
    setTimeout(() => {
        const welcomeMessage = document.getElementById("welcomeMessage");
        const logoutBtn = document.getElementById("logoutBtn");

        if (!welcomeMessage) {
            console.error("Error: 'welcomeMessage' element not found in the DOM.");
            return; // Stop execution if the element is missing
        }

        // Retrieve logged-in user data from sessionStorage
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

        if (loggedInUser) {
            welcomeMessage.textContent = `Welcome, ${loggedInUser.fullName}`; // Display full name
        } else {
            console.warn("No user found in session. Redirecting to login...");
            window.location.href = "login.html"; // Redirect to login if no user is found
        }

        // Handle Logout
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                sessionStorage.removeItem("loggedInUser"); // Remove session data
                window.location.href = "login.html"; // Redirect to login page
            });
        } else {
            console.warn("Logout button not found.");
        }
    }, 100); // Small delay to ensure elements are loaded
});

document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const dashboardContent = document.getElementById("dashboardContent");
    const logoutBtn = document.getElementById("logoutBtn");

    // Function to fetch and update content dynamically
    async function loadDashboardSection(endpoint, sectionTitle) {
        dashboardContent.innerHTML = `<p>Loading ${sectionTitle}...</p>`;

        try {
            const token = localStorage.getItem("authToken"); // Ensure user is logged in
            const response = await fetch(endpoint, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to load data.");
            }

            const data = await response.json();

            switch (sectionTitle) {
                case "Profile":
                    dashboardContent.innerHTML = `
                        <h2>Profile</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Role:</strong> ${data.role}</p>
                    `;
                    break;
                case "My Courses":
                    dashboardContent.innerHTML = `
                        <h2>My Courses</h2>
                        ${data.courses.map(course => `
                            <div class="course-item">
                                <h3>${course.title}</h3>
                                <p>${course.description}</p>
                            </div>
                        `).join("")}
                    `;
                    break;
                case "Grades":
                    dashboardContent.innerHTML = `
                        <h2>Grades</h2>
                        <ul>
                            ${data.grades.map(grade => `
                                <li>${grade.course}: <strong>${grade.score}%</strong></li>
                            `).join("")}
                        </ul>
                    `;
                    break;
                case "Schedule":
                    dashboardContent.innerHTML = `
                        <h2>Schedule</h2>
                        <p>Class scheduling coming soon...</p>
                    `;
                    break;
                case "Resources":
                    dashboardContent.innerHTML = `
                        <h2>Resources</h2>
                        <ul>
                            ${data.resources.map(res => `<li><a href="${res.link}" target="_blank">${res.title}</a></li>`).join("")}
                        </ul>
                    `;
                    break;
                case "Settings":
                    dashboardContent.innerHTML = `
                        <h2>Settings</h2>
                        <button onclick="toggleTheme()">Toggle Dark Mode</button>
                    `;
                    break;
                default:
                    dashboardContent.innerHTML = `<p>No content available.</p>`;
            }
        } catch (error) {
            dashboardContent.innerHTML = `<p>Error loading ${sectionTitle}.</p>`;
            console.error(error);
        }
    }

    // Sidebar event listeners
    document.getElementById("profile").addEventListener("click", () => loadDashboardSection("/api/dashboard", "Profile"));
    document.getElementById("myCourses").addEventListener("click", () => loadDashboardSection("/api/courses", "My Courses"));
    document.getElementById("grades").addEventListener("click", () => loadDashboardSection("/api/grades", "Grades"));
    document.getElementById("schedule").addEventListener("click", () => loadDashboardSection("/api/schedule", "Schedule"));
    document.getElementById("resources").addEventListener("click", () => loadDashboardSection("/api/resources", "Resources"));
    document.getElementById("settings").addEventListener("click", () => loadDashboardSection("/api/settings", "Settings"));

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        window.location.href = "login.html"; // Redirect to login page
    });

    // Theme Toggle
    window.toggleTheme = function () {
        document.body.classList.toggle("dark-mode");
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});