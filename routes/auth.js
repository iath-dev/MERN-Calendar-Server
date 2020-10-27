/**
 * Rutas del usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { signup, login, renew } = require('../controllers/auth')
const fieldValidator = require('../middlewares/fieldValidator');

router.post(
    '/',
    [
        check('email').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    login
)

router.post(
    '/signup',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo debe ser un correo valido').isEmail(),
        check('password', 'La contraseña debe ṕoseer mas de 5 caracteres').isLength({ min: 5 }),
        fieldValidator
    ],
    signup
)

router.get('/renew', renew)

module.exports = router