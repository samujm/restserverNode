const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async( rol='') =>{ //Buscar que el nombre del rol sea alguno de la base
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        //siempre se regresa un throw
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        //siempre se regresa un throw
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

const existeUsuarioPorId = async( id ) =>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        //siempre se regresa un throw
        throw new Error(`El id no existe${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}