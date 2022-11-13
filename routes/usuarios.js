
const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

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
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROL']),
    check('rol').custom( esRolValido /* (rol) => esRolValido(rol) */ ),//Custom recibe como argumento el valor que estoy evaluando (en este caso el body el rol)
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos //No olvidar poner la funcion para validar los campos en todas, esto rompe que continue a la ruta usuariosPut si existe un error
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','OTRO_ROLE'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);


module.exports = router;
