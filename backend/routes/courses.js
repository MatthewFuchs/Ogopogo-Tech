const express = require('express');
const router = express.Router();
const Course = require('backend/models/courses.js'); // Adjust the path as necessary

// POST route to create a new course
router.post('/', async (req, res) => {
    const course = new Course(req.body);
    try {
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add other routes as needed for getting, updating, and deleting courses

module.exports = router;
