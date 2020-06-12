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

//
const fileupload = require('express-fileupload')
app.use(fileupload())

const swaggerUi = require('swagger-ui-express');
const swaggerDocumment = require('./swagger.json');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adminInfos = {
  nmrCC: "admin",
  password: "$2b$10$h01UClLL7v7AYoMD3xVfVeJbbiVxg3tL0ily.u0gglsFS5/WXe8/2",
  primeiroNome: "God",
  ultimoNome: "God"
}
const bcrypt = require('bcrypt');

const Admin = require("./models/admin");
const Utilizador = require("./models/utilizador");
mongoose.connect('mongodb+srv://admin:pawtrabalhopaw2020@cluster0-6uaiy.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => {
    console.log('connection succesful')
    Admin.find(function (err, admins) {
      if (err) {
        console.log(err);
      } else {
        if (admins.length < 1) {
          const newUtilizador = new Utilizador(adminInfos);
          newUtilizador.save(function (err, utilizador) {
            if (err) {
              console.log(err);
            } else {
              const admin = new Admin({utilizadorId : utilizador._id});
              admin.save(function (err)  {
                  if(err) {
                      next(err);
                  } else {
                      console.log("Default Admin created!")
                  }
              });

            }
          });
        }
      }
    })
  })
  .catch((err) => console.error(err));




app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '..','FRONTEND','dist','frontend')));


app.use('/api/utilizador', apiUtilizadorRouter);
app.use('/api/tecnico', apiTecnicoRouter);
app.use('/api/pedido', apiPedidoRouter);
app.use('/api/admin', adminRouter);
app.use('/api', sessionRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumment));
app.use('/api/testes', TesteRouter)

app.use('/*',function(req,res){
  try{
    res.sendFile(path.join(__dirname, '..','FRONTEND','dist','frontend','index.html'));
  } catch(err){
    console.log(err)
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message || 'error');
});



module.exports = app;
