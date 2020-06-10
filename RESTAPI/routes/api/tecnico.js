const express = require('express');
const router = express.Router();
const tecnicoController = require("../../controllers/tecnicoController");
const authorize = require('../../middlewares/authorize')

router.get('/', authorize(["ADMIN"]),tecnicoController.verTecnicos);
router.post('/:userId', authorize(["ADMIN"]),tecnicoController.criarTecnico);
router.get('/:tecnicoID', authorize(["ADMIN"]),tecnicoController.verTecnico);
router.delete('/:tecnicoID', authorize(["ADMIN"]),tecnicoController.removerTecnico);



module.exports = router;
