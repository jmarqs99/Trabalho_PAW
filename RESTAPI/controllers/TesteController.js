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

                    const data = new Date(req.body.date);
                    Teste.countDocuments({
                        date: {
                            "$gte": new Date(data.getFullYear(), data.getMonth(), data.getDate()),
                            "$lt": new Date(data.getFullYear(), data.getMonth(), data.getDate() + 1)
                        }
                    }, function (err, teste) {
                        if (teste < 8) {
                            const newTeste = new Teste(req.body)
                            newTeste.save(function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    Pedido.findByIdAndUpdate(req.body.pedidoId, { estadoTeste: "agendado" }, { new: true }, function (err, pedido) {
                                        res.json(newTeste);
                                    })
                                }
                            })
                        } else {
                            res.status(400).json({ dayFull: 'true' });
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
    if (req.body.resultadoTeste) {
        req.body.estadoTeste = "Finalizado"
    }
    Teste.findByIdAndUpdate(req.params.testeId, req.body, { new: true },
        function (err, teste) {
            if (err) {
                next(err);
            } else {
                if (req.body.resultadoTeste == "positivo") {
                    Pedido.findByIdAndUpdate(teste.pedidoId, { resultadoTeste: req.body.resultadoTeste, estadoTeste: "finalizado", estadoUtilizador: "Infetado" }, { new: true }, function (err) {
                        if (err) { console.log(err) }
                    })
                    Utilizador.findOneAndUpdate({ nmrCC: teste.nmrCC }, { estado: "Infetado" }, { new: true }, function (err, teste) {
                        if (err) { console.log(err) }
                    })
                } else if (req.body.resultadoTeste == "negativo") {
                    Teste.countDocuments({ pedidoId: teste.pedidoId }, function (err, testesCount) {
                        if (err) { } else {
                            if (testesCount >= 2) {
                                Pedido.findByIdAndUpdate(teste.pedidoId, { resultadoTeste: req.body.resultadoTeste, estadoTeste: "finalizado", estadoUtilizador: "Saudável" })
                                Utilizador.findOneAndUpdate({ nmrCC: teste.nmrCC }, { estado: "Saudável" }, { new: true })
                            } else {
                                var today = new Date();
                                today.setDate(today.getDate() + 1);
                                if (Math.abs(today - new Date(teste.date)) / (1000 * 60 * 60 * 24) < 2.0) {
                                    today = new Date(teste.date)
                                    today.setDate(today.getDate() + 3);
                                }
                                Teste.find({
                                    date: {
                                        "$gte": new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                                        "$lt": new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
                                    }
                                }, function (err, testes) {
                                    if (err) {
                                        next(err)
                                    } else {
                                        if (testes.length < 8) {
                                            let usedHours = [];
                                            testes.forEach(function (teste, index) {
                                                usedHours.push(new Date(teste.date).getHours());
                                            })
                                            if (testes.length != 0) {
                                                for (let h = 8; h < 17; h++) {
                                                    if (usedHours.find(element => element != h)) {
                                                        today.setHours(h, 0, 0, 0);
                                                        const newTeste = new Teste({ nmrCC: teste.nmrCC, pedidoId: teste.pedidoId, date: today });
                                                        newTeste.save(function (err) {
                                                            if (err) {
                                                                next(err);
                                                            } else {
                                                                res.status(200);
                                                            }
                                                        })
                                                        break;
                                                    }
                                                }
                                            } else {
                                                today.setHours(8, 0, 0, 0);
                                                const newTeste = new Teste({ nmrCC: teste.nmrCC, pedidoId: teste.pedidoId, date: today });
                                                newTeste.save(function (err) {
                                                    if (err) {
                                                        next(err);
                                                    } else {
                                                        res.status(200);
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
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

TesteController.totalTestesPorPessoa = function (req, res, next) {
    Teste.countDocuments({ nmrCC: req.params.nmrCC }, function (err, count) {
        res.json(count);
    });
}


TesteController.testePorDia = function (req, res, next) {
    const data = new Date(req.params.data);
    const nextDate = new Date(req.params.data)
    data.setHours(0, 0, 0, 0);
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    Teste.countDocuments({
        date: {
            "$gte": data,
            "$lt": nextDate
        }
    }, function (err, count) {
        res.json(count);
    });
}

module.exports = TesteController;