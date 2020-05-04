const express = require('express');
const router = express.Router();
const utilizadorController = require("../../controllers/utilizadorController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({working: true})
});

router.post('/', utilizadorController.createUtilizador);
router.put('/:utilizadorId', utilizadorController.updateUtilizador);
router.get('/:utilizadorId' , utilizadorController.verUtilizador)

module.exports = router;
