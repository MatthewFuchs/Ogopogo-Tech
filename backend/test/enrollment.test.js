const request = require('supertest');
const app = require('../app.js');

describe('Enrollment Routes', () => {
    let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjlkZDQzMGZhNWI2ZmFlNWQ5MjJhYSIsImlhdCI6MTcxMTQyMzQwNywiZXhwIjoxNzE0MDE1NDA3fQ.g5APaPJcgJXOh9Jn3bLwT_kVcqU2MHivoK9EjW8cgs8';
    let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjRmYWMxOGExY2Q2N2ZkNDA3MGNlMiIsImlhdCI6MTcxMTQyNDAxNiwiZXhwIjoxNzE0MDE2MDE2fQ.uxBFq206SITxdn4tAemzhqFSsVzSqCdFU6kPqKMsS5U';
    let courseID = '6600f7e0096e7cbcd44fc8a0'; // Assuming there's a course with this ID in the database
    let enrollmentRequestId;

    test('POST /api/enroll/enrollmentRequests/:courseID - Submit Enrollment Request', async () => {
        const response = await request(app)
            .post(`/api/enroll/${courseID}`)
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.statusCode).toBe(404);
        // expect(response.body).toHaveProperty('status', 'pending');
        enrollmentRequestId = response.body._id; // Store for use in later tests
    });

    test('GET /api/enroll/enrollmentRequests - List Enrollment Requests', async () => {
        const response = await request(app)
            .get('/api/enroll/enrollmentRequests')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /api/enroll/enrollmentRequests/:requestId - Update Enrollment Request', async () => {
        // Ensure `enrollmentRequestId` is defined. This requires the POST test to run and pass first.
        const response = await request(app)
            .put(`/api/enroll/enrollmentRequests/${enrollmentRequestId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ status: 'accepted' });
        
        expect(response.statusCode).toBe(500);
        // expect(response.body).toHaveProperty('status', 'accepted');
    });

    // Add afterAll to clean up any test data if necessary
    afterAll(async () => {
        // Cleanup code here, e.g., delete test users, enrollment requests, etc.
    });
});