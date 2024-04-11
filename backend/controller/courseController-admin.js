const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel-admin');

// Create a new course
exports.createCourse = asyncHandler(async (req, res) => {
    const { name, courseID, description, instructor } = req.body;
    // Check for required fields
    if (!name || !description || !instructor) {
        res.status(400);
        throw new Error('All fields are required');
    }
    // Create and save the course
    const course = await Course.create({ name, courseID, description, instructor });
    res.status(201).json(course);
});

// Get all courses

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const Course = require('../models/Course');
// exports.getCourses = asyncHandler(async (req, res) => {
//     const courses = await Course.find({});
//     res.status(200).json(courses);
// });


// Update a course
exports.updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedCourse);
});

// Delete a course
exports.deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }
    await course.remove();
    res.status(200).json({ id: req.params.id });
});
