const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

 router.post('/login', [
  check('correo', `El correo es obligatorio`).isEmail(),
  check('password', `La contraseña es obligatorio`).notEmpty(),
  validarCampos
 ], login),

 router.post('/google', [
  check('id_token', `El token de google es obligatorio`).notEmpty(),
  validarCampos
 ], googleSingIn),


 module.exports = router;