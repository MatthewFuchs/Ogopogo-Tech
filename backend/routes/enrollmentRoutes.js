// Import necessary modules and middleware
const express = require('express');
const router = express.Router();
const { submitEnrollmentRequest } = require('../controller/enrollmentController');
const { protect } = require('../middleware/authMiddleware'); // Ensure you have both protect and admin exported
const {listEnrollmentRequests, updateEnrollmentRequest} = require('../controller/adminController');
const { admin } = require('../middleware/adminMiddleware');

router.post('/:courseId', protect, submitEnrollmentRequest);
router.get('/enrollmentRequests', protect, admin, listEnrollmentRequests);
router.put('/enrollmentRequests/:requestId', protect, admin, updateEnrollmentRequest);


module.exports = router;
