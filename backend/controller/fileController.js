// Import necessary modules
const asyncHandler = require('express-async-handler');
const File = require('../models/fileModel');

// fileUpload function
const fileUpload = asyncHandler(async (req, res) => {
    try {
        const fileDocument = await File.create({
          assignment: req.params.assignmentId,
          student: req.user._id, // Make sure this is correctly set up to get the user's ID
          originalName: req.file.originalname,
          storageName: req.file.filename,
          path: req.file.path,
          mimeType: req.file.mimetype,
          size: req.file.size,
          submittedAt: new Date()
        });

        res.status(201).json({
          message: 'File uploaded successfully',
          file: fileDocument
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating file document", error: error });
    }
});

// Controller for fetching all files
const getAllFiles = asyncHandler(async (req, res) => {
  try {
      const files = await File.find({});
      res.status(200).json(files);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving files", error: error });
  }
});

module.exports = { fileUpload, getAllFiles };
