const {response} = require('express')

const Adminrole = (req, res = response, next) =>{

if (!req.usuario) {
  return res.status(500).json({
    msg: 'Se quiere verificar sin validar el token'
  })
}

const {rol, nombre} = req.usuario;

if (rol !== 'ADMIN_ROLE') {
  return res.status(401).json({
    msg: `El ${nombre} no tiene permisos`
  })
}

  next();

}

const tieneRol = (...roles) =>{

  return (req, res = response, next) => {
    console.log(roles, req.usuario.rol)
    if(!roles.includes(req.usuario.rol)) {
        return res.status(401).json({
    msg: `El servicio requiere uno de estos roles: ${roles}`
  })

    }

    next();
  }

}


module.exports = {Adminrole, tieneRol}