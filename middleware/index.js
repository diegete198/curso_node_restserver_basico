

const  validaCampos = require('../middleware/validar-campos')
const  validaroles = require('../middleware/validar-roles');
const  validarJWT  = require('../middleware/validar-jwt');

module.exports = {
...validaCampos,
...validarJWT,
...validaroles
}