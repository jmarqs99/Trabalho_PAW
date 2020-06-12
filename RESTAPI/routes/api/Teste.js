const express = require('express');
const router = express.Router();
const TesteController = require("../../controllers/TesteController");
const authorize = require('../../middlewares/authorize');

router.post('/',authorize(["TECNICO"]), TesteController.criarTeste);
router.get('/',authorize(["UTILIZADOR"]), TesteController.verTestes);
router.get('/:testeId',authorize(["TECNICO"]), TesteController.verTeste);
router.put('/:testeId',authorize(["TECNICO"]), TesteController.updateTeste);
router.delete('/:testeId',authorize(["ADMIN"]), TesteController.deleteTeste);
router.get('/numeroTestesDia/:data',authorize(["ADMIN"]), TesteController.testePorDia);
router.get('/numeroTestesPessoa/:nmrCC',authorize(["ADMIN"]), TesteController.totalTestesPorPessoa);


module.exports = router;