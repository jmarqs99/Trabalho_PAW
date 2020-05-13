const mongoose = require("mongoose");
const Pedido = require("../models/pedido");

//const fileupload = require('express-fileupload')
//mongoose.use(fileupload())

//const multer = require('multer')
//const upload = multer({dest: '/uploads'})

const pedidoController = {};

//Pedido.use(fileupload())
//pedidoController.use(fileupload())
/**
pedidoController.upload = function(req, res, next) {
    //const file = req.files.pdf
    console.log(req.files)
    res.send({
        success: true,
        message: "file uploaded"
    })
}
 */

pedidoController.criarPedido = function (req, res, next) {
    
    /** 
    const pedido = new Pedido(req.body);

    pedido.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(pedido);
        }
    });
    */
   Pedido.findOne({ _id: req.body.pedidoId }, function (err, pedido) {
    if (err) {
        next(err);
    } else {
    
        if(req.body.informacao && req.body.estadoTeste && req.body.estadoUtilizador && req.body.resultadoTeste) {
            if(pedido == null) {
                const newPedido = new Pedido(req.body)

                newPedido.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(newPedido);
                    }
                })
            }
            else {
                res.status(201).json({ invalidArguments: 'true' });
            }
        }
        else {
            res.status(202).json({ invalidArguments: 'true' });
        }

    }
})  
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

pedidoController.upload = function (req, res, next) {
    /**
    Pedido.findByIdAndUpdate(req.params.pedidoId, req.body, { new: true },
        function (err, pedido) {
            if (err) {
                next(err);
            } else {
                const file = req.files.photo
                file.mv('/uploads' + file.name, function(err, result) {
                    if(err) {
                        next(err)
                    }
                    res.send({
                        success: true,
                        message: "file uploaded"
                    })
                })
                
            }
        });
         */
        
                console.log(req.files)
                 const file = req.files.pdf
                 file.mv('uploads/' + file.name, function(err, result) {
                     if(err) {
                         next(err)
                     }
                     else {
                     res.send({
                        success: true,
                        message: "file uploaded"
                    })
                }
                 })
                 

                  
                 
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


pedidoController.numeroInfetados = function (req, res, next) {
    Pedido.find({ estadoUtilizador: req.params.infetado }, function (err, pedido) {
        if (err) {
            next(err)
        } else {
            res.json(pedido.length)
        }
    })
}

pedidoController.deletePedido = function(req, res, next) {
    Pedido.findOne({ _id: req.params.pedidoId }, function (err, pedido) {
        if(err) {
            next(err);
        } else {
            Pedido.deleteOne({_id:req.params.pedidoId},function (err)  {
                if(err) {
                    next(err);
                } else {
                    
                    res.json({status:"Done"});
                }
            });
        }
    })
}




pedidoController.verPedidoInterno = function (id, teste) {
    Utilizador.findOne({ _id: id }, function (err, pedido) {
        if (err) {
            teste(null);
        } else {
            teste(pedido)
        }
    });
};
 








module.exports = pedidoController;
