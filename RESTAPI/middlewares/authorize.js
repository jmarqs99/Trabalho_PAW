const Utilizador = require("../models/utilizador");
const utilizadorController = require("../controllers/utilizadorController");

const autorizacoes = {
    ["UTILIZADOR"] : ["UTILIZADOR","TECNICO","ADMIN"],
    ["TECNICO"] : ["TECNICO","ADMIN"],
    ["ADMIN"] : ["ADMIN"]
}

const authorize = (opts) => {

	opts = autorizacoes(opts) || []

	return (req, res, next) => {
		if (!req.user) {
			next({message:'Not authenticated'})
        } else {
            Utilizador.findOne({ nmrCC: req.user.nmrCC }, function (err, utilizador) {
                if (err) {
                    next(err);
                } else {
                    if (utilizador.changed){
                        res.clearCookie('session')
                        res.json({ status: 'Need to RE-Login due to changes!' })
                        utilizadorController.updateUtilizadorInterno(utilizador._id,{changed:false})
                    } else {
                        const hasAuthorization = opts.includes(req.user.role)
            
                        if (hasAuthorization) {
                            next()
                        } else {
                            next({message:'Not authorized'})
                        }
                    }
                }
            });
        }
	}
}

module.exports = authorize
