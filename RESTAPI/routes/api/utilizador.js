const express = require('express');
const router = express.Router();
const utilizadorController = require("../../controllers/utilizadorController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({working: true})
});

router.post('/utilizadores', utilizadorController.createUtilizador);
router.put('/utilizador/:utilizadorId', utilizadorController.updateUtilizador);

module.exports = router;
