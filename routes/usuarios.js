
const {Router} = require('express');
const { check } = require('express-validator');
const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');

//Router permite llamar la funcion router
const router = Router();


router.get('/', usuariosGet);

router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;
