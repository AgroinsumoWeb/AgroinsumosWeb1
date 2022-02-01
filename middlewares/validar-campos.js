const { response, request } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = ( req = request, res = response, next ) => {

    const error = validationResult(req);
    
    if( !error.isEmpty() ) { //si es distinto de vacio es decir que tiene algun error
        return res.status(400).json( error );
    }

    next(); 

}


module.exports = {
    validarCampos
}