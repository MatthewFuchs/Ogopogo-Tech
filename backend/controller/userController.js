const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/user
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const {firstName, lastName, email, password, birthday} = req.body;
    // Check for missing field
    if(!firstName || !lastName || !email || !password || !birthday){
        // bad request status code
        res.status(400);
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    // Create user
    const user = await User.create({
        role:"student",
        firstName,
        lastName,
        email,
        password,
        birthday,
    });

    // if user was created
    if (user) {
        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.json({message: 'register user'})
});

// @desc Authenticate a user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    res.json({message: 'login user'})
});

// @desc Get user data
// @route GET /api/user/me
// @access Public
const getMe = asyncHandler( async (req, res) => {
    res.json({message: 'User data display'})
});

module.exports = {
    registerUser,
    loginUser,
    getMe
};