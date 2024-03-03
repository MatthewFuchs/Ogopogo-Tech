const request = require('supertest');
const app = require('../app.js'); 

describe('User Routes', () => {
    test('GET /api/user', async () => {
        const response = await request(app).get('/api/user');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Get user'});
    });

    test('POST /api/user', async () => {
        const response = await request(app)
            .post('/api/user')
            // sample data send
            .send({name: 'John Doe', email: 'john@example.com'}); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Create user'});
    });

    test('PUT /api/user/:id', async () => {
        // sample id set as 1 for testing purposes
        const response = await request(app).put('/api/user/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Update user 1'});
    });

    test('DELETE /api/user/:id', async () => {
        // sample id set as 1 for testing purposes
        const response = await request(app).delete('/api/user/1'); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Delete user 1'});
    });
});
