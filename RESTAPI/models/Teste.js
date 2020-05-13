const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Teste', new mongoose.Schema({
    pedidoId: String,
    ano: Number,
    mes: Number,
    dia: Number,
    hora: Number,
    minuto: Number,
    resultadoTeste: String
})
);