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

module.exports = pedidoController;
