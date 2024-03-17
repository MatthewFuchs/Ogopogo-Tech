const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const assignmentRouter = require('./routes/assignmentRoutes'); // Keep if needed

const app = express();
console.log(process.env.MONGO_URI)
// MONGO_URI saved in .env file with cluster username and password
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection failed!", err));

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Choose the correct CORS policy
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes')); // Keep if needed

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.use(morgan("dev")); // Keep only one call to morgan

// Use the assignmentRouter if it's part of the feature you're working on
app.use('/api/v1/assignments', assignmentRouter); 

module.exports = app;
