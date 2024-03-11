// Required modules for authentication middleware
const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel'); 

/**
 * Middleware to protect routes by verifying a JWT token.
 * This middleware checks if the incoming request has a valid JWT token in the Authorization header.
 * If the token is valid, it extracts the user's ID from the token, retrieves the user from the database
 * (excluding their password), and attaches the user object to the request for use in subsequent routes.
 * If the token is not present, invalid, or expired, it denies access with a 401 Unauthorized response.
 *
 * @param {Object} req - The Express request object, which should include an Authorization header with a Bearer token.
 * @param {Object} res - The Express response object, used to send a response if authorization fails.
 * @param {Function} next - The next middleware function in the stack.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if there is an authorization header and it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token with the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Retrieve the user associated with this token from the database, excluding their password
            req.user = await User.findById(decoded.id).select('-password');

            // Continue to the next middleware with the user attached to the request
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    // If no token was found in the authorization header, deny access
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Export the protect middleware to be used in other parts of the application
module.exports = { protect };
