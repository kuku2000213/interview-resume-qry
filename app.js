const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const resumesRouter = require('./routes/resumes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1/resumes', resumesRouter);

module.exports = app;