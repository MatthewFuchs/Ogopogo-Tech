const express = require('express');
const dotenv = require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: '*', // Consider specifying domains in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Database connection
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection failed!", err));

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/courses', require('./routes/courseRoute-admin'));
app.use('/api/enroll', require('./routes/enrollmentRoutes'));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

module.exports = app;
