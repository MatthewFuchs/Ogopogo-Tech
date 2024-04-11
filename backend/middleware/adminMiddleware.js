const asyncHandler = require('express-async-handler');

// Middleware to restrict access to admin users
const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); 
        throw new Error('Not authorized as an admin');
    }
});

module.exports = { admin };
