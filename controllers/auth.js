const { response, json } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response) =>{

const {id_token} = req.body;

try{

  const  {correo, nombre, img} = await googleVerify(id_token);
  
  //Verificar si el correo existe
  let usuario = await Usuario.findOne({correo});


  if (!usuario) {
  //crearlo
  const data = {
    nombre,
    correo,
    password: ':P',
    img,
    google: true,
    rol: 'USER_VALUE'
  };

  usuario = new Usuario(data);
  console.log("diego",usuario)
   await usuario.save();
   
}

//usuario no esta activo
if(!usuario.estado ) {
  return res.status(401).json({
    msg: 'Usuario no esta activo'
  })
}

const token = await generarJWT(usuario.id);


    res.json({
    usuario,
    token,
      msg: "Login ok!! google sig-in"
  })

}
catch (error){
  res.status(400).json({
    ok: false,
    msg: 'El token no se pudo verificar'
  })
}

}


module.exports = {login, googleSingIn}