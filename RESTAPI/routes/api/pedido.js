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

//filtrar a lista dos pedidos por parâmetro
router.get('/resultados/:resultado',authorize(["TECNICO"]), pedidoController.Resultados)
router.get('/estadosTeste/:estadoTeste',authorize(["TECNICO"]), pedidoController.EstadosTeste)
router.get('/estadosUtilizador/:estadoUtilizador',authorize(["TECNICO"]), pedidoController.EstadosUser)
router.get('/informacaoPedido/:informacao',authorize(["TECNICO"]), pedidoController.informacao)
router.get('/cc/:nmrCC', authorize(["TECNICO"]), pedidoController.cc)


module.exports = router;
