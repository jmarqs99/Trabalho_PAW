const express = require('express')
const jwt = require('jsonwebtoken')
const Utilizador = require("../../models/utilizador");
const Tecnico = require("../../models/tecnico");
const Admin = require("../../models/admin");
const authorize = require('../../middlewares/authorize')
const bcrypt = require('bcrypt');

const sessionRouter = express.Router()

const SESSION_EXP = 86400000; //1 dia

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
									} else {
										Admin.findOne({utilizadorId:utilizador._id},function (err, admin) {
											if(err){
												next(err);
											} else {
												if (admin) {
													cookie.role = "ADMIN";
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
									}
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
	const result = req.user;
	delete result.password;
	Utilizador.findOne({ nmrCC: result.nmrCC }, function (err, utilizador) {
		if (err) {
			next(err);
		} else {
			result.primeiroNome = utilizador.primeiroNome;
			result.ultimoNome = utilizador.ultimoNome;
			result.estado = utilizador.estado;
			res.json(result)
		}
	});
})

sessionRouter.put('/changePassword', (req, res, next) => {
	if (req.body.currentPassword && req.body.newPassword){
		if (req.body.currentPassword == req.user.password){
			bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
				req.body.newPassword = hash;
				Utilizador.findOneAndUpdate({nmrCC: req.user.nmrCC}, {password: req.body.newPassword},function (err, utilizador) {
					if (err) {
						next(err);
					} else {
						res.status(200).json({done: 'true'});
					}
				});
			  });
		} else {
			res.status(400).json({invalidPassword: 'true'});
		}
	} else {
		res.status(400).json({invalidArguments: 'true'});
	}
})



sessionRouter.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.json({ success: 'true' })
})

module.exports = sessionRouter
