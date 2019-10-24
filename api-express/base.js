var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//crear un schema en mongoose

var futbolistaSchema = new Schema ({
    id: { type: Number, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    lugarnac: {type: String, required: true},
    fechanac: {type: String, required: true},
    equipo: {type: String, required: true}
})


var Futbolistas = mongoose.model('Futbolistas', futbolistaSchema);
module.exports = Futbolistas;