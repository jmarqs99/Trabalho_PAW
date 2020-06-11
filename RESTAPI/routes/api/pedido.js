const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");
const authorize = require('../../middlewares/authorize')


router.post('/',authorize(["UTILIZADOR"]), pedidoController.criarPedido);
router.get('/',authorize(["UTILIZADOR"]), pedidoController.getAllPedidos);
router.delete('/:pedidoId',authorize(["ADMIN"]), pedidoController.deletePedido)
router.get('/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedido);
router.put('/:pedidoId',authorize(["TECNICO"]), pedidoController.updatePedido);

router.put('/pedidoUpload/:pedidoId', pedidoController.updateUpload)



module.exports = router;
