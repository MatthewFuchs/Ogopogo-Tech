const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const expect = chai.expect;

const Assignment = require('../../models/assignmentModel'); // Adjust path as necessary

// Start a new in-memory database before running any tests
let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Drop database and close connection after tests
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Test suite for Assignment Model
describe('Assignment Model Tests', () => {
  // Testing creation
  it('Should create a new assignment successfully', async () => {
    const assignmentData = {
      title: "Test Assignment",
      description: "This is a test description",
      // Add other required fields based on your schema
    };

    const assignment = new Assignment(assignmentData);
    const savedAssignment = await assignment.save();

    // Assertions
    expect(savedAssignment._id).to.exist;
    expect(savedAssignment.title).to.equal(assignmentData.title);
  });

  // Add more tests here for validation, updating, deleting, etc.
});
