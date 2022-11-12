const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req, res = response)=>{

    const { correo, password } = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo',
            });
        }

        //Verificar si en usuario está activo en la base
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false',
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password',
            });
        }

        //General el JWT
        const token = await generarJWT(usuario.id);


        //Solo se debe ejecutar un solo res.json en todo el flujo del controlador
        res.json({
            // msg: 'Login ok',
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con  el administrador'
        });
    }

}

module.exports = {
    login
}