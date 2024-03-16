const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Adjust the path to your Express application

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Assignment Routes Tests', () => {
  test('POST /api/assignments should create an assignment', async () => {
    const assignmentData = {
      title: 'New Assignment',
      description: 'This is a test assignment.',
      // Add other fields as necessary
    };
    
    const response = await request(app)
      .post('/api/assignments') // Adjust your API path accordingly
      .send(assignmentData);
      
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    // Add more assertions as necessary
  });

  test('GET /api/assignments should return all assignments', async () => {
    const response = await request(app)
      .get('/api/assignments'); // Adjust your API path accordingly
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    // Depending on your implementation, you might want to check the length of the data array
    // expect(response.body.data.assignments).toHaveLength(expectedLength);
  });

  // Add more tests for other endpoints (PATCH, DELETE) as necessary
});
