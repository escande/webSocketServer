const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server{

    constructor(){
        

        this.paths = {};

        this.PORT = process.env.PORT || 3001;
        this.app = express();

        //Usamos socket.io junto con express, http ya va incorporado en node
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        this.sockets();
    }

    async conectarDb(){
        await dbConnection();
    }

    //Middlewares
    middlewares(){
        
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        //this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes(){

        //this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    //Eventos de sockets
    sockets(){

        this.io.on('connection', socketController);

    }

    listen(){

        //Usamos server en vez de app
        this.server.listen(this.PORT, console.log('Servidor iniciado en el puerto', this.PORT));

        this.app.get('/', (req, res) => {

            //res.sendFile('index.html');
            res.sendFile('index.html');
        });
    }
}

module.exports = Server;