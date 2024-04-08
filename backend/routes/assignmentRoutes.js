const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAssignment,
  createAssignment,
  getAllAssignments,
  addQuestionToAssignment,
  deleteAssignment,
  addAnswerToAssignment,
  deleteQuestionAssignment,
  submitAssignment,
  gradeAssignment

} = require('../controller/assignmentController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // This should set the directory to backend/submissions
    cb(null, path.join(__dirname, '../submissions'));
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable with Multer configuration
const upload = multer({
  storage: storage,
  // Add file filter if needed to accept specific types of files
}).single('assignmentFile'); // 'assignmentFile' is the name attribute in the form

/**
 * Route to create a new assignment.
 * This endpoint expects a protected request (user must be authenticated) and allows
 * the creation of a new assignment. The necessary details for the assignment should
 * likely be provided in the request body.   
 * @route POST /api/assignments/
 * @access Private
 */
router.post('/', protect, createAssignment);

/**
 * Route to get a specific assignment by its ID.
 * This endpoint retrieves the details of a specific assignment based on the provided ID 
 * in the URL parameter.
 * @route GET /api/assignments/:id 
 * @access Public (Consider if this should be protected)
 */
router.get('/:id', getAssignment);

/**
 * Route to get all assignments.
 * This endpoint retrieves a list of all assignments (or a paginated list).
 * @route GET /api/assignments/ 
 * @access Private
 */
router.get('/', protect, getAllAssignments);

/**
 * Route to add a question to an assignment.
 * This endpoint modifies an existing assignment by adding a new question to it.
 * The assignment ID is provided in the URL parameter, and the question details
 * should be in the request body.
 * @route PUT /api/assignments/question/:id 
 * @access Private 
 */
router.put('/question/:id', protect, addQuestionToAssignment);

/**
 * Route to add an answer to an assignment question.
 * This endpoint likely modifies an existing assignment question by adding an answer
 * to it. You'll need to determine the structure (assignment ID, question ID ) and
 * how the answer data is transmitted.   
 * @route PUT /api/assignments/answer/:id 
 * @access Private 
 */
router.put('/answer/:id', protect, addAnswerToAssignment);

/**
 * Route to delete an assignment.
 * This endpoint removes an assignment based on its ID in the URL parameter.  
 * @route DELETE /api/assignments/:id 
 * @access Private 
 */
router.delete('/:id', protect, deleteAssignment);

router.delete('/question/:id', protect, deleteQuestionAssignment);

router.put('/submit/:id', protect, submitAssignment);

// Grade an Assignment
router.put('/grade/:id', protect, gradeAssignment);


// Export the router to be mounted by the main application

/**
 * Route to submit an assignment with a file upload.
 * @route POST /api/assignments/submit/:id
 * @access Private
 */
// Route to submit an assignment with a file upload, without authentication for testing.
router.post('/submit/:id', (req, res) => {
  console.log('File upload endpoint hit'); // Log when the endpoint is hit
  upload(req, res, function(err) {
    if(err) {
      console.log('Error during file upload:', err); // Log any error during upload
      return res.status(500).json({ message: 'File upload failed', error: err });
    }
    console.log('File uploaded successfully', req.file); // Log the uploaded file info
    // Proceed with submission processing using req.file and req.body
    submitAssignment(req, res);
  });
});

// Continue with the rest of your routes...

module.exports = router;