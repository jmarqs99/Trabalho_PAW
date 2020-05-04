const mongoose = require("mongoose");
const Pedido = require("../models/pedido");

const pedidoController = {};

pedidoController.criarPedido = function (req,res,next) {
    const pedido = new Pedido(req.body);

    pedido.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(pedido);
        }
    });
};

pedidoController.getAllPedidos = function(req, res, next) {
    Pedido.find(function(err, pedidos){
        if(err) {
            next(err)
        }else {
            res.json(pedidos)
        }
    })
}

pedidoController.getOnePedido = function(req, res) {
    res.json(req.pedido)
}


module.exports = pedidoController;
