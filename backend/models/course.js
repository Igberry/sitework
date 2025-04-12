const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    modules: { type: [String], required: true }
});

module.exports = mongoose.model("Course", CourseSchema);
