const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();
const {getAllFutbolistas, getFutbo, createfutbolista, updateid, deleteid} = require ('./funciones2')

app.use(cors({origin : 'http://localhost:4200'}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EquiposdeFutbol');
var Futbolistas = require('./base.js')


app.use(express.json());

const getAllFutbolistas = (req, res,next) => {
    Futbolistas.find({}, function(err, futbo)
    {
        if(err) throw err;
        res.status(200);
        res.send(futbo);
    });

};


const getFutbo =(req, res) => {
    Futbolistas.find({
        _id: req.params._id
    }, function(err, futbo){
      
        if(futbo.length === 0) { res.status(404)
            res.send('El ID no existe');}
        else{
        res.send(futbo)
        res.status(200);
        }
    
    })
        
};

const createfutbolista =(req, res) => {

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
    

    if(result.error)
    {
        //400 Bad Request
        res.status(400).
        res.send(result.error.details[0].message)
        return;
    }
    else
    {
        const expreg = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;

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
            res.status(201)
            res.send("El Futbolista se agrego con exito");
            return;
        }
        else
        {
            res.status(400)
            res.send("La fecha no esta en el formato correcto")
            return;
        }
        
    }
};


const updateid =(req, res) => {

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
     if(result.error)
     {
         //400 Bad Request
         res.status(400)
         res.send(result.error.details[0].message)
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
            if (err) {res.status(404)
             res.send('El ID no existe');}
            else{
            res.status(204)
            res.send("El Futbolista se actualizo con exito");
            return;
            }
          });
         
         }
         else
         {
             res.status(400)
             res.send("La fecha no esta en el formato correcto")
             return;
         }
         
     }
};

const deleteid = (req, res) => {
    //buscar
    Futbolistas.findOneAndDelete( {_id: req.params._id}, function(err){
        if(err) { res.status(404)
            res.send('El ID no existe')}
        else{
        res.status(204)
        res.send("Los datos fueron eliminados con exito");
        }
    } );
   
}

module.exports = {getAllFutbolistas, getFutbo, createfutbolista, updateid, deleteid};