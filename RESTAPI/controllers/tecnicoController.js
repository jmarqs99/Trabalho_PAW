const mongoose = require("mongoose");
const Tecnico = require("../models/tecnico");
const utilizadorController = require("./utilizadorController");

const tecnicoController = {};

tecnicoController.criarTecnico = function (req,res,next) {
    utilizadorController.verUtilizadorInterno(req.params.userId,function(utilizador){
        if (utilizador){
            var tecnico = new Tecnico({utilizadorId : req.params.userId});
            tecnico.save(function (err)  {
                if(err) {
                    next(err);
                } else {
                    res.json(tecnico);
                }
            });
        } else {
            res.json({userDontExist:true});
        }
    });   
};

tecnicoController.removerTecnico = function (req,res,next) {
    Tecnico.deleteOne({_id:req.params.tecnicoID},function (err)  {
        if(err) {
            next(err);
        } else {
            res.json({status:"Done"});
        }
      });
};

tecnicoController.verTecnico = async function (req,res,next) {
    Tecnico.findOne({_id:req.params.tecnicoID},function (err,tecnico)  {
        if(err) {
            next(err);
        } else {
            if (tecnico != null){
                utilizadorController.verUtilizadorInterno(tecnico.utilizadorId,function(utilizador){
                    const result = tecnico.toObject();
                    result.primeiroNome = utilizador.primeiroNome;
                    result.ultimoNome = utilizador.ultimoNome;
                    result.estado = utilizador.estado;
                    res.json(result);
                })
                
            } else {
                res.json({tecnicoDontExist:true});
            }
        }
     });
};

tecnicoController.verTecnicos = async function (req,res,next) {
    Tecnico.find(function (err,tecnicos)  {
        if(err) {
            next(err);
        } else {
            const result = tecnicos;

            new Promise((resolve, reject) => {
                result.forEach(function(item,index){
                    result[index] = result[index].toObject();
                    utilizadorController.verUtilizadorInterno(item.utilizadorId,function(utilizador){
                        result[index].primeiroNome = utilizador.primeiroNome;
                        result[index].ultimoNome = utilizador.ultimoNome;
                        result[index].estado = utilizador.estado;
                        if (index === result.length -1) resolve();
                    })
                })
            }).then(() => {
                res.json(result)
            });

        }
     });
};

module.exports = tecnicoController;
