const express = require('express');
const router = express.Router();
const agendarTesteController = require("../../controllers/TesteController");

//router.post('/:pedidoID', agendarTesteController.agendarOTeste)
router.post('/', agendarTesteController.criarTeste)
router.get('/', agendarTesteController.verTestes)
router.get('/:agendamentoId', agendarTesteController.verTeste)
router.put('/:agendamentoId', agendarTesteController.updateTeste)
router.delete('/:agendamentoId', agendarTesteController.deleteTeste)


router.get('/numeroTestes/:testes', agendarTesteController.totalTestesPorDia)
router.get('/numeroTestesPessoa/:user', agendarTesteController.totalTestesPorPessoa)

module.exports = router;