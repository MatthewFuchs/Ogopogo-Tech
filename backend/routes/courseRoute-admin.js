// routes/courseRoute-admin.js
const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require("backend/controller/courseController.js");
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createCourse);
router.get('/', protect, getCourses);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;
