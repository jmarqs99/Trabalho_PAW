const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

router.get('/', pedidoController.getAllPedidos);
router.get('/:pedidoId', pedidoController.getOnePedido);
router.post('/', pedidoController.criarPedido);
router.put('/:pedidoId', pedidoController.updatePedido);


//filtrar parâmetros de um pedido pelo seu id
router.get('/estadoTeste/:pedidoId', pedidoController.getOnePedidoByEstadoTeste)
router.get('/resultado/:pedidoId', pedidoController.getOnePedidoByResultado)
router.get('/estadoUser/:pedidoId', pedidoController.getOnePedidoByEstadoUtilizador)
router.get('/informacao/:pedidoId', pedidoController.getOnePedidoByInformacao)


//filtrar a lista dos pedidos por parâmetro
router.get('/resultadoTeste/:positivo', pedidoController.allResultadoPositivoPedido)
router.get('/resultadoTeste/:negativo', pedidoController.allResultadoNegativoPedido)
router.get('/estado/:finalizado', pedidoController.allEstadoTesteFinalizadoPedido)
router.get('/estado/:pendente', pedidoController.allEstadoTestePendentePedido)
router.get('/estadoUtilizador/:infetado', pedidoController.allEstadoUserIngetadoPedido)
router.get('/estadoUtilizador/:saudavel', pedidoController.allEstadoUserSaudavelPedido)
router.get('/estadoUtilizador/:suspeito', pedidoController.allEstadoUserSuspeitoPedido)
//router.get('/informacaoPedido/:saude24', pedidoController.allInformacaoSaude24Pedido)
//router.get('/informacaoPedido/:grupo_de_risco', pedidoController.allInformacaoGrupoDeRiscoPedido)
//router.get('/informacaoPedido/:locais_de_risco', pedidoController.allInformacaoLocaisDeRiscoPedido)
//router.get('/abc/:locais', pedidoController.allInformacaoLocaisRiscoPedido)




//router.param('pedidoId', pedidoController.getByIdProduct)



module.exports = router;
