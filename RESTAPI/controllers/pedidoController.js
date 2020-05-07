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

pedidoController.getOnePedido = function(req, res, next) {
    
    Pedido.findOne({_id:req.params.pedidoId}, function(err, pedido){
        if(err) {
            next(err)
        }
        else {
            res.json(pedido)
            
        }
    })
    
}

pedidoController.updatePedido = function(req, res, next) {

    Pedido.findByIdAndUpdate(req.params.pedidoId, req.body, { new: true },
        function (err, pedido) {
            if (err) {
                next(err);
            } else {
                res.json(pedido);
            }
        });
}

module.exports = pedidoController;