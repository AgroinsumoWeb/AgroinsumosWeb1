const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Searchs = require('../models/search');

const { generarJWT } = require('../helpers/genera-jwt');


const searchAlta = async (req = request, res= response) => {

    const { search, userjde, oficina, sucursal } = req.body;

    const usuario = req.usuarioAut._id;

    const searchAlta = new Searchs( { search, userjde, oficina, sucursal, usuario } ); 

    await searchAlta.save(); 

    res.json({
        msg: 'Alta de de busquedas - OK',
        searchAlta
    });
}


module.exports = {
    searchAlta
}
