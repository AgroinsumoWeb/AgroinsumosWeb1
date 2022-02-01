const { Router } = require('express')
const { check } = require('express-validator');

const { buscaProducto } = require('../controllers/insumos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//se parte de este path {{url}}/api/incremental

router.get('/:termino', [
    validarJWT,
    check('termino', 'Se debe especificar el termino de busqueda - es obligatorio').not().isEmpty(),
    // check('tipo', 'Se debe especificar el tipo de busqueda - es obligatorio').not().isEmpty(),
    validarCampos
], buscaProducto );

module.exports = router;