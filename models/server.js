const express = require('express');
const app = express();

class Server {
    constructor(){
        //Crear la aplicación de express como una propiedad al instanciar
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares: Funciones que van a añadir otra funcionalidad al webserver
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){

        //Use: Palabra clave para saber que es un middleware
        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.get('/api', (req, res)=> {
            res.send('Hello World')
        });
    }

    listen(){   
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;