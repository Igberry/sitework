const express = require("express");
const User = require("../models/user"); // Import User model
const { authMiddleware } = require("./auth"); // Middleware for authentication

const router = express.Router();

// Get logged-in user's details
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get student courses
router.get("/courses", authMiddleware, async (req, res) => {
    try {
        // Dummy data (replace with actual database query)
        const courses = [
            { title: "Web Development", description: "Learn HTML, CSS, and JavaScript" },
            { title: "Data Science", description: "Learn Python and Machine Learning" }
        ];
        res.json({ courses });
    } catch (error) {
        console.error("Courses error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get student grades
router.get("/grades", authMiddleware, async (req, res) => {
    try {
        const grades = [
            { course: "Web Development", score: 85 },
            { course: "Data Science", score: 90 }
        ];
        res.json({ grades });
    } catch (error) {
        console.error("Grades error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get schedule (Allow students to register for classes)
router.get("/schedule", authMiddleware, async (req, res) => {
    try {
        res.json({
            message: "Class registration coming soon!",
            availableClasses: ["Frontend Development", "Backend Development", "UI/UX Design"]
        });
    } catch (error) {
        console.error("Schedule error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get resources (Help materials for students)
router.get("/resources", authMiddleware, async (req, res) => {
    try {
        const resources = [
            { title: "MDN Web Docs", link: "https://developer.mozilla.org/" },
            { title: "W3Schools", link: "https://www.w3schools.com/" }
        ];
        res.json({ resources });
    } catch (error) {
        console.error("Resources error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get user settings (Dark mode, contact details)
router.get("/settings", authMiddleware, async (req, res) => {
    try {
        res.json({
            theme: "light",
            contact: { email: "student@example.com", phone: "123-456-7890" }
        });
    } catch (error) {
        console.error("Settings error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
