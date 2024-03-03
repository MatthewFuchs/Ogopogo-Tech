const express = require('express');
const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use('/api/user', require('./routes/userRoutes'));

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

module.exports = app;