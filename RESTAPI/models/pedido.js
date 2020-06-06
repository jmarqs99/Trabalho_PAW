const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pedido', new mongoose.Schema({
    nmrCC: String,
    informacao: String,
    estadoUtilizador:{type:String, default: "suspeito"},
    estadoTeste: {type:String, default: "Por agendar"},
    resultadoTeste: {type:String, default:"indefinido"},
    havePDF: {type:Boolean, default:false}
   
})
);