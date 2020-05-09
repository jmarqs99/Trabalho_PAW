const mongoose = require("mongoose");
const Pedido = require("../models/pedido");

const pedidoController = {};

pedidoController.criarPedido = function (req, res, next) {
    const pedido = new Pedido(req.body);

    pedido.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(pedido);
        }
    });
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

/**
pedidoController.numeroInfetados = function (req, res, next) {
    Pedido.find(function (err, pedidos) {
        if (err) {
            next(err)
        } else {
            res.json(pedidos)
        }
    })
}

 */



module.exports = pedidoController;
