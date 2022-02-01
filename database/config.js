const mongoose = require('mongoose');

const dbConnection = async ( entorno ) => {

    try {
        // console.log(process.env.MONGODB_CNN);

        if ( entorno === 'DEV') {
            await mongoose.connect( process.env.MONGODB_URI_DEV, {
                // useNewUrlParse: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
                // useFindAndModify: false
            });
            console.log(`DB - ${entorno} - Online....`);
        } else {
            await mongoose.connect( process.env.MONGODB_URI_PROD, {
                // useNewUrlParse: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
                // useFindAndModify: false
            });
            console.log(`DB - ${entorno} - Online....`);
        }


    } catch (error) {
        console.log(error);
        throw new Error ('Error al iniciar la DB');
    }



}

module.exports = dbConnection;
