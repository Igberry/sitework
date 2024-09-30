// Content for each dashboard section
const dashboardContent = {
    profile: `<h2>My Profile</h2><p>Here is your profile information.</p>`,
    myCourses: `<h2>My Courses</h2><p>Here are the courses you are enrolled in.</p>`,
    grades: `<h2>Grades</h2><p>Here are your current grades.</p>`,
    schedule: `<h2>Schedule</h2><p>Here is your course schedule.</p>`,
    resources: `<h2>Resources</h2><p>Here are some helpful resources.</p>`,
    settings: `<h2>Settings</h2><p>Here you can update your settings.</p>`,
    logout: `<h2>Logout</h2><p>You have successfully logged out.</p>`
};
  
  // Function to update the content area
function updateContent(section) {
    const contentArea = document.getElementById('dashboardContent');
    contentArea.innerHTML = dashboardContent[section];
}
  
  // Event listeners for sidebar links
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      updateContent(this.id);
    });
});
  
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
  
hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});