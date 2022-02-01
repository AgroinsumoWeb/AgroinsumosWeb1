const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

const fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.entorno = process.env.ENT;

        this.paths = {
            login:      '/api/login',
            search:     '/api/search',
            upload:     '/api/upload',
            eliminar:     '/api/eliminar',
            incremental:'/api/incremental'
        }


        //conectar DB
        this.connectDB();

        //midlewares
        this.middlewares();

        //ruters
        this.routers();
    }

    async connectDB() {
        //entornos DEV y PROD
        await dbConnection( this.entorno );
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del JSON
        this.app.use( express.json() ) 

        this.app.use( express.static('public') );

        this.app.use( fileUpload ({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true 
        }));
    }

    routers() { 
        this.app.use(this.paths.login, require('../routes/login'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.upload, require('../routes/upload'));
        this.app.use(this.paths.eliminar, require('../routes/eliminar'));
        this.app.use(this.paths.incremental, require('../routes/incremental'));
    }

    listen() {
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en el puerto: ', this.port);
          } );
    }

}


module.exports = Server;