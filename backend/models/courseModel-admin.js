// This is for when admins create a new course.
// Import the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// schema for the 'Course' collection
const courseSchema = new mongoose.Schema({
  // 'name' field for the course's name
  name: {
    type: String, // Specifies the data type as String
    required: true // Makes this field mandatory
  },
  courseID:{
    type: String,
    required: true
  },
  // 'description' field for the course's description
  description: {
    type: String,
    required: true // Makes this field mandatory
  },
  // 'instructor' field for the course's instructor name
  instructor: {
    type: String, // Specifies the data type as String
    required: true 
  },
  students: [{ // New field to store enrolled students
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Course', courseSchema);
