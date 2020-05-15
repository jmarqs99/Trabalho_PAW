const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");
const authorize = require('../../middlewares/authorize')

router.get('/',authorize(["TECNICO"]), pedidoController.getAllPedidos);
router.get('/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedido);
router.post('/',authorize(["UTILIZADOR"]), pedidoController.criarPedido);
router.put('/:pedidoId',authorize(["TECNICO"]), pedidoController.updatePedido);
router.delete('/:pedidoId',authorize(["ADMIN"]), pedidoController.deletePedido)

router.put('/pedidoUpload/:pedidoId', pedidoController.updateUpload)

router.post('/up/',authorize(["TECNICO"]), pedidoController.upload)

router.get('/infetados/:infetado',authorize(["TECNICO"]), pedidoController.numeroInfetados)

//filtrar parâmetros de um pedido pelo seu id
router.get('/estadoTeste/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedidoByEstadoTeste)
router.get('/resultado/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedidoByResultado)
router.get('/estadoUser/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedidoByEstadoUtilizador)
router.get('/informacao/:pedidoId',authorize(["TECNICO"]), pedidoController.getOnePedidoByInformacao)


//filtrar a lista dos pedidos por parâmetro
router.get('/resultados/:resultado',authorize(["TECNICO"]), pedidoController.Resultados)
router.get('/estadosTeste/:estadoTeste',authorize(["TECNICO"]), pedidoController.EstadosTeste)
router.get('/estadosUtilizador/:estadoUtilizador',authorize(["TECNICO"]), pedidoController.EstadosUser)
router.get('/informacaoPedido/:informacao',authorize(["TECNICO"]), pedidoController.informacao)
router.get('/cc/:nmrCC', authorize(["TECNICO"]), pedidoController.cc)






module.exports = router;
