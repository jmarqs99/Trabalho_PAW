const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Tecnico', new mongoose.Schema({
    utilizadorId: String
})
);