// Required libraries and modules for API functionality
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');

/**
 * Register a new user.
 * This function checks for the existence of required fields, verifies that the user doesn't already exist,
 * hashes the user's password, creates a new user in the database, and returns the user's details with a JWT token.
 * @route POST /api/user
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, birthday } = req.body;

    // Validate that all required fields are provided
    if (!firstName || !lastName || !email || !password || !birthday) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check for existing user by email
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash the password before saving the user to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = await User.create({
        role: "student",
        firstName,
        lastName,
        email,
        password: hashedPass,
        birthday,
    });

    // Respond with the user's details and a JWT token if the user was successfully created
    if (user) {
        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * Authenticate a user.
 * Checks if the user exists by email and then compares the provided password with the stored hash.
 * If authentication is successful, returns the user's details and a JWT token.
 * @route POST /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check provided password against hashed password in the database
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

/**
 * Placeholder for getting user data.
 * @route GET /api/user/me
 * @access Public
 */
const getMe = asyncHandler(async (req, res) => {
    res.json({ message: 'User data display' });
});

/**
 * Generates a JWT token for user authentication.
 * @param {string} id The user's ID to be included in the JWT.
 * @returns {string} A JWT token with the user's ID.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// Exporting the functions to be used in other parts of the application
module.exports = {
    registerUser,
    loginUser,
    getMe,
};
