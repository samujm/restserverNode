const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) =>{
    //Valida los errores que el controlador manda con el express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos
}