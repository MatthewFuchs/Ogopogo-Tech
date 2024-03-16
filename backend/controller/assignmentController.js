const Assignment = require('../models/assignmentModel');
const Course = require('../models/courseModel');

const assignmentController = {
  // Create an assignment associated with a course
  createAssignment: async (req, res) => {
    try {
      const { course: courseId } = req.body;
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          status: 'fail',
          message: 'No course found with that ID'
        });
      }

      const newAssignment = await Assignment.create(req.body);
      course.assignments.push(newAssignment._id);
      await course.save();

      res.status(201).json({
        status: 'success',
        data: { assignment: newAssignment }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error
      });
    }
  },

  // Update an assignment
  updateAssignment: async (req, res) => {
    try {
      const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!assignment) {
        return res.status(404).json({
          status: 'fail',
          message: 'No assignment found with that ID'
        });
      }

      res.status(200).json({
        status: 'success',
        data: { assignment }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error
      });
    }
  },

  // Delete an assignment
  deleteAssignment: async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);

      if (!assignment) {
        return res.status(404).json({
          status: 'fail',
          message: 'No assignment found with that ID'
        });
      }

      await Course.updateMany({ assignments: assignment._id }, { $pull: { assignments: assignment._id } });
      await assignment.remove();

      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error
      });
    }
  }
};

//"read" function
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      status: 'success',
      results: assignments.length,
      data: { assignments }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

module.exports = assignmentController;
