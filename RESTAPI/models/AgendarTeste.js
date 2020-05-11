const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('AgendarTeste', new mongoose.Schema({
    pedidoId: String,
    Data: Date
})
);