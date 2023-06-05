const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { response, urlencoded, json } = require("express");


const { subirArchivo } = require("../helpers");
const {Usuario, Producto} = require('../models')



const cargarArchivo = async(req, res = response) =>{

try {

  console.log (req.files)
  // const patharchivo = await  subirArchivo(req.files, ['txt', 'md'], 'texts');
const patharchivo = await  subirArchivo(req.files, undefined, 'imgs');
res.json({
  msg: patharchivo
})
}
catch (error){
  res.status(400).json({msg: error})
}

  // console.log('req.files >>>', req.files); // eslint-disable-line


}


const actualizarArchivo = async(req, res = response) =>{


  const {id, coleccion}=req.params
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un usuario ${id}`})
      }
      break;
        case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un producto ${id}`})
      }
      break;
      default:
        return res.status(500),json({msg: 'Se me olvido subir lo de archivos'})
        break;
  }

//limpiar imagenes previas
if(modelo.img) {
  const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
  }
}

const nombre  = await  subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();


res.json({modelo})

}

const mostrarImagenes = async(req, res = response) => {

  const {id, coleccion} = req.params
    let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un usuario ${id}`})
      }
      break;
        case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un producto ${id}`})
      }
      break;
      default:
        return res.status(500),json({msg: 'Se me olvido subir lo de archivos'})
        break;
  }

//limpiar imagenes previas
if(modelo.img) {
  const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
  if (fs.existsSync(pathImagen)) {
    return res.sendFile(pathImagen)
  }
}

const pathImagenDefatul = path.join(__dirname, '../assets/no-image.jpg')
return res.sendFile(pathImagenDefatul)

}


const actualiazarImagenCloudinary = async(req, res = response) =>{


  const {id, coleccion}=req.params
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un usuario ${id}`})
      }
      break;
        case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({msg: `No existe un producto ${id}`})
      }
      break;
      default:
        return res.status(500),json({msg: 'Se me olvido subir lo de archivos'})
        break;
  }

//limpiar imagenes previas
if(modelo.img) {
//TODO
const nombreArr = modelo.img.split('/');
const nombre = nombreArr[nombreArr.length - 1]
const [public_id] = nombre.split('.');
cloudinary.uploader.destroy(public_id);
}

const {tempFilePath} = req.files.archivo

 const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

// const nombre  = await  subirArchivo(req.files, undefined, coleccion);
  modelo.img = secure_url;

 await modelo.save();


res.json({modelo})

}

module.exports = {cargarArchivo, actualizarArchivo, mostrarImagenes, actualiazarImagenCloudinary};