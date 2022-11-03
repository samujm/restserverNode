const Role = require('../models/role');

const esRolValido = async( rol='') =>{ //Buscar que el nombre del rol sea alguno de la base
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

module.exports = {
    esRolValido
}