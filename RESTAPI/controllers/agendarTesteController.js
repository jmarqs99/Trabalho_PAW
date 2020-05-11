const mongoose = require("mongoose");
const AgendarTeste = require("../models/AgendarTeste");
const pedidoController = require("./pedidoController");
const Pedido = require("../models/pedido");

const agendarTesteController = {};

agendarTesteController.agendarteste = function(req, res, next) {
   
    /**
    pedidoController.verPedidoInterno(req.params.pedidoID, function(pedido) {
        //Pedido.findOne({ _id: req.body.pedidoID }, function (err, pedido) {
        if(pedido) {
            var agendarTeste = new AgendarTeste({pedidoId: req.params.pedidoID});
            agendarTeste.save(function(err){
                if(err) {
                    next(err)
                } else {
                    res.json(agendarTeste)
                }
            })
        }
        else {
            res.json({PedidoDontExist:true});
        }
    })
       */
     
    
    const agendarTeste = new AgendarTeste(req.body);

    agendarTeste.save(function(err) {
        if(err) {
            next(err)
        } 
        else {
            res.json(agendarTeste)
        }
    })
       

}

/**
agendarTesteController.verAgendamentos = function(req, res, next) {
    AgendarTeste.find(function(err, agendarTestes){
        if(err) {
            next(err)
        } else {
            const result = agendarTestes;

            new Promise((resolve, reject) => {
                result.forEach(function(item,index){
                    result[index] = result[index].toObject();
                    pedidoController.verPedidoInterno(item.pedidoId,function(pedido){
                        console.log(pedido);
                        result[index].estadoTeste = pedido.estadoTeste;
                        result[index].resultadoTeste = pedido.resultadoTeste;
                        result[index].estadoUtilizador = utilizador.estadoUtilizador;
                        if (index === result.length -1) resolve();
                    })
                })
            }).then(() => {
                res.json(result)
            });
        }
    })
}
 */
agendarTesteController.veragendamentos = function(req, res, next) {
    AgendarTeste.find(function (err, agendamentos) {
        if (err) {
            next(err)
        } else {

            res.json(agendamentos)

        }
    })
}

agendarTesteController.verAgendamento = function(req, res, next) {
    AgendarTeste.findOne({ _id: req.params.agendamentoId }, function (err, agendarTeste) {
        if (err) {
            next(err)
        }
        else {
            res.json(agendarTeste)

        }
    })
}

agendarTesteController.updateAgendamento = function(req, res, next) {
    AgendarTeste.findByIdAndUpdate(req.params.agendamentoId, req.body, { new: true },
        function (err, agendarTeste) {
            if (err) {
                next(err);
            } else {
                res.json(agendarTeste);
            }
        });
}

agendarTesteController.deleteAgendamento = function(req, res, next) {
    AgendarTeste.findOne({ _id: req.params.agendamentoId }, function (err, agendarTeste) {
        if(err) {
            next(err);
        } else {
            AgendarTeste.deleteOne({_id:req.params.agendamentoId},function (err)  {
                if(err) {
                    next(err);
                } else {
                    
                    res.json({status:"Done"});
                }
            });
        }
    })
}

agendarTesteController.totalAgendamentosPorDia = function(req, res, next) {
    AgendarTeste.find({ Data: req.params.testes }, function (err, agendarTeste) {
        if (err) {
            next(err)
        } else {
            res.json(agendarTeste.length)
        }
    })

}

agendarTesteController.totalAgendamentosPorPessoa = function(req, res, next) {
    AgendarTeste.find({ pedidoId: req.params.user }, function (err, agendarTeste) {
        if (err) {
            next(err)
        } else {
            res.json(agendarTeste.length)
        }
    })
}

module.exports = agendarTesteController;