const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        //esta instrucion es para generar y firmar un nuevo JWT
        jwt.sign( payload, process.env.SECRET_PRIVATEKEY, {
            expiresIn: '12h' //tiene muchos parametros el mas usado es el timpo de vida del token
        }, ( err, token )=> {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token, favor revisar el error e consola');
            } else {
                resolve(token);
            }
        });
    })

}


module.exports = {
    generarJWT
}

