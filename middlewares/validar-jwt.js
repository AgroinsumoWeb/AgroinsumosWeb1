const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user'); 


const validarJWT = async (req = request, res = response, next ) => {

    const token = req.header('x-token');
    // console.log(token);

    if ( !token) {
        res.status(401).json({
            msg: 'El token no ha sido informado'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_PRIVATEKEY );

        //busco el usuario autenticado en el token
        const usuario = await User.findById( uid );

        //controlo que el usuario uid posea estado = true
        if ( !usuario ){
            return res.status(401).json({
                msg: 'El usuario no existe en la DB'
            })
        }

        // if ( !usuario.estado ){
        //     return res.status(401).json({
        //         msg: 'Usuario invalido o Deshabilitado - estado no correcto'
        //     })
        // }

        req.usuarioAut = usuario;

        // req.username = uid; 
        
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'El token no es valido'
        })
    }

}


module.exports = {
    validarJWT
}