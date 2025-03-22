const Course = require('../models/courseModel');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
