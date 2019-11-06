var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//crear un schema en mongoose

var futbolistaSchema = new Schema ({
    Nombre: {type: String, required: true},
    Apellido: {type: String, required: true},
    Nacimiento: {type: String, required: true},
    Fecha: {type: String, required: true},
    Equipo: {type: String, required: true}
})


var Futbolistas = mongoose.model('Futbolistas', futbolistaSchema);
module.exports = Futbolistas;