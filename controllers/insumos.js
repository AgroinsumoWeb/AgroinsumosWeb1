const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const path = require('path');


//data juan
const data = require('../data/data');

const Insumos = require('../models/insumos');


//genera la tabla c/datos del archivo data
const eliminaCollection = async (req = request, res = response) => {

    const resultado = await Insumos.findOne();


    if ( !resultado ) {
        res.json({
            ok: false,
            msg: 'No hay datos en la colleccion'
        })
    }

    await Insumos.deleteMany();
    // Productosjde.remove()
    
    res.json({
        ok: true,
        msg: 'Se eliminaron datos de la colleccion'
    })

}

const concatena = ( arr = [] ) => {

    let texto ='';

    for (let i =0; i < Object.keys( arr ).length ; i ++){
        texto += ( arr[i].drname ) ? arr[i].drname :'' ;
        texto += ( arr[i].drname1 ) ? arr[i].drname1 :'';
    }
    return texto;
}

//genera la tabla c/datos del archivo data
const generaMaestro = async (req = request, res = response) => {

    const total = Object.keys(data).length;
    let arr = [];    

    for (let i = 0; i < Object.keys(data).length ; i ++ ){

        const productoAlta = new Insumos ( { 
            litm: data[i].litm.trim(),
            nombre: data[i].nombre,
            textol: data[i].textol,
            nombre_com: (!data[i].nomcom + data[i].nomcom1)? '': data[i].nomcom + data[i].nomcom1,
            droga: concatena( data[i].droga )
        } );
        arr.push( productoAlta);
        // await productoAlta.save(); //esto es para dar de alta de a un registro a la vez....

    }

    const totalArr = arr.length;

    await Insumos.insertMany( arr ); //genero los registros de manera msiva (todo el array)

    res.json({ 
        msg: `Archivo Insumos - total registros ${ total }`,
        resume: `Total de registros creados en DB: ${totalArr}`
    })
 
}

const buscaProducto = async (req = request, res = response) => {

    const { termino } = req.params;

    let limite = ( Number(req.query.limit) <= 0 || !req.query.limit ) ? 5 : Number(req.query.limit);

    let result = [];

    const expReg = new RegExp( termino, 'i'); 

    result = await Insumos.find({ textol: expReg , estado: true }, { litm: 1, nombre: 1, _id: 0, textol:1, droga: 1 })
        .limit( limite )

    if ( result.length < limite ) { //si no hay nada busco por drogas
        // console.log('busca por droga');
        const dif = limite - result.length;

        result = await Insumos.find({ droga: expReg , estado: true }, { litm: 1, nombre: 1, _id: 0, textol:1, droga: 1 })
            .limit( dif ) 
    } 

    const total = await Insumos.countDocuments( {estado: true} );

    if ( !total > 0 ) {
        res.status(400).json({
            result:'no hay resultado para la busqueda'
        })
    } 

    res.json({
        termino,
        result
    })

}

//sube archivo a carpeta data
const subirArchivo = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 ) {
      res.status(400).json('No files para  uploaded.');
      return;
    }

    if (!req.files.archivo ) {
        res.status(400).json('No se ha subido el archivo.');
        return;
    }
  
    const { archivo } = req.files;
  
    uploadPath = path.join( __dirname, '../data/' + archivo.name );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      res.send('File uploaded to ' + uploadPath);
    });
}


module.exports = {
    generaMaestro,
    buscaProducto,
    eliminaCollection,
    subirArchivo
}