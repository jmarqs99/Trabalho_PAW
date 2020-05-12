const mongoose = require("mongoose");
const Teste = require("../models/Teste");
const pedidoController = require("./pedidoController");
const Pedido = require("../models/pedido");

const TesteController = {};

TesteController.criarTeste = function(req, res, next) {
   
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
     
    
    const teste = new Teste(req.body);

    teste.save(function(err) {
        if(err) {
            next(err)
        } 
        else {
            res.json(teste)
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
TesteController.verTestes = function(req, res, next) {
    Teste.find(function (err, testes) {
        if (err) {
            next(err)
        } else {

            res.json(testes)

        }
    })
}

TesteController.verTeste = function(req, res, next) {
    Teste.findOne({ _id: req.params.testeId }, function (err, teste) {
        if (err) {
            next(err)
        }
        else {
            res.json(teste)

        }
    })
}

TesteController.updateTeste = function(req, res, next) {
    Teste.findByIdAndUpdate(req.params.testeId, req.body, { new: true },
        function (err, teste) {
            if (err) {
                next(err);
            } else {
                res.json(teste);
            }
        });
}

TesteController.deleteTeste = function(req, res, next) {
    Teste.findOne({ _id: req.params.testeId }, function (err, teste) {
        if(err) {
            next(err);
        } else {
            teste.deleteOne({_id:req.params.testeId},function (err)  {
                if(err) {
                    next(err);
                } else {
                    
                    res.json({status:"Done"});
                }
            });
        }
    })
}

TesteController.totalTestesPorDia = function(req, res, next) {
    Teste.find({ Data: req.params.testes }, function (err, teste) {
        if (err) {
            next(err)
        } else {
            res.json(teste.length)
        }
    })

}

TesteController.totalTestesPorPessoa = function(req, res, next) {
    Teste.find({ pedidoId: req.params.user }, function (err, teste) {
        if (err) {teste
            next(err)
        } else {
            res.json(teste.length)
        }
    })
}

module.exports = TesteController;