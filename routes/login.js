const { Router } = require('express');
const { check } = require('express-validator');


const { loginUser, usuarioPost } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUser );


router.post('/', [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuarioPost );

// router.post('/', (req, res )=>{
//     res.json({
//         ok: true,
//         msg: 'okkk new'
//     });
// });


module.exports = router;