const asyncHandler = require('express-async-handler'); // Provides error handling for async routes
const Assignment = require('../models/assignmentModel'); // Assuming you have an Assignment model

// @desc    Get Assignment by ID
// @route   GET /api/assignments/:id
// @access  Public
const getAssignment = asyncHandler(async (req, res) => {
    const assigns = await Assignment.findById(req.params.id); 

    res.status(200).json(assigns); 
});

// @desc    Get all Assignments
// @route   GET /api/assignments/all
// @access  Private (admin only)
const getAllAssignments = asyncHandler(async (req, res) => {
    const assigns = await Assignment.find({}); 

    res.status(200).json(assigns); 
});

// @desc    Create an Assignment
// @route   POST /api/assignments
// @access  Private (Instructor or Admin)
const createAssignment = asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400);
      throw new Error('Please provide a title');
    }

    if (!req.body.description) {
      res.status(400);
      throw new Error('Please provide a description');
    }

    if (!req.body.type) {
      res.status(400);
      throw new Error('Please provide a type');
    }

    if (!req.body.courseID) {
      res.status(400);
      throw new Error('Please provide a course ID');
    }

    // Set the instructor as the logged-in user 
    req.body.instructorID = req.user.id; 

    const assignment = await Assignment.create(req.body); // Creates a new assignment document
    res.status(201).json(assignment); 
});

// @desc    Add Question to Assignment
// @route   PUT /api/assignments/question
// @access  Private (Instructor)
const addQuestionToAssignment = asyncHandler(async (req, res) => {
    if (!req.body.question) {
      res.status(400); 
      throw new Error('Please provide a question to add!');
    }

    const assignment = await Assignment.findById(req.params.id); 
    if (!assignment) {
      res.status(404); 
      throw new Error('Assignment not found');
    }

    // Authorization: Ensure the user is the instructor of the assignment
    if (assignment.instructorID.toString() !== req.user.id) {
      res.status(403); 
      throw new Error('Forbidden - You are not the instructor of this assignment');
    }

    assignment.questions.push(req.body.question); 
    assignment.answers.push(""); // Adds a new question and a placeholder answer
    await assignment.save(); // Saves the changes to the database

    res.status(201).json(assignment); 
});

// @desc    Add Answer to Assignment
// @route   PUT /api/assignments/answer/:id
// @access  Private 
const addAnswerToAssignment = asyncHandler(async (req, res) => {
    if (!req.body.answer || !req.body.questionNum || req.body.questionNum == 0) {
        res.status(400);
        throw new Error('Please provide an answer to add!');
      }
      
      const assignment = await Assignment.findById(req.params.id);
      if (!assignment) {
        res.status(404);
        throw new Error('Assignment not found');
      }
  
      assignment.answers[req.body.questionNum] = req.body.answer;
      await assignment.save();
      
      res.status(201).json(assignment);
});

// @desc    Delete an Assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Instructor or Admin)
const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
        res.status(404);
        throw new Error('Assignment not found');
    }

    // Not needed as only admins will have access to delete assignment
    // if (assignment.instructorID.toString() !== req.user.id) {
    //     res.status(403); // Forbidden status
    //     throw new Error('Forbidden - You are not the instructor of this assignment');
    //   }

    await assignment.deleteOne(); 
    res.status(200).json({ id: req.params.id }); 
});

module.exports = { getAssignment, createAssignment, getAllAssignments, addQuestionToAssignment, deleteAssignment, addAnswerToAssignment }; 
