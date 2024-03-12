const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().populate('instructor', 'firstName lastName');
    res.status(200).json(courses);
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private (Instructor or Admin)
const createCourse = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400);
        throw new Error('Please provide a title and description');
    }
    
    // Set the instructor as the logged-in user 
    req.body.instructor = req.user.id;

    const course = await Course.create(req.body);
    res.status(201).json(course);
});

module.exports = { getCourses, createCourse }; 