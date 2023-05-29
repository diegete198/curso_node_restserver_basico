const {response, request} = require('express')

const  userGet = (req = request, res = response) =>{

  const {q, nombre = 'No Name', apikey, page = 1, limit = 10} = req.query;

  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  })
}

const userPost = (req, res = response) =>{
  
  const {nombre, edad} = req.body;
  res.json({
    msg: 'post API - Controlador',
    nombre, edad
  })
}

const userPut = (req, res = response) =>{
  const id = req.params.id;

  res.json({
    msg: 'put API - Controlador',
    id
  })
}

const userDelete = (req, res = response) =>{
  res.json({
    msg: 'delete API - Controlador' 
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