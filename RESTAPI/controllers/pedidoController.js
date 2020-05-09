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

pedidoController.getAllPedidos = function (req, res, next) {
    Pedido.find(function (err, pedidos) {
        if (err) {
            next(err)
        } else {



            res.json(pedidos)

        }
    })
}

pedidoController.numeroInfetados = function (req, res, next) {
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


pedidoController.Estados = function (req, res, next) {
    Pedido.find({ estadoTeste: req.params.estado }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)
        }
    })
}

/**
pedidoController.allInformacaoSaude24Pedido = function(req, res, next) {



    Pedido.find({informacao:req.params.saude24}, function(err, pedido){
        if(err) {
            next(err)
        }
        else {
            res.json(pedido)
            
        }
    })

}
 */

/**
pedidoController.allInformacaoGrupoDeRiscoPedido = function(req, res, next) {



   Pedido.find({informacao:req.params.grupo_de_risco}, function(err, pedido){
       if(err) {
           next(err)
       }
       else {
           res.json(pedido)
           
       }
   })

}
*/

/**
pedidoController.allInformacaoLocaisDeRiscoPedido = function(req, res, next) {



   Pedido.find({informacao:req.params.locais_de_risco}, function(err, pedido){
       if(err) {
           next(err)
       }
       else {
           res.json(pedido)
           
       }
   })

}
*/

/**
pedidoController.allInformacaoLocaisRiscoPedido = function(req, res, next) {


   Pedido.find({informacao:req.params.locais}, function(err, pedido){
       if(err) {
           next(err)
       }
       else {
           var indices = {}
           var elemento = "locais"
           var procurar = pedido.indexOf(elemento)
           
           while (procurar != -1) {
               indices.push(procurar);
               procurar = pedido.indexOf(elemento, procurar + 1);
             }
             res.json(indices)
           
       }
   })

}
*/



pedidoController.allEstadoUserIngetadoPedido = function (req, res, next) {


    Pedido.find({ estadoUtilizador: req.params.infetado }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)

        }
    })

}

pedidoController.allEstadoUserSuspeitoPedido = function (req, res, next) {


    Pedido.find({ estadoUtilizador: req.params.suspeito }, function (err, pedido) {
        if (err) {
            next(err)
        }
        else {
            res.json(pedido)

        }
    })

}

pedidoController.allEstadoUserSaudavelPedido = function (req, res, next) {


    Pedido.find({ estadoUtilizador: req.params.saudavel }, function (err, pedido) {
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




module.exports = pedidoController;
