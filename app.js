//Establezca el archivo .env y tome las variables de entorno
require('dotenv').config();
const Server = require('./models/server');

//Instancia del servidor
const server = new Server();

//Lanzar el metodo listen
server.listen();


