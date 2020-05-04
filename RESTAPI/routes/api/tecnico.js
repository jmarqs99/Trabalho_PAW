const express = require('express');
const router = express.Router();
const tecnicoController = require("../../controllers/tecnicoController");

router.post('/:userId', tecnicoController.criarTecnico);
router.delete('/:tecnicoID', tecnicoController.removerTecnico);
router.get('/:tecnicoID', tecnicoController.verTecnico);
router.get('/', tecnicoController.verTecnicos);

module.exports = router;
