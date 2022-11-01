const { response, request } = require('express');


const usuariosGet = (req = request, res = response)=> { //res = resoonse es para saber que tipo de dato es y vsc muestre las ayudas
    //Se pueden declarar valores por defecto
    //Desestructurar lo que viene en el query
    const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    //http://localhost:8080/api/usuarios?q=hola&apikey=1234567890&page=10
    res.json({
        msg:'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response)=> {

    const {nombre, edad} = req.body;

    res.status(201).json({
        msg:'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response)=> {

    const {id} = req.params;

    res.status(500).json({
        msg:'put API - controlador',
        id
    });
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
