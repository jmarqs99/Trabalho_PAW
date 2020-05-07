const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const Utilizador = require("../../models/utilizador");
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
							const jwtToken = jwt.sign(req.body, process.env.JWT_SECRET);
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
