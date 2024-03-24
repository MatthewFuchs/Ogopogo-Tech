const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: Date,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'An assignment must belong to a course']
  }
  // You can add more fields as needed, like questions, status, etc.
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
