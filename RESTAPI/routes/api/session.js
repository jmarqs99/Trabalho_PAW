const express = require('express')
const jwt = require('jsonwebtoken')
const Utilizador = require("../../models/utilizador");
const Tecnico = require("../../models/tecnico");
const authorize = require('../../middlewares/authorize')
const bcrypt = require('bcrypt');

const sessionRouter = express.Router()

const SESSION_EXP = 86400000;

sessionRouter.post('/login', (req, res, next) => {
	if (req.body.nmrCC && req.body.password) {
		Utilizador.findOne({nmrCC:req.body.nmrCC},function (err, utilizador) {
			if (err) {
				next(err);
			} else {
				if (utilizador) {
					bcrypt.compare(req.body.password, utilizador.password, function(err, result) {
						if(result){
							const cookie = req.body;
							Tecnico.findOne({utilizadorId:utilizador._id},function (err, tecnico) {
								if(err){
									next(err);
								} else {
									if (tecnico) {
										cookie.role = "TECNICO";
									} else {
										cookie.role = "UTILIZADOR"
									}
									const jwtToken = jwt.sign(cookie, process.env.JWT_SECRET);
									res.cookie(
										'session',
										jwtToken,
										{
											expires: new Date(Date.now() + SESSION_EXP),
											httpOnly: true
										}
									)
									res.json({status:'logged In'})
								}
							})
						} else {
							res.json({status:"Wrong Password"})
						}
					});
				} else {
					res.json({noUserFound: 'true'});
				}
			}
		});	
	} else {
		res.json({invalidArguments: 'true'});
	}

})

sessionRouter.get('/me', (req, res, next) => {
	res.json(req.user)
})

sessionRouter.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.json({ success: 'true' })
})

module.exports = sessionRouter
