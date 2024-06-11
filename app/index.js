const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const accessLogStream = require('../config/logger');
require('dotenv').config();
const connectToDb = require('../config/database')

const authRouter = require('./http/routes/auth');

connectToDb();

const app = express();

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/api', function(req, res) {
    res.send('Welcome to MyQuizPal!!! 😎');
  });

app.use(authRouter);

module.exports = app;
