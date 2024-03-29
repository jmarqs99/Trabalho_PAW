const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Utilizador', new mongoose.Schema({
    nmrCC: String,
    password: String,
    primeiroNome: String,
    ultimoNome: String,
    estado: {type:String, default: "suspeito"},
    changed: {type:Boolean, default:false}
})
);