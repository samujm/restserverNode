const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response)=> { //res = resoonse es para saber que tipo de dato es y vsc muestre las ayudas
    //Se pueden declarar valores por defecto
    //Desestructurar lo que viene en el query
    // const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    const {limite =5, desde = 0} = req.query;
    const query = {estado:true};

    // const usuarios = await Usuario.find(query) //Mando la condición en find para que solo traiga los datos que tienen estado igual a true
    //     .skip(Number( desde ))
    //     .limit(Number( limite ));

    // const total = await Usuario.countDocuments(query);//Mando la condición en countDocuments para que solo traiga los datos que tienen estado igual a true

    //Se coloca el await para que no se ejecute el res.json antes de objeter el resultado de las dos promesas 
    const [total, usuarios] = await Promise.all([ //Permite mandar un arreglo con todas las promesas que quiero que se ejecuten
        Usuario.countDocuments(query),
        Usuario.find(query) //Mando la condición en find para que solo traiga los datos que tienen estado igual a true
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]) 


    //http://localhost:8080/api/usuarios?q=hola&apikey=1234567890&page=10
    res.json({
        total,
        usuarios
        // resp
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

const usuariosDelete = async (req, res = response)=> {

    const {id} = req.params;

    //Fisicamente lo borramos (no recomentable)
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Mejor cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true});


    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
