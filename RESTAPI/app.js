const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocumment = require('./swagger.json');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:pawtrabalhopaw2020@cluster0-6uaiy.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true , useUnifiedTopology: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouter);

app.use('/api-docs',swaggerUi.serve , swaggerUi.setup(swaggerDocumment));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;