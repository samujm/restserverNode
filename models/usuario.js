// {
//     nombre:'',
//     correo:'dsdfs@dfdf.com',
//     password:'3534543543',
//     img:'32432432',
//     rol:'edwfrd',
//     estado: true,
//     google: true //Si el usuario fue creado con google o con mi autentificación
// }

const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});


//Sobreescribir el metodo toJSON, debe ser una funcion normal
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject(); //Saca __v y password y todos los demas los almacena en usuario
    usuario.uid = _id;
    return usuario; //Retorna usuario, pero unicamente los datos que quiere mostrar
}


module.exports = model('Usuario', UsuarioSchema); //Nombre que le quiero dar y el esquema
