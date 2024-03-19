// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel'); // Corrected path
const { protect } = require('../middleware/authMiddleware'); // Assuming you have this for route protection

router.post('/', protect, async (req, res) => { // Ensure `protect` middleware is properly implemented
    const { name, description, instructor } = req.body;
    try {
        const course = new Course({ name, description, instructor });
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add other routes as needed

module.exports = router;
