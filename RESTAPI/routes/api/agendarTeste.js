const express = require('express');
const router = express.Router();
const agendarTesteController = require("../../controllers/agendarTesteController");

//router.post('/:pedidoID', agendarTesteController.agendarOTeste)
router.post('/', agendarTesteController.agendarteste)
router.get('/', agendarTesteController.veragendamentos)
router.get('/:agendamentoId', agendarTesteController.verAgendamento)
router.put('/:agendamentoId', agendarTesteController.updateAgendamento)
router.delete('/:agendamentoId', agendarTesteController.deleteAgendamento)


router.get('/numeroTestes/:testes', agendarTesteController.totalAgendamentosPorDia)
router.get('/numeroTestesPessoa/:user', agendarTesteController.totalAgendamentosPorPessoa)

module.exports = router;