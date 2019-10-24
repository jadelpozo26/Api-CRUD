const Joi = require('joi');
const express = require('express');
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EquiposdeFutbol');
var Futbolistas = require('./base.js')
var hola;

app.use(express.json());






const futbolistas =
[
    {id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 2, nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 3, nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1998', equipo: 'Napoli'}

];

app.get('/api/v1/read',(req, res) => 
{
    Futbolistas.find({}, function(err, futbo)
    {
        if(err) throw err;

        console.log(futbo);
        res.send(futbo);
    })
    //res.send(futbolistas);
});

app.get('/api/v1/read/:id', (req, res) =>
{
    Futbolistas.find({
        id: req.params.id
    }, function(err, futbo){
      
        if(futbo.length === 0) return res.status(404).send('El ID no existe');
        res.send(futbo);
        console.log(futbo)
    })
 
});

app.post('/api/v1/create',(req,res) => {

    const schema = 
    {
        nombre: Joi.string().max(15).required(),
        apellido: Joi.string().max(25).required(),
        lugarnac: Joi.string().max(25).required(),
        fechanac: Joi.required(),
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
        var expreg = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;

        if(expreg.test(req.body.fechanac))
        {
            var Contador = Futbolistas.count({}, function( err, count){
                return hola = count +1;
            })


            console.log(hola);
            var nuevoFut = Futbolistas({
                id: 10,
               nombre: req.body.nombre,
                apellido: req.body.apellido,
                lugarnac: req.body.lugarnac,
                fechanac: req.body.fechanac,
                equipo: req.body.equipo
            });

            nuevoFut.save(function(err)
            {
                if(err) throw err;
            });
            res.status(201).send("El Futbolista se agrego con exito");
            return;
        }
        else
        {
            res.status(400).send("La fecha no esta en el formato correcto")
            return;
        }
        
    }
    
});


app.put('/api/v1/update/:id', (req,res) => 
{
    //buscar 
    Futbolistas.findByIdAndUpdate({
        id : req.params.id, update: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            lugarnac: req.body.lugarnac,
            fechanac : req.body.fechanac,
            equipo: req.body.equipo 
        }, function(err, futbo) 
        {
            if(err) return res.status(404).send('El ID no existe')
            
        }
    
             
})
    

    //validacion
    const schema = 
    {
        nombre: Joi.string().max(15).required(),
        apellido: Joi.string().max(25).required(),
        lugarnac: Joi.string().max(25).required(),
        fechanac: Joi.required(),
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
        var expreg = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;

        if(expreg.test(req.body.fechanac))
        {
            //update
            hola = req.params.id;

            
    }
        else
        {
            res.status(400).send("La fecha no esta en el formato correcto")
            return;
        }
        
    }
    
})

app.delete('/api/v1/delete/:_id', (req, res) =>
{
    //buscar
    Futbolistas.findByIdAndDelete( req.params._id, function(err){
        if(err) return res.status(404).send('El ID no existe')
        console.log()
        res.status(204).send("Los datos fueron eliminados con exito");


    } )

    //const futbolista = futbolistas.find(c => c.id === parseInt(req.params.id));
    //if(!futbolista) return res.status(404).send('El ID no existe');//404


    //retornar 204
    //res.status(204).send("Los datos fueron eliminados con exito");

})
//PORT

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on ${port}...`));

