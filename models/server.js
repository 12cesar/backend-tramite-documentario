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
            authuser:'/api/authuser'
        }
        //Connect to socket
        this.httpServer = new http.Server(this.app);
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
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;