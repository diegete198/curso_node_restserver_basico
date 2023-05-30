const { Router } = require('express');
const { check } = require('express-validator')

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user');

// const {validarCampos} = require('../middleware/validar-campos')
// const { Adminrole, tieneRol } = require('../middleware/validar-roles');
// const { validarJWT } = require('../middleware/validar-jwt');
const {validarCampos, Adminrole, tieneRol, validarJWT} = require('../middleware')

const {RoleValido, ExisteEmail, ExisteUserId} = require('../helpers/db-validators');



const router = Router();

 router.get('/', userGet)

  router.put('/:id',[
    check('id', `No es un id valido`).isMongoId(),
    check('id').custom(ExisteUserId),
    check('rol').custom(RoleValido),
    validarCampos
  ], userPut)

  router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio y mas de 6 caracteres').notEmpty().isLength({min:6}),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(RoleValido),
    check('correo').custom(ExisteEmail),
    validarCampos
  ], userPost)

  router.delete('/:id', [
    validarJWT,
    // Adminrole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', `No es un id valido`).isMongoId(),
    check('id').custom(ExisteUserId),
    validarCampos
  ], userDelete)

  router.patch('/', userPatch)


module.exports = router;