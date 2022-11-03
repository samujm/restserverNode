const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async( rol='') =>{ //Buscar que el nombre del rol sea alguno de la base
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        //siempre se regresa un throw
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async( correo ) =>{
    const existeEmail = await usuario.findOne({correo});
    if (existeEmail) {
        //siempre se regresa un throw
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}
module.exports = {
    esRolValido,
    emailExiste
}