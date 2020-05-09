const mongoose = require("mongoose");
const Admin = require("../models/admin");
const utilizadorController = require("./utilizadorController");

const adminController = {};

adminController.criarAdmin = function (req,res,next) {
    utilizadorController.verUtilizadorInterno(req.params.userId,function(utilizador){
        if (utilizador){
            var admin = new Admin({utilizadorId : req.params.userId});
            admin.save(function (err)  {
                if(err) {
                    next(err);
                } else {
                    utilizadorController.updateUtilizadorInterno(req.params.userId,{changed:true})
                    res.json(admin);
                }
            });
        } else {
            res.json({userDontExist:true});
        }
    });   
};

adminController.removerAdmin = function (req,res,next) {
    Admin.findOne({_id:req.params.adminID},function (err,admin)  {
        if(err) {
            next(err);
        } else {
            Admin.deleteOne({_id:req.params.adminID},function (err)  {
                if(err) {
                    next(err);
                } else {
                    utilizadorController.updateUtilizadorInterno(admin.utilizadorId,{changed:true})
                    res.json({status:"Done"});
                }
            });
        }
    });
};

adminController.verAdmin = async function (req,res,next) {
    Admin.findOne({_id:req.params.adminID},function (err,admin)  {
        if(err) {
            next(err);
        } else {
            if (admin != null){
                utilizadorController.verUtilizadorInterno(admin.utilizadorId,function(utilizador){
                    const result = admin.toObject();
                    result.primeiroNome = utilizador.primeiroNome;
                    result.ultimoNome = utilizador.ultimoNome;
                    result.estado = utilizador.estado;
                    res.json(result);
                })
                
            } else {
                res.json({adminDontExist:true});
            }
        }
     });
};

adminController.verAdmins = function (req,res,next) {
    Admin.find(function (err,admins)  {
        if(err) {
            next(err);
        } else {
            if (admins.length > 0){
                const result = admins;
                new Promise((resolve, reject) => {
                    result.forEach(function(item,index){
                        result[index] = result[index].toObject();
                        utilizadorController.verUtilizadorInterno(item.utilizadorId,function(utilizador){
                            console.log(utilizador);
                            result[index].primeiroNome = utilizador.primeiroNome;
                            result[index].ultimoNome = utilizador.ultimoNome;
                            result[index].estado = utilizador.estado;
                            if (index === result.length -1) resolve();
                        })
                    })
                }).then(() => {
                    res.json(result)
                });
            } else {
                res.json(admins);
            }


        }
     });
};

module.exports = adminController;
