const express = require('express');
const app = express();
var cors = require('cors'); 
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        //Crear la aplicación de express como una propiedad al instanciar
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares: Funciones que van a añadir otra funcionalidad al webserver
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Use: Palabra clave para saber que es un middleware
        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){   
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;