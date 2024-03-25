const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
        validate: {
            validator: async function(value) {
                const user = await mongoose.model('User').findById(value);
                return user && user.role === 'student' || user.role === 'teacher';
            },
            message: 'Only students or teachers can enroll in courses.'
        }
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course' 
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'denied'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);

