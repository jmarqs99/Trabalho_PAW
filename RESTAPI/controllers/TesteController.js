const mongoose = require("mongoose");
const Teste = require("../models/Teste");
const Pedido = require('../models/pedido');
const Utilizador = require('../models/utilizador');

const TesteController = {};

TesteController.criarTeste = function (req, res, next) {

    if (req.body.pedidoId) {

        Pedido.findById(req.body.pedidoId, function (err, pedido) {

            if (err) {
                next(err)
            } else {
                if (pedido != null && pedido.estadoTeste != "finalizado") {
                    req.body.nmrCC = pedido.nmrCC;

                    const newTeste = new Teste(req.body)

                    newTeste.save(function (err) {
                        if (err) {
                            next(err);
                        } else {
                            /*const data = new Date(req.body.date);
                            Teste.find({date : {"$gte": new Date(data.getFullYear(),data.getMonth(),data.getDate()),
                            "$lt": new Date(data.getFullYear(),data.getMonth(),data.getDate()+1)}}, function(err,teste){
                                console.log(teste)
                            })*/
                            Pedido.findByIdAndUpdate(req.body.pedidoId, { estadoTeste: "agendado" }, { new: true }, function (err, pedido) {
                                res.json(newTeste);
                            })
                        }
                    })
                }
                else {
                    res.status(400).json({ invalidArguments: 'true' });
                }
            }
        })

    }

    else {
        res.status(400).json({ invalidArguments: 'true' });
    }
}

TesteController.verTestes = function (req, res, next) {
    Teste.find(function (err, testes) {
        if (err) {
            next(err)
        } else {

            res.json(testes)

        }
    })
}

TesteController.verTeste = function (req, res, next) {
    Teste.findOne({ _id: req.params.testeId }, function (err, teste) {
        if (err) {
            next(err)
        }
        else {
            res.json(teste)

        }
    })
}

TesteController.updateTeste = function (req, res, next) {
    Teste.findByIdAndUpdate(req.params.testeId, req.body, { new: true },
        function (err, teste) {
            if (err) {
                next(err);
            } else {
                if (req.body.resultadoTeste == "positivo") {
                    console.log("here")
                    Pedido.findByIdAndUpdate(teste.pedidoId, { resultadoTeste: req.body.resultadoTeste, estadoTeste: "finalizado" }, { new: true })
                    Utilizador.findOneAndUpdate({nmrCC : teste.nmrCC}, {estado:"Infetado"}, { new: true })
                } else if (req.body.resultadoTeste == "negatico") {
                    Teste.find({ pedidoId: teste.pedidoId }, function (err, testes) {
                        if (err) { } else {
                            if (testes.length >= 2) {
                                Pedido.findByIdAndUpdate(teste.pedidoId, { resultadoTeste: req.body.resultadoTeste, estadoTeste: "finalizado" })
                                Utilizador.findOneAndUpdate({nmrCC : teste.nmrCC}, {estado:"Saudável"}, { new: true })
                            } else {
                                
                            }
                        }
                    })
                }
                res.json(teste);
            }
        });
}

TesteController.deleteTeste = function (req, res, next) {
    Teste.findOne({ _id: req.params.testeId }, function (err, teste) {
        if (err) {
            next(err);
        } else {
            teste.deleteOne({ _id: req.params.testeId }, function (err) {
                if (err) {
                    next(err);
                } else {

                    res.json({ status: "Done" });
                }
            });
        }
    })
}

TesteController.totalTestesPorDia = function (req, res, next) {


    Teste.find({ dia: req.params.dia }, { mes: req.params.mes }, { ano: req.params.ano }, function (err, teste) {
        if (err) {
            next(err)
        } else {
            res.json(teste.length)
        }
    })

}


TesteController.totalTestesPorPessoa = function (req, res, next) {
    Teste.countDocuments({ nmrCC: req.params.nmrCC }, function (err, count) {
        console.log(count);
        res.json(count)
      });
}


module.exports = TesteController;