// Import supertest for making HTTP requests
const request = require('supertest');
// Assuming your Express app is exported in app.js
const app = require('../app');

describe('Course Creation Tests', () => {
  test('POST /api/courseRoute-admin/ - Create a Course', async () => {
    const courseData = {
      name: "Intro to Testing",
      courseID: "TEST101",
      description: "A basic course on testing methods",
      instructor: "Jane Doe"
    };

    const response = await request(app)
      .post('/api/courseRoute-admin/')
      .send(courseData)
      .expect('Content-Type', /json/)
      .expect(201);

    // Add more assertions here as needed
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(courseData.name);
    expect(response.body.courseID).toEqual(courseData.courseID);
    expect(response.body.description).toEqual(courseData.description);
    expect(response.body.instructor).toEqual(courseData.instructor);
  });
});
