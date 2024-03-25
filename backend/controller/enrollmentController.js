const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/enrollmentModel'); 
const Course = require('../models/courseModel-admin'); 

exports.submitEnrollmentRequest = asyncHandler(async (req, res) => {
    const courseCode = req.params.courseId; 
    const studentId = req.user._id; 

    // find the course by its code
    const course = await Course.findOne({ courseID: courseCode });
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    // Then check for existing enrollment requests
    const existingRequest = await Enrollment.findOne({
        student: studentId,
        course: course._id,
        status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
        return res.status(400).json({ message: 'You have already submitted an enrollment request for this course' });
    }

    // If no existing request, create a new enrollment request
    const enrollmentRequest = await Enrollment.create({
        student: studentId,
        course: course._id,
        status: 'pending'
    });

    res.status(201).json(enrollmentRequest);
});
