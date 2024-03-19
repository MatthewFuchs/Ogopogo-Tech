// Import supertest for making HTTP requests
const request = require('supertest');
// Import your app where you define your API
const app = require('../app'); // Adjust the path to where your Express app is exported

describe('POST /api/courses', () => {
  test('should create a new course and return it', async () => {
    // Define a mock course to add
    const newCourse = {
      name: "Test Course",
      description: "This is a test course",
      instructor: "John Doe"
    };

    // Make a POST request to your endpoint
    const response = await request(app)
      .post('/api/courses')
      .send(newCourse)
      .expect('Content-Type', /json/)
      .expect(201); // Expect a 201 Created status code

    // Check if the response body has the course data
    expect(response.body).toEqual(expect.objectContaining({
      name: expect.any(String),
      description: expect.any(String),
      instructor: expect.any(String)
    }));

    // Optionally, clean up by deleting the created course
    // if your database supports it or if you are using a test database
  });

  // Additional tests for error cases, e.g., missing required fields
});
