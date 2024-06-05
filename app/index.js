const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const accessLogStream = require('../config/logger');

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

const app = express();

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
