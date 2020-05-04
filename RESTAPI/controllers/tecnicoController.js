const mongoose = require("mongoose");
const Tecnico = require("../models/tecnico");

const tecnicoController = {};

tecnicoController.criarTecnico = function (req,res,next) {
    var tecnico = new Tecnico({utilizadorId : req.params.userId});
    tecnico.save(function (err)  {
        if(err) {
            next(err);
        } else {
            res.json(tecnico);
        }
    });
};

module.exports = tecnicoController;
