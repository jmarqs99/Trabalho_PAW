const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

router.get('/', pedidoController.getAllPedidos);
router.get('/:pedidoId', pedidoController.getOnePedido);

router.post('/', pedidoController.criarPedido);
router.put('/:pedidoId', pedidoController.updatePedido);

//router.param('pedidoId', pedidoController.getByIdProduct)



module.exports = router;
