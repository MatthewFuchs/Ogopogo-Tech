const mongoose = require('mongoose');

/**
 * @desc
 * This schema defines the structure for assignments stored in the MongoDB database.
 * Assignments belong to a specific course and are managed by an instructor. 
 * This schema enables the creation, storage, and organization of course assignments.
 *
 * - title: The name of the assignment, used for display and identification.
 * - description: A summary of the assignment's instructions and requirements.
 * - type: The category of the assignment (e.g., "Homework", "Quiz", "Project").
 * - instructorID: A reference to the User object representing the instructor who created the assignment.
 * - courseID: A reference to the Course object to which this assignment belongs.
 * - questions: An array of assignment questions or prompts.
 * - answers: An array to store corresponding answers (depending on assignment type, this might be student answers or model answers). 
 */

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an assignment title'],
    },
    description: {
        type: String,
        required: [true, 'Please add an assignment description'],
    },
    type: {
        type: String,
        required: [true, 'Assignment must be assigned a type'],
    },
    instructorID: {
        type: String,
        ref: 'User',
        required: true
    },
    courseID: {
        type: String,
        ref: 'Course',
        required: true
    },
    questions: [
        {
            type: String,
        }
    ],
    submitted: {
        type: Boolean,
        default: false
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);