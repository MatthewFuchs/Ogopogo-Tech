// Import the necessary modules
const request = require('supertest');
const app = require('../../app'); // Adjust the path to your Express app
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Course = require('../models/courseModel-admin'); // Adjust  path to Course model

describe('Course Routes Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear the courses collection before each test
    await Course.deleteMany({});
  });

  test('POST /api/courses - Should create a new course', async () => {
    const courseData = {
      name: 'New Course',
      description: 'This is a test description',
      instructor: 'Instructor Name',
    };

    const response = await request(app)
      .post('/api/courses') // Make sure this matches our endpoint
      .send(courseData)
      .expect(201); // Assuming 201 Created is the expected response status

    // Check if the response body has the course data
    expect(response.body).toEqual(expect.objectContaining({
      name: courseData.name,
      description: courseData.description,
      instructor: courseData.instructor,
    }));

    // Optionally, verify the course was saved in the database
    const course = await Course.findOne({ name: 'New Course' });
    expect(course).toBeTruthy();
    expect(course.name).toBe(courseData.name);
  });

  // Additional tests for error handling, e.g., missing required fields
});
