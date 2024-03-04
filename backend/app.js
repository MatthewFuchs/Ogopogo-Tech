const express = require('express');
const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// MONGO_URI saved in .env file with cluster username and password
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection failed!", err));

app.use(express.json());
app.use('/api/user', require('./routes/userRoutes'));

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

module.exports = app;