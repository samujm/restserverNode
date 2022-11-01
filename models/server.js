const express = require('express');
const app = express();
var cors = require('cors'); 

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

        //CORS
        this.app.use(cors());


        //Use: Palabra clave para saber que es un middleware
        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.get('/api', (req, res)=> {
            res.json({
                msg:'Get API'
            })
        });

        this.app.put('/api', (req, res)=> {
            res.status(500).json({
                msg:'put API'
            })
        });

        this.app.post('/api', (req, res)=> {
            res.status(201).json({
                msg:'post API'
            })
        });

        this.app.delete('/api', (req, res)=> {
            res.json({
                msg:'delete API'
            })
        });
    }

    listen(){   
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;