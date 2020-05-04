const express = require('express');
const router = express.Router();
const utilizadorController = require("../../controllers/utilizadorController");

router.post('/', utilizadorController.createUtilizador);
router.put('/:utilizadorId', utilizadorController.updateUtilizador);
router.get('/:utilizadorId' , utilizadorController.verUtilizador);
router.get('/' , utilizadorController.verTodosUtilizadores);

module.exports = router;
