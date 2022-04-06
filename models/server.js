const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const http = require('http');
const socketIO = require('socket.io');
const { conectarCliente } = require('../sockets/usuario-socket');
const sequelize = require('../db/dbMysql');
class Server{
    static _intance=Server;
    io=socketIO.Server;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users:'/api/user',
            cargos:'/api/cargo',
            direccion:'/api/direccion',
            area:'/api/area',
            userarea:'/api/userarea',
            authuser:'/api/authuser',
            userexterno:'/api/userexterno',
            validsunat:'/api/validsunat',
            tipoPersona:'/api/tipopersona',
            remitente:'/api/remitente',
            tipodocumento:'/api/tipodocumento',
            estadodocumento:'/api/estadodocumento',
            estadotramite:'/api/estadotramite',
            estructura:'/api/estructura',
            uploadestruc:'/api/uploadestructura',
            tramiteinter:'/api/tramiteinterno'
        }
        //Connect to socket
        this.httpServer = http.createServer(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors:{
                origin:true,
                credentials:true
            }
        })
        // Connect to database
        this.connectDB();
        //  listen Sockets
        this.listenSockets();
        // Middlewares
        this.middlewares();
        // Routes application
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async connectDB(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente=>{
            console.log('Cliente conectado');
            conectarCliente(cliente, this.io);
        })
    }
    middlewares(){
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        
    }
    routes(){
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.cargos, require('../routes/cargo'));
        this.app.use(this.paths.direccion, require('../routes/direccion'));
        this.app.use(this.paths.area, require('../routes/area'));
        this.app.use(this.paths.userarea, require('../routes/userarea'));
        this.app.use(this.paths.authuser, require('../routes/authuser'));
        this.app.use(this.paths.userexterno, require('../routes/user-externo'));
        this.app.use(this.paths.tipoPersona, require('../routes/tipo-persona'));
        this.app.use(this.paths.validsunat, require('../routes/validar-sunat'));
        this.app.use(this.paths.remitente, require('../routes/remitente'));
        this.app.use(this.paths.tipodocumento, require('../routes/tipo-documento'));
        this.app.use(this.paths.estadodocumento, require('../routes/estado-documento'));
        this.app.use(this.paths.estadotramite, require('../routes/estado-tramite'));
        this.app.use(this.paths.estructura, require('../routes/estructura'));
        this.app.use(this.paths.uploadestruc, require('../routes/upload-estructura'));
        this.app.use(this.paths.tramiteinter, require('../routes/tramite-interno'));
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;