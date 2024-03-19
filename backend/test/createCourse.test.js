const request = require('supertest');
const app = require('../app'); // Adjust this path to the actual location of your Express app
const mongoose = require('mongoose');
const Course = require('../models/courseModel'); // Adjust the path to your Course model

describe('POST /api/courses', () => {
  beforeAll(async () => {
    // If you're using a real database, connect to your test database here
    // Example:
    // await mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Cleanup: Remove any data created during testing and close the DB connection
    await Course.deleteMany(); // Be cautious, ensure this runs against a test database
    await mongoose.connection.close();
  });

  it('should create a new course and return it', async () => {
    const courseData = {
      name: 'Introduction to Testing',
      description: 'A course about writing tests in Jest',
      instructor: 'Jane Doe'
    };

    const response = await request(app)
      .post('/api/courses') // Adjust if your endpoint differs
      .send(courseData)
      .expect(201); // Assuming 201 is the response code for successful creation

    // Check the response contains the course data
    expect(response.body).toEqual(expect.objectContaining({
      name: courseData.name,
      description: courseData.description,
      instructor: courseData.instructor,
    }));

    // Optionally, verify the course was saved in the database
    const savedCourse = await Course.findOne({ name: 'Introduction to Testing' });
    expect(savedCourse).toBeTruthy();
    expect(savedCourse.name).toBe(courseData.name);
  });
});
