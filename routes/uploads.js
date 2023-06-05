const { Router } = require('express');
const { check } = require('express-validator');
const {cargarArchivo, actualizarArchivo, mostrarImagenes, actualiazarImagenCloudinary} = require('../controllers/uploads');
const { coleccionPermitida } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middleware');

const router = Router();

router.post('/', validarArchivoSubir,cargarArchivo)

router.put('/:coleccion/:id', [
  check('id', 'El id debe ser un id de Mongo').isMongoId(),
  check('coleccion').custom(c => coleccionPermitida(c, ['usuarios', 'productos'])),
  validarArchivoSubir,
  validarCampos
], actualiazarImagenCloudinary)
// ], actualizarArchivo )

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser un id de Mongo').isMongoId(),
  check('coleccion').custom(c => coleccionPermitida(c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImagenes)


 module.exports = router;