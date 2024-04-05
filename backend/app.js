const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); 

// Create the submissions directory if it doesn't exist
const submissionsDir = path.join(__dirname, 'submissions'); // Use path.join for proper path resolution

if (!fs.existsSync(submissionsDir)){
    fs.mkdirSync(submissionsDir, { recursive: true });
}

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env' });
} else {
  require('dotenv').config({ path: '../.env' });
}

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
    origin: '*', // Allow all origins to access
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow sending of cookies and authentication headers
  }));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes')); 

//courses route
const courseRoutes = require('./routes/courseRoute-admin');
app.use('/api/courses', courseRoutes);

app.use('/api/enroll', require('./routes/enrollmentRoutes'));

app.get('*', (req, res) => {
  app.use(express.static(path.join(__dirname, '../frontend')));
});
app.use(morgan("dev"));

module.exports = app;

