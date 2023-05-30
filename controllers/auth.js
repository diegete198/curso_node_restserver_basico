const { response } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

const {correo, password} = req.body;

try{

  //Ver rificar email
const usuario = await Usuario.findOne({correo});

if (!usuario) {
  return res.status (400).json({
    msg: `Usuario con el correo ${correo} no existe`
  })
}

  //Verificar si el usuario esta activo
  if (!usuario.estado) {
  return res.status (400).json({
    msg: `El usuario no esta activo`
  })
}


  //verificar la contraseña
  const validapwd = bcryptjs.compareSync(password, usuario.password);
  if (!validapwd) {
     return res.status (400).json({
    msg: `El password esta incorrecto`
  })
  }

  //verificat JWT
const token = await generarJWT(usuario.id);


    res.json({
    msg: "Login ok",
    usuario, token
  })

}
catch (error){
  console.log(error)
    return res.status(500).json({
    msg: "Error algo salio mal",
    correo, password
 })
}
}

module.exports = {login}