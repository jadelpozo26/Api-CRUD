const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();

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

let futbo=[];




const futbolistas =
[
    {id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 2, nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},
    {id: 3, nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1998', equipo: 'Napoli'}

];

app.get('/api/v1/read',(req, res) => 
{
    client.exists('llave_futbo' , function(err, reply){
        if(reply===1)
        {
          client.get('llave_futbo',function(err, reply){
            futbo = JSON.parse(reply);
            console.log('futbolistas ya existian en redis');
            res.status(200);
            res.json(futbo);
          });
        }
        else{
            Futbolistas.find({}, function(err, futbo)
            {
                if(err) throw err;

                let futboString = JSON.stringify(futbo);
                client.set('llave_futbo', futboString);
                client.expire('llave_futbo', 50);
                console.log('NO EXISTIA EN REDIS, AHORA SI');
                res.status(200);
                
                return res.send(futbo);
            });
        }
    //res.send(futbolistas);
});
});

app.get('/api/v1/read/:_id', (req, res) =>
{

    client.exists('llave_futbo' + req.params._id , function(err, reply){
        if(reply===1)
        {
          client.get('llave_futbo' + req.params._id,function(err, reply){
            futbo = JSON.parse(reply);
            console.log('futbolistas con id ya existian en redis');
            res.status(200);
            res.json(futbo);
          });
        }
        else{

    Futbolistas.find({
        _id: req.params._id
    }, function(err, futbo){
      
        if(futbo.length === 0) return res.status(404).send('El ID no existe');
        let futboString = JSON.stringify(futbo);
        client.set('llave_futbo' + req.params._id, futboString);
        client.expire('llave_futbo' + req.params._id, 50);
        console.log('no estaba en redis');
        res.status(200);
        
        return res.send(futbo);
    
    })
        }
 
});
});

app.post('/api/v1/create',(req,res) => {

    const schema = 
    {
        _id : Joi.any(),
        Nombre: Joi.string().max(15).required(),
        Apellido: Joi.string().max(25).required(),
        Nacimiento: Joi.string().max(25).required(),
        Fecha: Joi.required(),
        Equipo: Joi.string().max(25).required()

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

        if(expreg.test(req.body.Fecha))
        {
              var nuevoFut = Futbolistas({
               Nombre: req.body.Nombre,
                Apellido: req.body.Apellido,
                Nacimiento: req.body.Nacimiento,
                Fecha: req.body.Fecha,
                Equipo: req.body.Equipo
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


app.put('/api/v1/update/:_id', (req,res) => 
{
    
    //validacion
    const schema = 
    {
        Nombre: Joi.string().max(15).required(),
        Apellido: Joi.string().max(25).required(),
        Nacimiento: Joi.string().max(25).required(),
        Fecha: Joi.required(),
        Equipo: Joi.string().max(25).required()

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

        if(expreg.test(req.body.Fecha))
        {
            const Nombre = {Nombre: req.body.Nombre};
            const apellido = {Apellido: req.body.Apellido};
            const lugar = {Nacimiento: req.body.Nacimiento};
            const fecha = {Fecha: req.body.Fecha};
            const equipo = {Equipo: req.body.Equipo};
            //update
           Futbolistas.findOneAndUpdate({_id: req.params._id},{Nombre: req.body.Nombre, Apellido: req.body.Apellido, Nacimiento: req.body.Nacimiento, Fecha : req.body.Fecha, Equipo : req.body.Equipo}, function(err){
           if (err) return res.status(404).send('El ID no existe');
           res.status(204).send("El Futbolista se actualizo con exito");
         });

            

            //return
            

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
    Futbolistas.findOneAndDelete( {_id: req.params._id}, function(err){
        if(err) return res.status(404).send('El ID no existe')
        console.log("hola")
        res.status(204).send("Los datos fueron eliminados con exito");


    } );

    //const futbolista = futbolistas.find(c => c.id === parseInt(req.params.id));
    //if(!futbolista) return res.status(404).send('El ID no existe');//404


    //retornar 204
    //res.status(204).send("Los datos fueron eliminados con exito");

})
//PORT

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on ${port}...`));

