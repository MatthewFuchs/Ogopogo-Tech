// Import necessary modules
const express = require('express');
const router = express.Router(); 
const { registerUser, loginUser, getMe , updateUserDetails} = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage(); // use memory storage
const upload = multer({ storage: storage });
const User = require('../models/userModel');

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

router.put('/me', protect, upload.single('profilePhoto'), updateUserDetails);

/**
 * Route to update the current user's profile information.
 * This endpoint allows the currently authenticated user to update their personal information, such as name, email, password, birthday, and profile photo. It requires authentication to ensure that only the user can update their own information. The request must include the fields to be updated in the JSON body. The operation is handled by the updateUserDetails function imported from the user controller. The protect middleware is used to ensure only authenticated requests access this route.
 * @route PUT /api/user/me
 * @access Private
 */
router.put('/me', protect, updateUserDetails);

router.get('/info/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router to be mounted by the main application
module.exports = router;
