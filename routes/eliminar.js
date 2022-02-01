const { Router } = require('express')

const { eliminaCollection } = require('../controllers/insumos');

const router = Router();

//se parte de este path {{url}}/api/eliminar

//falta agregar controles para pasar la collecction en el body
router.get('/', eliminaCollection);

module.exports = router;