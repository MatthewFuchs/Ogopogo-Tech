const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const assignmentRouter = require('./routes/assignmentRoutes'); 

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
    origin: 'http://127.0.0.1:5500', // Allow only this origin to access
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow sending of cookies and authentication headers
  }));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes')); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  });
app.use(morgan("dev"));
app.use('/api/v1/assignments', assignmentRouter); 

//courses route

const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);



module.exports = app;

