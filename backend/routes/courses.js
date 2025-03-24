// routes/courses.js
const express = require('express');
const Course = require('../models/course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});

// Add a new course
router.post('/', async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newCourse = new Course({ title, description, price });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
});

// Update a course
router.put('/:id', async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description, price }, { new: true });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
});

// Delete a course
router.delete('/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course' });
    }
});

module.exports = router;
