const mongoose = require('mongoose');

// Enrollment schema defines how enrollment records are stored in MongoDB.
const enrollmentSchema = new mongoose.Schema({
    // References the User model to associate the enrollment with a student or teacher.
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        // Custom validation to check that the user is either a student or a teacher.
        validate: {
            validator: async function(value) {
                const user = await mongoose.model('User').findById(value);
                return user && (user.role === 'student' || user.role === 'teacher');
            },
            message: 'Only students or teachers can enroll in courses.'
        }
    },
    // References the Course model to associate the enrollment with a specific course.
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    // Indicates the enrollment status with allowed values: 'pending', 'accepted', 'denied'.
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'denied'],
        default: 'pending'
    },
    // The 'createdAt' field is automatically managed by mongoose to track creation time.
}, {
    timestamps: true // Enables automatic creation of 'createdAt' and 'updatedAt' fields.
});

// Export the Enrollment model for use elsewhere in the application.
module.exports = mongoose.model('Enrollment', enrollmentSchema);
