// models/gradeModel.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    assignmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    feedback: String,
    gradedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Grade', gradeSchema);
