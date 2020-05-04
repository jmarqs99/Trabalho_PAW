const mongoose = require("mongoose");
const Utilizador = require("../models/utilizador");

const utilizadorController = {};

utilizadorController.createUtilizador = function (req, res, next) {
    const utilizador = new Utilizador(req.body);

    utilizador.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(utilizador);
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

utilizadorController.verPerfil = function(req,res,next){
    Utilizador.findById(req.params.utilizadorId, req.body, { new: true },
        function (err, utilizador) {
            if (err) {
                next(err);
            } else {
                res.json(utilizador);
            }
        });
};


module.exports = utilizadorController;
