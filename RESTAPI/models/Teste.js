const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Teste', new mongoose.Schema({
    pedidoId: String,
    nmrCC: String,
    hora: Number,
    date: Date,
    resultadoTeste: {type:String, default:"indefinido"},
    estadoTeste: {type:String, default: "agendado"},
 
})
);