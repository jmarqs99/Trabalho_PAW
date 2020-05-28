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
                    utilizadorController.updateUtilizadorInterno(req.params.userId,{changed:true})
                    res.status(201).json(tecnico);
                }
            });
        } else {
            res.status(400).json({userDontExist:true});
        }
    });   
};

tecnicoController.removerTecnico = function (req,res,next) {
    Tecnico.findOne({_id:req.params.tecnicoID},function (err,tecnico)  {
        if(err) {
            next(err);
        } else {
            Tecnico.deleteOne({_id:req.params.tecnicoID},function (err)  {
                if(err) {
                    next(err);
                } else {
                    utilizadorController.updateUtilizadorInterno(tecnico.utilizadorId,{changed:true})
                    res.status(200).json({status:"Done"});
                }
            });
        }
    });
};

tecnicoController.verTecnico = async function (req,res,next) {
    Tecnico.findOne({ _id : req.params.tecnicoID},function (err,tecnico)  {
        if(err) {
            next(err);
        } else {
            if (tecnico != null){
                utilizadorController.verUtilizadorInterno(tecnico.utilizadorId,function(utilizador){
                    const result = tecnico.toObject();
                    result.primeiroNome = utilizador.primeiroNome;
                    result.ultimoNome = utilizador.ultimoNome;
                    result.estado = utilizador.estado;
                    res.status(200).json(result);
                })
                
            } else {
                res.status(400).json({tecnicoDontExist:true});
            }
        }
     });
};

tecnicoController.verTecnicos = function (req,res,next) {
    Tecnico.find(function (err,tecnicos)  {
        if(err) {
            next(err);
        } else {
            const result = tecnicos;
            if (result.length >= 1){
                new Promise((resolve, reject) => {
                    let done = 0;
                    result.forEach(function(item,index){
                        result[index] = result[index].toObject();
                        utilizadorController.verUtilizadorInterno(item.utilizadorId,function(utilizador){
                            result[index].primeiroNome = utilizador.primeiroNome;
                            result[index].ultimoNome = utilizador.ultimoNome;
                            result[index].estado = utilizador.estado;
                            done++;
                            if (done == result.length) resolve();
                        })
                    })
                }).then(() => {
                    res.status(200).json(result)
                });
            } else {
                res.status(200).json(result);
            }

        }
     });
};

module.exports = tecnicoController;
