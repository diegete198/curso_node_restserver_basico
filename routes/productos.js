const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, Adminrole, tieneRol, validarJWT} = require('../middleware')
const {ExisteProducto} = require('../helpers/db-validators');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');


const router = Router();

//Obtener todos los productos
router.get('/', obtenerProductos)

//obtener una Producto
router.get('/:id', [
  check('id', `No es un id valido`).isMongoId(),
  check('id').custom(ExisteProducto),
  validarCampos
],obtenerProducto)

//ocrear categoria - privado cualquier rol
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('categoria', 'La categoria es obligatoria').notEmpty(),
  validarCampos
],crearProducto);

//Actualizar - privado cualquier con token valido
router.put('/:id',[
  validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria no se puede modificar').isEmpty(),
    check('id').custom(ExisteProducto),
    validarCampos
  ], actualizarProducto)

  //borrar categoria - privado si es ADMIN
router.delete('/:id', [
    validarJWT,
    Adminrole,
    check('id', `No es un id valido`).isMongoId(),
    check('id').custom(ExisteProducto),
    validarCampos
  ], borrarProducto)

module.exports = router;