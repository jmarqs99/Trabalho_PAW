const mongoose = require("mongoose");
const Utilizador = require("../models/utilizador");
const bcrypt = require('bcrypt');

const utilizadorController = {};

utilizadorController.createUtilizador = function (req, res, next) {
  console.log(req.body);
  if (
    req.body.nmrCC &&
    req.body.password &&
    req.body.primeiroNome &&
    req.body.ultimoNome
  ) {
    Utilizador.findOne({ nmrCC: req.body.nmrCC }, function (err, utilizador) {
      if (err) {
        next(err);
      } else {
        if (utilizador === null) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            req.body.password = hash;
            const newUtilizador = new Utilizador(req.body);
            newUtilizador.save(function (err) {
              if (err) {
                next(err);
              } else {
                res.status(201).json({ userCreated: 'true' });
              }
            });
          });
        } else {
          res.status(400).json({ userAlreadyExits: 'true' });
        }
      }
    });
  } else {
    res.status(400).json({ invalidArguments: 'true' });
  }
};

utilizadorController.updateUtilizador = function (req, res, next) {
  Utilizador.findByIdAndUpdate(req.params.utilizadorId, req.body, { new: true },
    function (err, utilizador) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(utilizador);
      }
    });
};

utilizadorController.updateUtilizadorInterno = function (id, update) {
  Utilizador.findByIdAndUpdate(id, update, { new: true },
    function (err, utilizador) {
      if (err) {
        next(err);
      }
    });
};

utilizadorController.verUtilizador = function (req, res, next) {
  Utilizador.findOne({ _id: req.params.utilizadorId }, function (err, utilizador) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(utilizador);
    }
  });
};

utilizadorController.verUtilizadorInterno = function (id, user) {
  Utilizador.findOne({ _id: id }, function (err, utilizador) {
    if (err) {
      user(null);
    } else {
      user(utilizador);
    }
  });
};

utilizadorController.verTodosUtilizadores = function (req, res, next) {
  Utilizador.find(function (err, utilizadores) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(utilizadores);
    }
  });
}

/* TesteController.totalTestesPorPessoa = function (req, res, next) {
  Teste.countDocuments({ nmrCC: req.params.nmrCC }, function (err, count) {
      console.log(count);
      res.json(count)
    });
}
 */

/*utilizadorController.numeroInfetados = function (req, res, next) {
  console.log("got to controller")
  Utilizador.countDocuments({ estado: 'Infetado' }, function (err, count) {
    console.log("here",count)
    res.status(200).json(count);
  })

 
}*/

utilizadorController.numeroInfetados = function (req, res, next) {
  Utilizador.countDocuments({ estado: 'Infetado' }, function (err, count) {
    if(err) {} else {
    res.status(200).json(count);
    }
  })
}

module.exports = utilizadorController;
