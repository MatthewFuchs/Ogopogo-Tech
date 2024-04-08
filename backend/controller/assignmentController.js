const asyncHandler = require('express-async-handler'); // Provides error handling for async routes
const Assignment = require('../models/assignmentModel'); // Assuming you have an Assignment model

const Grade = require('../models/gradeModel'); // Import the Grade model


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
    if (!req.body.answer) {
        res.status(400);
        throw new Error('Please provide an answer to add!');
      }
  
      if (!req.body.questionNum ) {
        res.status(400);
        throw new Error('Please provide a question number');
      } 
      
      const assignment = await Assignment.findById(req.params.id);
      if (!assignment) {
        res.status(404);
        throw new Error('Assignment not found');
      }
  
      assignment.answers[req.body.questionNum - 1] = req.body.answer;
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

const deleteQuestionAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
        res.status(404);
        throw new Error('Assignment not found');
    }

    assignment.questions.splice(req.body.questionNum, 1);
    assignment.answers.splice(req.body.questionNum, 1);
    await assignment.save();

    res.status(200).json(assignment);
});

const submitAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }

  assignment.submitted = true;
  await assignment.save();
  res.status(200).json(assignment);
});

//  gradeAssignment functionality
// @desc    Grade an Assignment
// @route   PUT /api/assignments/grade/:id
// @access  Private (Instructor or Admin)
const gradeAssignment = asyncHandler(async (req, res) => {
  const { studentID, grade, feedback } = req.body;
  const assignmentID = req.params.id;

  // Check if assignment exists
  const assignmentExists = await Assignment.findById(assignmentID);
  if (!assignmentExists) {
      res.status(404);
      throw new Error('Assignment not found');
  }

  // Create or update the grade
  const gradeDoc = await Grade.findOneAndUpdate(
      { assignmentID, studentID },
      { grade, feedback },
      { new: true, upsert: true } // Upsert option creates the document if it doesn't exist
  );

  res.status(200).json(gradeDoc);
});
module.exports = {
  gradeAssignment,
  getAssignment,
  createAssignment,
  getAllAssignments,
  addQuestionToAssignment,
  deleteAssignment,
  addAnswerToAssignment,
  deleteQuestionAssignment,
  submitAssignment,
};
