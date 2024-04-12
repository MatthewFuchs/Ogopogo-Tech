// routes/courseRoute-admin.js
const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require("./../controller/courseController-admin");
const { protect } = require('../middleware/authMiddleware');
const Course = require('../models/courseModel-admin');
const { getTeachers } = require('../controller/userController'); 

router.post('', createCourse);
router.get('/', getCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);



router.get('/teachers', getTeachers);  // This will handle GET requests to /api/courses/teachers


router.get('/enrolled', protect, async (req, res) => {
    try {
        const enrolledCourses = await Course.find({ students: req.user._id })
            .select('-students');
        res.json(enrolledCourses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).select('-students');
        let isEnrolled = false;
        let isRequested = false;

        // Check if the user is logged in and enrolled in the course
        if (req.user) {
            const studentEnrollment = await Course.findOne({ _id: req.params.courseId, students: req.user._id });
            isEnrolled = !!studentEnrollment;
            
            const existingRequest = await Enrollment.findOne({
                student: req.user._id,
                course: req.params.courseId,
                status: { $in: ['pending', 'accepted'] }
            });
            isRequested = !!existingRequest;
        }

        // Include 'isEnrolled' only if the user is logged in
        const courseResponse = course.toObject();
        if (req.user) {
            courseResponse.isEnrolled = isEnrolled;
            courseResponse.isRequested = isRequested;
        }

        res.json(courseResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
