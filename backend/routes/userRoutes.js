// Import necessary modules
const express = require('express');
const router = express.Router(); 
const { registerUser, loginUser, getMe } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Route to register a new user.
 * This endpoint allows new users to register by providing necessary personal information
 * including their name, email, password, etc. The operation is handled by the registerUser
 * function imported from the user controller.
 * @access Public
 */
router.post('/', registerUser);

/**
 * Route to log in a user.
 * This endpoint authenticates a user by their email and password. Successful authentication
 * returns a token for accessing protected routes. The operation is handled by the loginUser
 * function imported from the user controller.
 * @access Public
 */
router.post('/login', loginUser);

/**
 * Route to get the current user's profile information.
 * This endpoint requires authentication and returns the profile information of the currently
 * authenticated user. The protect middleware is used to ensure only authenticated requests
 * access this route. The operation is handled by the getMe function imported from the user controller.
 * @access Private
 */
router.get('/me', protect, getMe);

// Export the router to be mounted by the main application
module.exports = router;
