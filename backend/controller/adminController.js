const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel-admin'); 

// Function to list pending enrollment requests
exports.listEnrollmentRequests = asyncHandler(async (req, res) => {
    const enrollmentRequests = await Enrollment.find({ status: 'pending' })
        .populate('student', 'firstName lastName email')
        .populate('course', 'courseID description');

    res.json(enrollmentRequests);
});

// Function to update the status of an enrollment request
exports.updateEnrollmentRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params; 
    const { status } = req.body; 

    const enrollmentRequest = await Enrollment.findById(requestId);

    if (!enrollmentRequest) {
        return res.status(404).json({ message: 'Enrollment request not found' });
    }

    // Check if the status is valid
    if (!['pending', 'accepted', 'denied'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status update' });
    }

    enrollmentRequest.status = status; // Update the status
    const updatedRequest = await enrollmentRequest.save(); 

    // If the request is accepted, add the student to the course's students array
    if (status === 'accepted') {
        const course = await Course.findById(enrollmentRequest.course);
        if (!course.students.includes(enrollmentRequest.student)) {
            course.students.push(enrollmentRequest.student);
            await course.save();
        }
    }

    res.json(updatedRequest); 
});