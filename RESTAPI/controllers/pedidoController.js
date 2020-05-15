const mongoose = require("mongoose");
const Pedido = require("../models/pedido");


const pedidoController = {};



pedidoController.criarPedido = function (req, res, next) {
    if (req.body.nmrCC && req.body.informacao && req.body.estadoUtilizador) {
        Pedido.findOne({ _id: req.body.pedidoId }, function (err, pedido) {
            if (err) {
                next(err);
            } else {

                if (pedido == null) {
                    const newPedido = new Pedido(req.body)

                    newPedido.save(function (err) {
                        if (err) {
                            next(err);
                        } else {
                            res.json(newPedido);
                        }
                    })
                }
                else {
                    res.status(400).json({ invalidArguments: 'true' });
                }

            }
        });
    }
    else {
        res.status(400).json({ invalidArguments: 'true' });
    }
};


pedidoController.updatePedido = function (req, res, next) {

    Pedido.findByIdAndUpdate(req.params.pedidoId, req.body, { new: true },
        function (err, pedido) {
            if (err) {
                next(err);
            } else {
                res.json(pedido);
            }
        });
}
pedidoController.updateUpload = function (req, res, next) {
    const file = req.files.pdf
    if (file){
    Pedido.findByIdAndUpdate(req.params.pedidoId, { havePDF: true }, { new: true },
        function (err, pedido) {
            if (err) {
                next(err);
            } else {
                file.mv('uploads/' + req.params.pedidoId, function (err, result) {
                    if (err) {
                        next(err)
                    }
                    else {
                        res.status(200).send({
                            success: true,
                            message: "file uploaded"
                        })
                    }
                })
            }
        });
    } else {
        res.status(400).send({
            invalidFile: true
        })
    }
}


pedidoController.getAllPedidos = function (req, res, next) {
    Pedido.find(function (err, pedidos) {
        if (err) {
            next(err)
        } else {

            res.json(pedidos)

        }
    })
}



pedidoController.getOnePedido = function (req, res, next) {

    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)

        }
    })

}
pedidoController.Resultados = function (req, res, next) {
    Pedido.find({ resultadoTeste: req.params.resultado }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)
        }
    })
}


pedidoController.EstadosTeste = function (req, res, next) {
    Pedido.find({ estadoTeste: req.params.estadoTeste }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)
        }
    })
}

pedidoController.EstadosUser = function (req, res, next) {
    Pedido.find({ estadoUtilizador: req.params.estadoUtilizador }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)
        }
    })
}

pedidoController.informacao = function (req, res, next) {
    Pedido.find({ informacao: req.params.informacao }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)
        }
    })
}

pedidoController.cc = function (req, res, next) {
    Pedido.find({ nmrCC: req.params.nmrCC }, function (err, pedido) {
        if (err) {
            next(err)
        } else {
            res.json(pedido)
        }
    })
}



pedidoController.getOnePedidoByEstadoTeste = async function (req, res, next) {


    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err);
        } else {

            const result = pedido.toObject();
            result.informacao = Pedido.informacao
            result.estadoUtilizador = Pedido.estadoUtilizador
            result.resultadoTeste = Pedido.resultadoTeste

            res.json(result);



        }
    });
};
pedidoController.getOnePedidoByResultado = async function (req, res, next) {
    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err);
        } else {

            const result = pedido.toObject();
            result.informacao = Pedido.informacao
            result.estadoUtilizador = Pedido.estadoUtilizador
            result.estadoTeste = Pedido.estadoTeste

            res.json(result);



        }
    });
};

pedidoController.getOnePedidoByEstadoUtilizador = async function (req, res, next) {
    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err);
        } else {

            const result = pedido.toObject();
            result.informacao = Pedido.informacao
            result.resultadoTeste = Pedido.resultadoTeste
            result.estadoTeste = Pedido.estadoTeste

            res.json(result);



        }
    });
};

pedidoController.getOnePedidoByInformacao = async function (req, res, next) {
    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err);
        } else {

            const result = pedido.toObject();
            result.estadoUtilizador = Pedido.estadoUtilizador
            result.resultadoTeste = Pedido.resultadoTeste
            result.estadoTeste = Pedido.estadoTeste

            res.json(result);



        }
    });
};


pedidoController.numeroInfetados = function (req, res, next) {
    Pedido.find({ estadoUtilizador: req.params.infetado }, function (err, pedido) {
        if (err) {
            next(err)
        } else {
            res.json(pedido.length)
        }
    })
}

pedidoController.deletePedido = function (req, res, next) {
    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if (err) {
            next(err);
        } else {
            Pedido.deleteOne({ _id: req.params.pedidoId }, function (err) {
                if (err) {
                    next(err);
                } else {

                    res.json({ status: "Done" });
                }
            });
        }
    })
}










module.exports = pedidoController;
