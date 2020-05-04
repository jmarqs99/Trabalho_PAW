const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Utilizador', new mongoose.Schema({
    primeiroNome: String,
    ultimoNome: String,
    estado: String
})
);