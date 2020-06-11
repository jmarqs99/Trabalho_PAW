const express = require('express');
const router = express.Router();
const utilizadorController = require("../../controllers/utilizadorController");
const authorize = require('../../middlewares/authorize')

router.post('/', utilizadorController.createUtilizador);
router.get('/' , authorize(["TECNICO"]),utilizadorController.verTodosUtilizadores);
router.get('/nmrInfetados' , authorize(["ADMIN"]), utilizadorController.numeroInfetados);
router.get('/:utilizadorId' , authorize(["TECNICO"]),utilizadorController.verUtilizador);
router.put('/:utilizadorId', authorize(["ADMIN"]),utilizadorController.updateUtilizador);








module.exports = router;
