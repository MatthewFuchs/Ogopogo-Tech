// Import the required modules and middleware.
const express = require('express');
const router = express.Router();

// Controllers handle the logic behind the routes.
const { submitEnrollmentRequest } = require('../controller/enrollmentController');
const { listEnrollmentRequests, updateEnrollmentRequest } = require('../controller/adminController');

// Middleware for route protection and role-based access.
const { protect } = require('../middleware/authMiddleware'); 
const { admin } = require('../middleware/adminMiddleware');

// Route to submit an enrollment request for a course.
// Requires the user to be authenticated.
router.post('/:courseId', protect, submitEnrollmentRequest);

// Route to list all enrollment requests.
// Accessible only by authenticated users with an admin role.
router.get('/enrollmentRequests', protect, admin, listEnrollmentRequests);

// Route to update the status of an enrollment request.
// Accessible only by authenticated users with an admin role.
router.put('/enrollmentRequests/:requestId', protect, admin, updateEnrollmentRequest);

// Export the router for use in the main application file where it can be mounted.
module.exports = router;
