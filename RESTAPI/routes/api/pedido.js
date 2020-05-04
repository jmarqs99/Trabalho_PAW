const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({working: true})
});
router.get('/pedidos', pedidoController.getAllPedidos);
router.get('/:pedidoId', pedidoController.getOnePedido);

router.post('/', pedidoController.criarPedido);

//router.param('pedidoId', pedidoController.getByIdProduct)



module.exports = router;
