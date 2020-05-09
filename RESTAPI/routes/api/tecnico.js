const express = require('express');
const router = express.Router();
const tecnicoController = require("../../controllers/tecnicoController");
const authorize = require('../../middlewares/authorize')

router.post('/:userId', authorize(["ADMIN"]),tecnicoController.criarTecnico);
router.delete('/:tecnicoID', authorize(["ADMIN"]),tecnicoController.removerTecnico);
router.get('/:tecnicoID', tecnicoController.verTecnico);
router.get('/', authorize(["ADMIN"]),tecnicoController.verTecnicos);

module.exports = router;
