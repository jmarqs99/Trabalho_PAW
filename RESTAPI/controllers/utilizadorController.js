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

utilizadorController.verUtilizador = function(req,res,next){
    Utilizador.findOne({_id:req.params.utilizadorId},function (err, utilizador) {
            if (err) {
                next(err);
            } else {
                res.json(utilizador);
            }
        });
};

utilizadorController.verUtilizadorInterno = function(id,user){
    Utilizador.findOne({_id:id},function (err, utilizador) {
        if (err) {
            user(null);
        } else {
            user(utilizador);
        }
     });
};


module.exports = utilizadorController;
