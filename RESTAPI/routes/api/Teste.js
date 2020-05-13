const express = require('express');
const router = express.Router();
const TesteController = require("../../controllers/TesteController");

//router.post('/:pedidoID', agendarTesteController.agendarOTeste)
router.post('/', TesteController.criarTeste)
router.get('/', TesteController.verTestes)
router.get('/:testeId', TesteController.verTeste)
router.put('/:testeId', TesteController.updateTeste)
router.delete('/:testeId', TesteController.deleteTeste)


router.get('/numeroTestesDia/:dia/:mes/:ano', TesteController.totalTestesPorDia)
router.get('/numeroTestesPessoa/:user', TesteController.totalTestesPorPessoa)

module.exports = router;