const mongoose = require("mongoose");
const Utilizador = require("../models/utilizador");
const bcrypt = require('bcrypt');

const utilizadorController = {};

utilizadorController.createUtilizador = function (req, res, next) {

    Utilizador.findOne({ nmrCC: req.body.nmrCC }, function (err, utilizador) {
        if (err) {
            next(err);
        } else {
            if (req.body.nmrCC && req.body.password) {
                if (utilizador == null) {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        req.body.password = hash;
                        const newUtilizador = new Utilizador(req.body);
                        newUtilizador.save(function (err) {
                            if (err) {
                                next(err);
                            } else {
                                res.json({ status: "Criado" });
                            }
                        });
                    });
                }
                else {
                    res.json({invalidArguments: 'true'});
                }
            }else{
                res.json({invalidArguments: 'true'});
            }
        }
    });

};


utilizadorController.updateUtilizador = function (req, res, next) {
    Utilizador.findByIdAndUpdate(req.params.utilizadorId, req.body, { new: true },
        function (err, utilizador) {
            if (err) {
                next(err);
            } else {
                res.json(utilizador);
            }
        });
};

utilizadorController.verUtilizador = function (req, res, next) {
    Utilizador.findOne({ _id: req.params.utilizadorId }, function (err, utilizador) {
        if (err) {
            next(err);
        } else {
            res.json(utilizador);
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
            res.json(utilizadores);
        }
    });
}


module.exports = utilizadorController;
