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

pedidoController.numeroInfetados = function(req, res, next) {
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
pedidoController.allResultadoPositivoPedido = function(req, res, next) {

    //Pedido.findOne({_resultadoTeste:req.params.positivo}, function(err, pedido){

        Pedido.find({resultadoTeste:req.params.positivo}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}
pedidoController.allResultadoNegativoPedido = function(req, res, next) {


        Pedido.find({resultadoTeste:req.params.negativo}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}

pedidoController.allEstadoTesteFinalizadoPedido = function(req, res, next) {

    //Pedido.findOne({_resultadoTeste:req.params.positivo}, function(err, pedido){

        Pedido.find({estadoTeste:req.params.finalizado}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}

pedidoController.allEstadoTestePendentePedido = function(req, res, next) {

    //Pedido.findOne({_resultadoTeste:req.params.positivo}, function(err, pedido){

        Pedido.find({estadoTeste:req.params.pendente}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}

pedidoController.allEstadoUserDoentePedido = function(req, res, next) {

    //Pedido.findOne({_resultadoTeste:req.params.positivo}, function(err, pedido){

        Pedido.find({estadoTeste:req.params.doente}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}
pedidoController.allEstadoUserSaudavelPedido = function(req, res, next) {

    //Pedido.findOne({_resultadoTeste:req.params.positivo}, function(err, pedido){

        Pedido.find({estadoTeste:req.params.saudavel}, function(err, pedido){
            if(err) {
                next(err)
            }
            else {
                res.json(pedido)
                
            }
        })

}

pedidoController.getOnePedidoByEstadoTeste = async function (req,res,next) {

    
    Pedido.findOne({_id:req.params.pedidoId},function (err,pedido)  {
        if(err) {
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
pedidoController.getOnePedidoByResultado = async function (req,res,next) {
    Pedido.findOne({_id:req.params.pedidoId},function (err,pedido)  {
        if(err) {
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

pedidoController.getOnePedidoByEstadoUtilizador = async function (req,res,next) {
    Pedido.findOne({_id:req.params.pedidoId},function (err,pedido)  {
        if(err) {
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

pedidoController.getOnePedidoByInformacao = async function (req,res,next) {
    Pedido.findOne({_id:req.params.pedidoId},function (err,pedido)  {
        if(err) {
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
