const express = require('express');
const assignmentController = require('../controller/assignmentController');
const router = express.Router();

// POST request for creating an assignment
router.post('/', (req, res) => {
    assignmentController.createAssignment(req, res, () => {
        // After the assignment is created, redirect to the assignments list page
        // Adjust the path according to where your 'assignments-list.html' is served
        res.redirect('/assignments-list.html');
    });
});

// GET request for fetching all assignments
router.get('/', assignmentController.getAssignments);

// PATCH request for updating an assignment by id
router.patch('/:id', assignmentController.updateAssignment);

// DELETE request for deleting an assignment by id
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;