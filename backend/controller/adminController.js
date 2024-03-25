const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/enrollmentModel');

// Function to list all enrollment requests
exports.listEnrollmentRequests = asyncHandler(async (req, res) => {
    const enrollmentRequests = await Enrollment.find()
        .populate('student', 'firstName lastName email') // Adjust according to your User model
        .populate('course', 'courseID description'); // Adjust according to your Course model

    res.json(enrollmentRequests);
});

// Function to update the status of an enrollment request
exports.updateEnrollmentRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params; // Get the request ID from URL parameters
    const { status } = req.body; // Expected to be either "accepted" or "denied"

    const enrollmentRequest = await Enrollment.findById(requestId);

    if (!enrollmentRequest) {
        return res.status(404).json({ message: 'Enrollment request not found' });
    }

    // Check if the status is valid
    if (!['pending', 'accepted', 'denied'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status update' });
    }

    enrollmentRequest.status = status; // Update the status
    const updatedRequest = await enrollmentRequest.save(); // Save the updated request

    res.json(updatedRequest); // Send back the updated enrollment request
});
