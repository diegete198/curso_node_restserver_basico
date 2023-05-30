
const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) =>{

const token = req.header('x-token');

if (!token) {
  return res.status(401).json({
    msg: 'No autorizado'
  })
}

try{

const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

const usuario = await Usuario.findById(uid)

if(!usuario) {
  return res.status(401).json({
    msg: 'El usuario no existe'
  })
}

//Verificar si no esta borrado
if(!usuario.estado) {
  return res.status(401).json({
    msg: 'El usuario ya esta eliminado'
  })
}

req.usuario = usuario;

  next();
}
catch(error){
  console.log(error)
  res.status(401).json({
    msg: 'Token no valido'
  })
}

console.log(token);








}

module.exports = {validarJWT}