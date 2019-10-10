const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const futbolistas =
[
    {id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: 1998, equipo: 'Napoli'},
    {id: 2, nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: 1998, equipo: 'Napoli'},
    {id: 3, nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: 1998, equipo: 'Napoli'}

];

app.get('/api/v1/read',(req, res) => 
{
    res.send(futbolistas);
});

app.get('/api/v1/read/:id', (req, res) =>
{
    const futbolista = futbolistas.find(c => c.id === parseInt(req.params.id));
    if(!futbolista) return res.status(404).send('El ID no existe');//404
    res.send(futbolista);
    //res.send(req.params.id)
});

app.post('/api/v1/create',(req,res) => {

    const schema = 
    {
        nombre: Joi.string().max(15).required(),
        apellido: Joi.string().max(25).required(),
        lugarnac: Joi.string().max(25).required(),
        fechanac: Joi.number().min(1900).max(2010),
        equipo: Joi.string().max(25).required()

    };
    const result = Joi.validate(req.body, schema);
    

    if(result.error)//!req.body.nombre || req.body.nombre.length > 15)
    {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message)
        return;
    }
    else
    {
       res.status(201).send("El Futbolista se agrego con exito");
    }
    const futbolista = {
        id: futbolistas.length + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        lugarnac: req.body.lugarnac,
        fechanac: req.body.fechanac,
        equipo: req.body.equipo
    };
    futbolistas.push(futbolista);
    res.send(futbolista);
});


app.put('/api/v1/update/:id', (req,res) => 
{
    //buscar 
    const futbolista = futbolistas.find(c => c.id === parseInt(req.params.id));
    if(!futbolista) return res.status(404).send('El ID no existe');//404

    //validacion
    const schema = 
    {
        nombre: Joi.string().max(15).required(),
        apellido: Joi.string().max(25).required(),
        lugarnac: Joi.string().max(25).required(),
        fechanac: Joi.number().min(1900).max(2010).required(),
        equipo: Joi.string().max(25).required()

    };
    const result = Joi.validate(req.body, schema);
    if(result.error)//!req.body.nombre || req.body.nombre.length > 15)
    {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message)
        return;
    }
    
    //update
    futbolista.nombre = req.body.nombre;
    futbolista.apellido = req.body.apellido;
    futbolista.lugarnac = req.body.lugarnac;
    futbolista.fechanac = req.body.fechanac;
    futbolista.equipo = req.body.equipo

    //return
    res.status(204).send("El Futbolista se actualizo con exito");
    res.send(futbolista);
    


})

app.delete('/api/v1/delete/:id', (req, res) =>
{
    //buscar 
    const futbolista = futbolistas.find(c => c.id === parseInt(req.params.id));
    if(!futbolista) return res.status(404).send('El ID no existe');//404

    //delete
    const index = futbolistas.indexOf(futbolista);
    futbolistas.splice(index,1);

    //retornar 204
    res.status(204).send("Los datos fueron eliminados con exito");

})
//PORT

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on ${port}...`));

