const asyncHandler = require('express-async-handler');

// Middleware to restrict access to admin users
const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, so continue to the next middleware/route handler
    } else {
        res.status(403); // Forbidden
        throw new Error('Not authorized as an admin');
    }
});

module.exports = { admin };
