const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose'); // Add this line to require mongoose
const Assignment = require('../models/assignmentModel');
const Submission = require('../models/submissionModel');

// @desc    Get Assignment by ID
// @route   GET /api/assignments/:id
// @access  Public
const getAssignment = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const assignment = await Assignment.findById(req.params.id); 

  if (!assignment) {
    res.status(404).json({ message: "Assignment not found" });
  } else {
    res.status(200).json(assignment);  // Change 'assigns' to 'assignment'
  }
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
    // if (assignment.instructorID.toString() !== req.user.id) {
    //   res.status(403); 
    //   throw new Error('Forbidden - You are not the instructor of this assignment');
    // }

    assignment.questions.push(req.body.question); 
    await assignment.save(); // Saves the changes to the database

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
  const assignmentId = req.params.id;
  if (!assignmentId) {
      res.status(400).json({error: 'Please provide an assignment ID'});
      return;
  }

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
      res.status(404).json({error: 'Assignment not found'});
      return;
  }

  if (!req.body.studentID) {
      res.status(400).json({error: 'Please provide a student ID'});
      return;
  }

  if (!req.body.answers || req.body.answers.length === 0) {
      res.status(400).json({error: 'Please provide answers'});
      return;
  }

  const submission = await Submission.create({
      assignment: assignmentId,
      student: req.body.studentID,
      answers: req.body.answers,
  });

  assignment.submissions.push(submission._id);
  await assignment.save();
  res.status(201).json(submission);
});



const getAllSubmissions = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }
  
  res.status(200).json(assignment.submissions); 
});

const getSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id);
  if (!submission) {
    res.status(404);
    throw new Error('Submission not found');
  }
  res.status(200).json(submission);
})

const gradeSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id);
  if (!submission) {
    res.status(404);
    throw new Error('Submission not found');
  }

  if (!req.body.grade) {
    res.status(400);
    throw new Error('Please provide a grade');
  }

  submission.grade = req.body.grade;
  submission.graded = true;
  await submission.save();
  res.status(200).json(submission);
})

module.exports = { getAssignment, createAssignment, getAllAssignments, 
  addQuestionToAssignment, deleteAssignment, 
  deleteQuestionAssignment, submitAssignment, getAllSubmissions, getSubmission, gradeSubmission }; 
