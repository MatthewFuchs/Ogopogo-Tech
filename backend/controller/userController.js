// Required libraries and modules for API functionality
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

const uploadMiddleware = upload.single('profilePhoto');


/**
 * Register a new user.
 * This function checks for the existence of required fields, verifies that the user doesn't already exist,
 * hashes the user's password, creates a new user in the database, and returns the user's details with a JWT token.
 * @route POST /api/user
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, birthday, role } = req.body; // Include role in destructuring

    // Validate that all required fields are provided
    if (!firstName || !lastName || !email || !password || !birthday || !role) { // Check role is provided
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

    // Create a new user with the hashed password and provided role
    const user = await User.create({
        role, // Dynamically set the role based on the input
        firstName,
        lastName,
        email,
        password: hashedPass,
        birthday,
    });

    // Respond with the user's details and a JWT token if the user was successfully created
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role, // Include role in the response
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
 * Getting user data.
 * @route GET /api/user/me
 * @access Public
 */
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        profilePhoto: user.profilePhoto ? user.profilePhoto.toString('base64') : null,
        role: user.role
    });
});

/**
 * Update user details.
 * This function allows authenticated users to update their personal details such as name, email, password, birthday, and profile photo. 
 * It verifies the user's identity, optionally validates the provided input data, updates the user information in the database, 
 * and returns the updated user details. Password updates are securely handled by hashing before storage.
 * @route PUT /api/user/me
 * @access Private
 */
const updateUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { firstName, lastName, email, password, birthday } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    // Check if the new email is different from the current email
    if (email && email !== user.email) {
        // Check for existing user with the new email
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            res.status(409);
            throw new Error('Email already exists. Please use a different email.');
        }
        user.email = email;
    }
    if (birthday) user.birthday = birthday;

    // If a password is provided, hash it before saving
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    // If a file is uploaded, save the buffer to the user's profilePhoto
    if (req.file) {
        user.profilePhoto = req.file.buffer;
    }

    try {
        await user.save();

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            // Send the profile photo as a base64 string if it exists
            profilePhoto: user.profilePhoto ? user.profilePhoto.toString('base64') : null,
            role: user.role
        });
    } catch (error) {
        // Handle the duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Email already exists. Please use a different email.' });
        } else {
            res.status(500).json({ message: 'An error occurred while updating the profile.' });
        }
    }
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


const getTeachers = asyncHandler(async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' }).select('_id firstName lastName');
        res.json(teachers);
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
});

// Exporting the functions to be used in other parts of the application
module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUserDetails,
    uploadMiddleware,
    getTeachers
};
