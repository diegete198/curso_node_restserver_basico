const { response } = require('express');
const { isValidObjectId } = require('mongoose');
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models');
const usuario = require('../models/usuario');

const coleccionesPermitidas = [

  'usuarios',
  'categoria',
  'productos',
  'roles'
];

const buscarusuarios = async(termino = '', res = response  ) => {

  const esMongoId = ObjectId.isValid(termino);


  if (esMongoId) {

    const usuario = await Usuario.findById(termino)
    return res.json({
      result: ( usuario ) ? [usuario] : []
    });
  }

const regex = new RegExp(termino, 'i')

const usuarios = await Usuario.find({
  $or: [{nombre: regex}, {correo: regex}],
  $and: [{estado: true}]
});
  res.json({
      results: usuarios
  });


}

const buscarcategorias = async(termino = '', res = response  ) => { 

  const esMongoId = ObjectId.isValid(termino);


  if (esMongoId) {

    const categoria = await Categoria.findById(termino)
    return res.json({
      result: ( categoria ) ? [categoria] : []
    });
  }

const regex = new RegExp(termino, 'i')
const categorias = await Categoria.find({nombre: regex, estado: true});
  res.json({
      results: categorias
  });
}

const buscarproductos = async(termino = '', res = response  ) => {

  const esMongoId = ObjectId.isValid(termino);


  if (esMongoId) {

    const producto = await Producto.findById(termino).populate('categoria', 'nombre');
    return res.json({
      result: ( producto ) ? [producto] : []
    });
  }

const regex = new RegExp(termino, 'i')
const productos = await Producto.find({
  $or: [{nombre: regex}, {precio: regex}],
  $and: [{estado: true}]
}).populate('categoria', 'nombre');
  res.json({
      results: productos
  });
}

const buscar = async(req, res = response) =>{

  const {coleccion, termino} = req.params

  if (!coleccionesPermitidas.includes(coleccion)) {
return res.status(401).json({
  msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
})
  }

  switch (coleccion) {
case  'usuarios':
    buscarusuarios(termino, res);
  break;
  case 'categoria':
    buscarcategorias(termino, res);
    break;
case  'productos':
    buscarproductos(termino,res);
  break;

  default: 
  res.status(500).json({
    msg: 'Se me olvido hacer esta busqueda'
  })
}
}

module.exports = {buscar}
