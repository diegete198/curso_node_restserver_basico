const { response, json } = require('express')
const {Categoria} = require('../models');

//Obtener Categorias paginado y opcional y total - populate
const obtenerCategorias = async(req = request, res = response) =>{

const {limite = 5, desde = 0} = req.query
const query = {estado : true};

const [total, categorias] = await Promise.all([
  Categoria.countDocuments(query),
  Categoria.find(query)
   .populate('usuario', 'nombre')
   .skip(desde)
  .limit(limite)
])

  res.json({
    total,
    categorias
  })
}


//Obtener categortia y populate regresa el objeto

const obtenerCategoria = async(req, res = response) => {

const {id} = req.params;
const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

res.json(categoria);

}




const crearCategoria = async(req, res = response) =>{

const nombre = req.body.nombre.toUpperCase();

const categoriaDB = await Categoria.findOne({nombre})

if (categoriaDB) {
  return res.status(400).json({
    msg: `La categoria ${nombre} ya existe en la db`
  })
}

const data = {
  nombre,
  usuario: req.usuario._id
}

const categoria = await new Categoria(data);
await categoria.save();

res.status(201).json(categoria);

console.log(data)


}


//Actualizar categoria por nombre cambiar
const actualizarCategoria = async(req, res = response) =>{
  const id = req.params.id;
  const {usuario, estado, ...resto } = req.body

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, resto, { new:true })

  res.json({
    msg: 'Categoria Actualizada',
    categoria
  })
}


//Borrar Categoria  cambiar el estado a false
const borrarCategoria = async(req, res = response) =>{
  
  const { id } = req.params
  const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.json({
    categoria
  })
}


module.exports = {crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria}