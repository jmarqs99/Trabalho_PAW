const express = require('express');
const router = express.Router();
const pedidoController = require("../../controllers/pedidoController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({working: true})
});
router.post('/pedidos', pedidoController.criarPedido);
module.exports = router;
