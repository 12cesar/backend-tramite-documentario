const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const http = require('http');
const socketIO = require('socket.io');
const { conectarCliente, desconectarCliente,configurarUsuario, crearDocInter, firmarDocInter } = require('../sockets/usuario-socket');
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
            documentointerno:'/api/documentointerno',
            tramiteinter:'/api/tramiteinterno',
            tramiteexter:'/api/tramiteexterno',
            derivadointer:'/api/derivadointerno',
            derivadoexter:'/api/derivadorexterno',
            recepcion:'/api/recepcion',
            destinointer:'/api/destinointerno',
            seguimientointer:'/api/seguimientointerno',
            firmadocumentinter:'/api/firmadocumentointerno',
            anexointerno:'/api/anexointerno',
            mostraranexo:'/api/mostraranexo',
            tipoenvio:'/api/tipoenvio',
            respuestatramite:'/api/respuestatramite',
            detalledestinointerno:'/api/detalledestinointerno',
            pdf:'/api/pdf'
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
            
            conectarCliente(cliente, this.io);
            configurarUsuario(cliente,this.io);
            crearDocInter(cliente,this.io);
            firmarDocInter(cliente,this.io);
            desconectarCliente(cliente,this.io);
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
        this.app.use(this.paths.documentointerno, require('../routes/documento-interno'));
        this.app.use(this.paths.tramiteinter, require('../routes/tramite-interno'));
        this.app.use(this.paths.derivadointer, require('../routes/derivado-interno'));
        this.app.use(this.paths.tramiteexter, require('../routes/tramite-externo'));
        this.app.use(this.paths.derivadoexter, require('../routes/derivado-externo'));
        this.app.use(this.paths.recepcion, require('../routes/recepcion'));
        this.app.use(this.paths.destinointer, require('../routes/destinos-interno'));
        this.app.use(this.paths.seguimientointer, require('../routes/seguimiento-interno'));
        this.app.use(this.paths.firmadocumentinter, require('../routes/firmaDocumentoInterno'));
        this.app.use(this.paths.anexointerno, require('../routes/pdfAnexo'));
        this.app.use(this.paths.mostraranexo, require('../routes/mostrarAnexo'));
        this.app.use(this.paths.tipoenvio, require('../routes/tipo-envio'));
        this.app.use(this.paths.respuestatramite, require('../routes/respuesta-tramite'));
        this.app.use(this.paths.detalledestinointerno, require('../routes/detalle-destino-interno'));
        this.app.use(this.paths.pdf, require('../routes/pdf'));
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;