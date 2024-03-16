const mongoose = require('mongoose');

/**
 * @desc
 * This schema defines the outline for courses stored in the MongoDB database. 
 * It includes core information about the course, the instructor, and assignments. 
 * This schema supports the creation and management of courses within the application.
 *
 * - title: The name of the course, used for display and identification.
 * - description: A summary of what the course covers.
 * - instructor: A reference to the User object who is teaching the course.
 * - assignments: An array of references to Assignment objects representing assignments part of the course. 
 */

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a course description'],
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment', 
        }
    ]
});

module.exports = mongoose.model('Course', courseSchema);