const { Router } = require('express');
const { check } = require('express-validator');

const { searchAlta } = require('../controllers/search');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//partiendo de  .../api/search
//controla el token y actualiza datos en DB

router.post('/', [
    validarJWT,
    check('search', 'El campo search es obligatorio').not().isEmpty(),
    check('userjde', 'El campo userjde es obligatorio').not().isEmpty(),
    check('oficina', 'El campo oficina es obligatorio').not().isEmpty(),
    check('sucursal', 'El campo sucursal es obligatorio').not().isEmpty(),
    validarCampos
], searchAlta );



module.exports = router;