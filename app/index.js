const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const accessLogStream = require('../config/logger');
require('dotenv').config();
const connectToDb = require('../config/database')

const indexRouter = require('./http/routes/index');
const usersRouter = require('./http/routes/users');

connectToDb();

const app = express();

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
