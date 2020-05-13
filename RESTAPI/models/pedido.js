const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pedido', new mongoose.Schema({
    utilizadorId: String,
    informacao: String,
    estadoUtilizador: String,
    estadoTeste: String,
    resultadoTeste: String,
    type: String,
    data: Buffer,
   
})
);