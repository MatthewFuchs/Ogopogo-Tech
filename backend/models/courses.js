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
  // 'description' field for the course's description
  description: {
    type: String,
    required: true // Makes this field mandatory
  },
  // 'instructor' field for the course's instructor name
  instructor: {
    type: String, // Specifies the data type as String
    required: true 
  }
  // Note: In this simplified schema, the instructor is stored as a string.
  // In a more complex application, it might be stored as an ObjectId that references an instructor document in like a users collection.
});

module.exports = mongoose.model('Course', courseSchema);
