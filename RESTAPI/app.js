const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const sessionMiddleware = require('./middlewares/session')

const apiUtilizadorRouter = require('./routes/api/utilizador');
const apiTecnicoRouter = require('./routes/api/tecnico');
const apiPedidoRouter = require('./routes/api/pedido');
const sessionRouter = require('./routes/api/session');
const adminRouter = require('./routes/api/admin');
const TesteRouter = require('./routes/api/Teste')

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocumment = require('./swagger.json');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:pawtrabalhopaw2020@cluster0-6uaiy.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true , useUnifiedTopology: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/utilizador', apiUtilizadorRouter);
app.use('/api/tecnico', apiTecnicoRouter);
app.use('/api/pedido', apiPedidoRouter);
app.use('/api/admin', adminRouter);
app.use('/api', sessionRouter);
app.use('/api-docs',swaggerUi.serve , swaggerUi.setup(swaggerDocumment));
app.use('/api/testes', TesteRouter)

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
  res.send(err.message || 'error');
});

module.exports = app;
