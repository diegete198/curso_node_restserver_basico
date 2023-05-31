const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const {validarCampos, Adminrole, tieneRol, validarJWT} = require('../middleware')
const {ExisteCategoria} = require('../helpers/db-validators');

const router = Router();

//Obtener todas la caegorias -- publico
router.get('/', obtenerCategorias)

//obtener una categoria
router.get('/:id', [
  check('id', `No es un id valido`).isMongoId(),
  check('id').custom(ExisteCategoria),
  validarCampos
],obtenerCategoria)

//ocrear categoria - privado cualquier rol
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligagtorio').notEmpty(),
  validarCampos
],crearCategoria);

//Actualizar - privado cualquier con token valido
router.put('/:id',[
  validarJWT,
    check('nombre', 'El nombre es obligagtorio').notEmpty(),
    check('id').custom(ExisteCategoria),
    validarCampos
  ], actualizarCategoria)

//borrar categoria - privado si es ADMIN
router.delete('/:id', [
    validarJWT,
    Adminrole,
    check('id', `No es un id valido`).isMongoId(),
    check('id').custom(ExisteCategoria),
    validarCampos
  ], borrarCategoria)



 module.exports = router;