const { Categoria, Role, Usuario, Producto } = require('../models');


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
  
const ExisteCategoria = async (id) => { 
  
  const existecategoria = await Categoria.findById(id)
   if (!existecategoria) {
    console.log(id)
    throw new Error(`El id ${id} no existe`)
   }  
  }

  const ExisteProducto = async (id) => { 
  
  const existeproducto = await Producto.findById(id)
   if (!existeproducto) {
    console.log(id)
    throw new Error(`El id ${id} no existe`)
   }  
  }

  const coleccionPermitida = (coleccion = '', colecciones= []) =>{

    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
      throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true;

  };

    module.exports = {RoleValido,ExisteEmail, ExisteUserId, ExisteCategoria, ExisteProducto, coleccionPermitida};