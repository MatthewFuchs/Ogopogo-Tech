const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const assignmentRouter = require('./routes/assignmentRoutes'); // Included from #87 branch

const app = express();
console.log(process.env.MONGO_URI)
// MONGO_URI saved in .env file with cluster username and password
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection failed!", err));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Retained from main branch
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes')); // Retained from main branch

app.use(morgan("dev"));
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Combination of both branches' CORS configurations
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Included methods from main branch
    credentials: true // Retained from #87 branch
  }));

app.use('/api/v1/assignments', assignmentRouter); // Included from #87 branch

app.get('*', (req, res) => { // Retained from main branch
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  });

module.exports = app;
