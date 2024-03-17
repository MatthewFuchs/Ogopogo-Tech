const express = require('express');
const assignmentController = require('../controller/assignmentController');
const router = express.Router();

// POST request for creating an assignment
router.post('/', assignmentController.createAssignment);

// GET request for fetching all assignments
router.get('/', assignmentController.getAssignments);

// PATCH request for updating an assignment by id
router.patch('/:id', assignmentController.updateAssignment);

// DELETE request for deleting an assignment by id
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;