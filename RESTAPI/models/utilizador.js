const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new mongoose.Schema({
    primeiroNome: String,
    ultimoNome: String,
    estado: String
})
);