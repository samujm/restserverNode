
const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido } = require('../helpers/db-validators');

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
    check('nombre', 'El nombre no es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROL']),
    check('rol').custom( esRolValido /* (rol) => esRolValido(rol) */ ),//Custom recibe como argumento el valor que estoy evaluando (en este caso el body el rol)
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;
