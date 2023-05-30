const Role = require('../models/role');
const Usuario = require('../models/usuario');


const RoleValido = async (rol = '') => {

      const existeRol = await Role.findOne({rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol } no esta registrado en la BD`)
      }
    }


  //verificar si el correo existe
 const ExisteEmail = async (correo = '') => { 
  const emailexist = await Usuario.findOne({correo})
   if (emailexist) {
    throw new Error(`El correo ${correo} ya esta registrado`)
   }    
  }

const ExisteUserId = async (id) => { 
  const existeusuario = await Usuario.findById(id)
   if (!existeusuario) {
    throw new Error(`El id ${id} no existe`)
   }  
  }
  
    module.exports = {RoleValido,ExisteEmail, ExisteUserId};