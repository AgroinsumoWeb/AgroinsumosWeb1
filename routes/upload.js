const { Router } = require('express')

const { generaMaestro, subirArchivo } = require('../controllers/insumos');

const router = Router();

//se parte de este path {{url}}/api/upload

router.post('/', subirArchivo );

router.get('/', generaMaestro);

module.exports = router;