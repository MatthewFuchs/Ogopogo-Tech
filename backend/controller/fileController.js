// Import necessary modules
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const File = require('../models/fileModel');

// Set up multer for file storage
const storage = multer.diskStorage({
  // storage configuration
});

const upload = multer({ storage: storage }).single('assignmentFile');

// fileUpload function
const fileUpload = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer error
    } else if (err) {
      // Handle other errors
    } else {
      // No errors, proceed with file document creation
      try {
        const fileDocument = await File.create({
          assignment: req.params.assignmentId, // Assuming assignmentId is in the URL
          student: req.user._id, // Assuming the student ID is available in the session
          originalName: req.file.originalname,
          storageName: req.file.filename,
          path: req.file.path,
          mimeType: req.file.mimetype,
          size: req.file.size,
          submittedAt: new Date() // or use Date.now()
        });

        res.status(201).json({
          message: 'File uploaded successfully',
          file: fileDocument
        });
      } catch (error) {
        // Handle errors during document creation
        res.status(500).json({ message: "Error creating file document", error: error });
      }
    }
  });
});

// Controller for fetching all files
const getAllFiles = asyncHandler(async (req, res) => {
  try {
      const files = await File.find({}); // Fetch all files from the database
      res.status(200).json(files);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving files", error: error });
  }
});
// Export the new controller function
module.exports = { fileUpload, getAllFiles };
