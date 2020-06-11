const mongoose = require("mongoose");
const Pedido = require("../models/pedido");


const pedidoController = {};



pedidoController.criarPedido = function (req, res, next) {
    if (req.body.nmrCC && req.body.informacao) {

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
    if (file) {
        Pedido.findByIdAndUpdate(req.params.pedidoId, { havePDF: true }, { new: true },
            function (err, pedido) {
                if (err) {
                    next(err);
                } else {
                    file.mv('uploads/' + req.params.pedidoId+".pdf", function (err, result) {
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
            if (req.user.role == "UTILIZADOR") {
                let result = []
                pedidos.forEach(function (pedido, index) {
                    if (req.user.nmrCC == pedido.nmrCC) {
                        result.push(pedido);
                    }
                })
                res.json(result)
            } else {
                res.json(pedidos)
            }
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

pedidoController.downloadFile = function(req, res,next){
    const file = `./uploads/${req.params.pedidoId}.pdf`;
    var options = {
        root: "./uploads",
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      var fileName = req.params.pedidoId + ".pdf"
      res.sendFile(fileName, options, function (err) {
        if (err) {
          next(err)
        } else {
          console.log('Sent:', fileName)
        }
      })
};

module.exports = pedidoController;
