const express = require('express')
const jwt = require('jsonwebtoken')

const sessionRouter = express.Router()

const SESSION_EXP = 86400000;

sessionRouter.post('/login', (req, res, next) => {
	const jwtToken = jwt.sign(req.body, process.env.JWT_SECRET);

	res.cookie(
		'session',
		jwtToken,
		{
			expires: new Date(Date.now() + SESSION_EXP),
			httpOnly: true
		}
	)
	res.json(null)
})

sessionRouter.get('/me', (req, res, next) => {
	res.json(req.user)
})

sessionRouter.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.json({ success: 'true' })
})

module.exports = sessionRouter
