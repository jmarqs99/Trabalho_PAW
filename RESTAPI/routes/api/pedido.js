const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

router.get('/', pedidoController.getAllPedidos);
router.get('/:pedidoId', pedidoController.getOnePedido);
router.post('/', pedidoController.criarPedido);
router.put('/:pedidoId', pedidoController.updatePedido);

router.get('/infetados/:infetado', pedidoController.numeroInfetados)

//filtrar parâmetros de um pedido pelo seu id
router.get('/estadoTeste/:pedidoId', pedidoController.getOnePedidoByEstadoTeste)
router.get('/resultado/:pedidoId', pedidoController.getOnePedidoByResultado)
router.get('/estadoUser/:pedidoId', pedidoController.getOnePedidoByEstadoUtilizador)
router.get('/informacao/:pedidoId', pedidoController.getOnePedidoByInformacao)


//filtrar a lista dos pedidos por parâmetro
router.get('/resultados/:resultado', pedidoController.Resultados)
router.get('/estadosTeste/:estadoTeste', pedidoController.EstadosTeste)
router.get('/estadosUtilizador/:estadoUtilizador', pedidoController.EstadosUser)
router.get('/informacaoPedido/:informacao', pedidoController.informacao)





module.exports = router;
