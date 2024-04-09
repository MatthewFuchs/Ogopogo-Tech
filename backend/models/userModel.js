const mongoose = require('mongoose');
/**
 * @desc
 * This schema outlines the structure for user documents within the MongoDB database.
 * It includes essential fields like userId, personal information (firstName, lastName),
 * contact details (email), security (password), and additional attributes like birthday
 * and profilePhoto URL. The schema is designed to support user registration, authentication,
 * and profile management within the application.
 *
 * - note: no user id was added in the schema as mongodb will automatically generate it
 * - firstName, lastName: The user's name, both required for personalization and identification.
 * - email: Used for user login and communication; must be unique to prevent duplicate accounts.
 * - password: Hashed password for user authentication, ensuring security and privacy.
 * - birthday: The user's date of birth
 * - profilePhoto: a buffer was the data type for a profile photo as we are not using a cloud storage 
 *                 service 
 *
 * Each field has validation criteria to ensure data integrity and reliability of the user information.
 */
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    birthday: {
        type: Date,
        required: [true, 'Please add a birthday']
    },
    profilePhoto: {
        type: Buffer, 
        required: false 
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'teacher', 'student'],
    }
});
module.exports = mongoose.model('User', userSchema);