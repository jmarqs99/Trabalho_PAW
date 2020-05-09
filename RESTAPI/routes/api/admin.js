const express = require('express');
const router = express.Router();
const adminController = require("../../controllers/adminController");
const authorize = require('../../middlewares/authorize')

router.post('/:userId',authorize(["ADMIN"]),adminController.criarAdmin);
router.delete('/:adminID', authorize(["ADMIN"]),adminController.removerAdmin);
router.get('/:adminID', adminController.verAdmin);
router.get('/', adminController.verAdmins);

module.exports = router;
