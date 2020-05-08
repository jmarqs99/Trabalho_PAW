const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

router.get('/', pedidoController.getAllPedidos);
router.get('/:pedidoId', pedidoController.getOnePedido);
router.get('/estadoTeste/:pedidoId', pedidoController.getOnePedidoByEstadoTeste)
router.get('/resultado/:pedidoId', pedidoController.getOnePedidoByResultado)
router.get('/estadoUser/:pedidoId', pedidoController.getOnePedidoByEstadoUtilizador)
router.get('/informacao/:pedidoId', pedidoController.getOnePedidoByInformacao)
//router.get('/numero/', pedidoController.numeroInfetados)

router.get('/resultadoTeste/:positivo', pedidoController.allResultadoPositivoPedido)
router.get('/resultadoTeste/:negativo', pedidoController.allResultadoNegativoPedido)


router.get('/estado/:finalizado', pedidoController.allEstadoTesteFinalizadoPedido)
router.get('/estado/:pendente', pedidoController.allEstadoTestePendentePedido)

router.get('/estadoUtilizador/:doente', pedidoController.allEstadoUserDoentePedido)
router.get('/estadoUtilizador/:saudavel', pedidoController.allEstadoUserSaudavelPedido)

router.post('/', pedidoController.criarPedido);
router.put('/:pedidoId', pedidoController.updatePedido);


//router.param('pedidoId', pedidoController.getByIdProduct)



module.exports = router;
