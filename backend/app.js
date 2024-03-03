const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));

module.exports = app;