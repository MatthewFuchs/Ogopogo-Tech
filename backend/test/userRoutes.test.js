const request = require('supertest');
const app = require('../app.js');

// Describe block defines a test suite for User Routes
describe('User Routes', () => {
    // user token for authenticated requests
    let userToken; 

    // Test for user registration
    test('POST /api/user (register)', async () => {
        // Sends a POST request to the registration endpoint with sample user data
        const response = await request(app)
            .post('/api/user')
            .send({
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@example.com',
                password: 'password123',
                birthday: '1990-01-01'
            });
        
        // Checks if the status code of the response is 201 (Created)
        expect(response.statusCode).toBe(201);
        // Check if response body includes a token
        expect(response.body).toHaveProperty('token');

        // Stores the token 
        userToken = response.body.token; 
    });

    // Test for user login
    test('POST /api/user/login', async () => {
        // Sends a POST request to the login endpoint with the credentials of the previously registered user
        const response = await request(app)
            .post('/api/user/login') 
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        
        // Checks if the status code of the response is 200 (OK)
        expect(response.statusCode).toBe(200);
        // Verifies the response body includes a token
        expect(response.body).toHaveProperty('token');

        // Optionally updates the userToken with the new token from login
        userToken = response.body.token;
    });

    // Test for retrieving the current user's profile information
    test('GET /api/user/me (requires auth)', async () => {
        // Sends a GET request to the user profile endpoint, including the Authorization header with the token
        const response = await request(app)
            .get('/api/user/me')
            // Uses the token for authentication
            .set('Authorization', `Bearer ${userToken}`); 
        
        // Checks if the status code of the response is 200 (OK)
        expect(response.statusCode).toBe(200);
        // Verifies the response includes a the placeholder message
        expect(response.body).toHaveProperty('message', 'User data display');
    });
});
