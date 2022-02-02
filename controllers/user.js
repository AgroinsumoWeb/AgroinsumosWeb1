const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/genera-jwt');


const loginUser = async (req = request, res = response) => {

    const { username, password } = req.body;

    try {

        //controlar el correo
        const usuario = await User.findOne({ username });
        const estado = usuario.estado;

        if ( !usuario ){
            return res.status(400).json({
                msg: 'El usuario/clave no es correcto'
            })
        }

        //contorlar si el suaurio esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            })
        }

        //verificar contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password ) //compara el pass recibido en el body contra el de la DB y devuelve T o F 
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'El pass/clave no es correcto'
            })
        }

        //generar JWT
        const token = await generarJWT( usuario.id );

        
        res.json({
            username,
            estado,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error no detectado... OJO'
        })
    }
}

const newUser = async (req = request, res= response) => {

    const { username, password } = req.body;
    const usuario = new User( {username, password} ); //crea la instancia en mongo.

    const salt = bcryptjs.genSaltSync(); 

    usuario.password = bcryptjs.hashSync( password, salt ); 

    await usuario.save(); 

    res.json({
        msg: 'Alta de user - OK'        
    });
}


module.exports = {
    loginUser,
    newUser
}
