const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Update the path to where your Express app is initialized

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

describe('Assignment Controller Tests', () => {
  test('Should create a new assignment', async () => {
    const assignmentData = {
      title: 'Integration Test Assignment',
      description: 'This is created during an integration test',
      // Include other required fields
    };

    const response = await request(app)
      .post('/api/assignments') // Adjust your API endpoint accordingly
      .send(assignmentData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.assignment.title).toBe(assignmentData.title);
  });

  // Additional tests here for GET, PATCH, DELETE
});
