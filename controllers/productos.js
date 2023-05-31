const { response } = require('express')
const {Producto, Categoria} = require('../models');




const crearProducto = async(req, res = response) =>{

const { descripcion, precio, disponible} = req.body;
const categoria = req.body.categoria.toUpperCase();
const nombre = req.body.nombre.toUpperCase();
const productoDB = await Producto.findOne({nombre})


if (productoDB) {
  return res.status(400).json({
    msg: `El Producto ${nombre} ya existe en la db`
  })
}

const categoriaDB = await Categoria.findOne({nombre: categoria})


if (!categoriaDB) {
  return res.status(400).json({
    msg: `La categoria ${categoria} no existe en el catalogo`
  })
} else if(categoriaDB.estado === false) {
  return res.status(400).json({
    msg: `La categoria ${categoria} no esta activa`
  })
}

const data = {
  nombre,
  precio,
  categoria: categoriaDB._id,
  descripcion,
  disponible,
  usuario: req.usuario._id
}

const producto = await new Producto(data);
await producto.save();

res.status(201).json(producto);

}

//Obtener Productos paginado y opcional y total - populate
const obtenerProductos = async(req = request, res = response) =>{

const {limite = 5, desde = 0} = req.query
const query = {estado : true};

const [total, productos] = await Promise.all([
  Producto.countDocuments(query),
  Producto.find(query)
   .populate('usuario', 'nombre')
   .populate('categoria', 'nombre')
   .skip(desde)
  .limit(limite)
])

  res.json({
    total,
    productos
  })
}

//Obtener Producto por ID
const obtenerProducto = async(req, res = response) => {

  const {id} = req.params;
  const producto = await Producto.findById(id).populate('usuario', 'nombre');

res.json(producto);

}


//Actualizar categoria por nombre cambiar
const actualizarProducto = async(req, res = response) =>{
  const id = req.params.id;
  const {usuario, estado, categoria, ...resto } = req.body

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, resto, { new:true })

  res.json({
    msg: 'Categoria Actualizada',
    producto
  })
}

//Borrar Producto  cambiar el estado a false
const borrarProducto = async(req, res = response) =>{
  
  const { id } = req.params
  const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.json({
    producto
  })
}

module.exports = {crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto}