const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    studentID: {
        type: String,
        ref: 'User',
        required: true
    },
    assignmentID: {
        type: String,
        ref: 'Assignment',
        required: true
    },
    answers: [
        {
            type: String,
        }
    ],
    graded: {
        type: Boolean,
        default: false
    },
    grade: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Submission', submissionSchema);