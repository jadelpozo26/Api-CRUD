const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();
const {getAllFutbolistas, getFutbo, createfutbolista, updateid, deleteid} = require ('./funciones2')

app.use(cors({origin : 'http://localhost:4200'}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EquiposdeFutbol');
var Futbolistas = require('./base.js')
var hola;

var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
  console.log('connected');
});


app.use(express.json());






const futbolistas =
[
    { nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    { nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    { nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1998', equipo: 'Napoli'}

];

app.get('/api/v1/read',getAllFutbolistas);

app.get('/api/v1/read/:_id', getFutbo);

app.post('/api/v1/create',createfutbolista);


app.put('/api/v1/update/:_id', updateid)

app.delete('/api/v1/delete/:_id', deleteid)
//PORT

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on ${port}...`));
