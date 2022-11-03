const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response)=> { //res = resoonse es para saber que tipo de dato es y vsc muestre las ayudas
    //Se pueden declarar valores por defecto
    //Desestructurar lo que viene en el query
    // const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    const {limite =5, desde = 0} = req.query;

    const usuarios = await Usuario.find()
        .skip(Number( desde ))
        .limit(Number( limite ));


    //http://localhost:8080/api/usuarios?q=hola&apikey=1234567890&page=10
    res.json({
        usuarios
    });
}

const usuariosPost = async (req, res = response)=> {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya está registrado'
    //     });
    // } 


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar en base de datos
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosPut = async (req, res = response)=> {

    const { id } = req.params;
    const { _id, password, google,correo,  ...resto } = req.body;

    //Todo: validar contra base de datos

    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto, {new:true});

    res.json(usuario);
}

const usuariosPatch = (req, res = response)=> {
    res.json({
        msg:'patch API - controlador'
    });
}

const usuariosDelete = (req, res = response)=> {
    res.json({
        msg:'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
