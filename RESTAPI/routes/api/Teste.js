const express = require('express');
const router = express.Router();
const TesteController = require("../../controllers/TesteController");
const authorize = require('../../middlewares/authorize')

//router.post('/:pedidoID', agendarTesteController.agendarOTeste)
router.post('/',authorize(["TECNICO"]), TesteController.criarTeste)
router.get('/',authorize(["TECNICO"]), TesteController.verTestes)
router.get('/:testeId',authorize(["TECNICO"]), TesteController.verTeste)
router.put('/:testeId',authorize(["TECNICO"]), TesteController.updateTeste)
router.delete('/:testeId',authorize(["ADMIN"]), TesteController.deleteTeste)

router.get('/numeroTestesDia/:dia/:mes/:ano',authorize(["TECNICO"]), TesteController.totalTestesPorDia)
router.get('/numeroTestesPessoa/:nmrCC',authorize(["TECNICO"]), TesteController.totalTestesPorPessoa)

module.exports = router;