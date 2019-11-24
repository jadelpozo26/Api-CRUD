const Joi = require('joi');
const express = require('express');
const app = express();
const {getAllFutbolistas, getFutbo, createfutbolista, updateid, deleteid} = require ('./funciones')


app.use(express.json());

const futbolistas =
[
    {id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 2, nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 3, nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'}

];

app.get('/api/v1/read', getAllFutbolistas);

app.get('/api/v1/read/:id', getFutbo);


app.post('/api/v1/create', createfutbolista);

app.put('/api/v1/update/:id', updateid);

app.delete('/api/v1/delete/:id', deleteid);
//PORT

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on ${port}...`));