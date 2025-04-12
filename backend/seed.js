const mongoose = require("mongoose");
const Course = require("./models/course"); // Ensure this path is correct

const courses = [
    {
        name: "Web Development",
        instructor: "John Doe",
        duration: "12 weeks",
        description: "Learn HTML, CSS, JavaScript, and React.",
        modules: ["HTML Basics", "CSS Styling", "JavaScript Essentials", "React.js"]
    },
    {
        name: "Data Science",
        instructor: "Jane Smith",
        duration: "16 weeks",
        description: "Learn Python, machine learning, and AI fundamentals.",
        modules: ["Python Basics", "Data Analysis", "Machine Learning", "Deep Learning"]
    }
];

// Connect to MongoDB
mongoose.connect("mongodb+srv://iamigberry:iamigberry@cluster0.8kota.mongodb.net/sitework") // Removed deprecated options
    .then(() => {
        console.log("Connected to MongoDB");
        return Course.insertMany(courses);
    })
    .then(() => {
        console.log("Courses added successfully!");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

