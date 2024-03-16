const express = require('express');
const router = express.Router(); 
const { getCourses, createCourse } = require('../controller/courseController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Route create a course.
 * This endpoint requires authentication and creates a new course with current user as the instructor, 
 * takes in required fields for course object. The protect middleware is used to ensure only authenticated 
 * requests access this route. The operation is handled by the createCourse function imported from the course controller.
 * @access Private
 */
router.post('/', protect, createCourse); 

/**
 * Route to get all courses
 * This endpoint returns all the courses currently available on the platform, including their 
 * instructor's name. The operation is handled by the getCourses function imported from the course controller.
 * @access Public
 */
router.get('/', getCourses);

// Export the router to be mounted by the main application
module.exports = router;
