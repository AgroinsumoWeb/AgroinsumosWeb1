const { Router } = require('express');
const { check } = require('express-validator');


const { loginUser, newUser } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUser );


router.post('/usernew', [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], newUser );


module.exports = router;