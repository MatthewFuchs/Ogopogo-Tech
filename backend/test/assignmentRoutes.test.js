const request = require('supertest');
const app = require('../app.js');
const dotenv = require('dotenv').config({path: '../.env'});

describe('Assignment Routes', () => {
    let adminToken = process.env.TEST_BEARER_TOKEN; 

    test('POST /api/assignments (create)', async () => {
        const response = await request(app)
            .post('/api/assignments')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                "title":"Test Assignment", 
                "description":"Test Description", 
                "type":"multiquestion",
                "courseID":"TEST101"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('assignmentId');
    });

    test('GET /api/assignments/:id (get)', async () => {
        const response = await request(app)
            .get('/api/assignments/assignmentId')

        expect(response.statusCode).toBe(200);
    });

    test('GET /api/assignments (getAll)', async () => {
        const response = await request(app)
            .get('/api/assignments')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);
    });

    test('PUT /api/assignments/question/:id (addQuestion)', async () => {
        const updateResponse = await request(app)
            .put('/api/assignments/question/assignmentId')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                "question": "Test Question 1",
            });

        expect(updateResponse.statusCode).toBe(200);
    });

    test('PUT /api/assignments/answer/:id (addAnswer)', async () => {
        const updateResponse = await request(app)
            .put('/api/assignments/answer/questionId')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                "answer": "Test Answer 1",
                "questionNum": 0
            });

        expect(updateResponse.statusCode).toBe(200);
    });

    test('DELETE /api/assignments/:id (delete)', async () => {
        const deleteResponse = await request(app)
            .delete('/api/assignments/assignmentId')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(deleteResponse.statusCode).toBe(200);
    });
});