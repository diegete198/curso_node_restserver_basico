const {response, request} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');


const  userGet = async(req = request, res = response) =>{

  // const {q, nombre = 'No Name', apikey, page = 1, limit = 10} = req.query;
const {limite = 5, desde = 0} = req.query
const query = {estado : true};

// const usuarios = await Usuario.find(query)
//   .skip(desde)
//   .limit(limite);

// const total = await Usuario.countDocuments(query);

const [total, usuarios] = await Promise.all([
  Usuario.countDocuments(query),
  Usuario.find(query)
   .skip(desde)
  .limit(limite)
])

  res.json({
    total,
    usuarios
  })
}

const userPost = async(req, res = response) =>{
  


  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre,correo,password,rol});


  //encriptar pass
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(usuario.password,salt);

  //guardar BD
  await usuario.save();

  res.json({usuario})
}

const userPut = async(req, res = response) =>{
  const id = req.params.id;
  const {_id, password, google, correo, ...resto } = req.body

  //TODO contra dB
  if (password) {
     
    //encriptar pass
  const salt = bcryptjs.genSaltSync(10);
  resto.password = bcryptjs.hashSync(password,salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json({
    msg: 'put API - Controlador',
    usuario
  })
}

const userDelete = async(req, res = response) =>{
  
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  

  res.json({
    usuario
  })
}

const userPatch = (req, res = response) =>{
  res.json({
    msg: 'Patch API - Controlador'
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch
}