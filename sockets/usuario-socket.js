const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const {Usuarios} = require("../classes/usuario-lista");

const usuariosConectados = new Usuarios();


const conectarCliente = ( cliente= Socket, io= socketIO.Server ) => {

    usuariosConectados.agregar( cliente.id,'sin-nombre','sin-nombre' );
    console.log(usuariosConectados.getpersonas());

}

const desconectarCliente = (cliente=Socket, io=socketIO.Server)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getpersonas());
    })
}

const configurarUsuario =(cliente= Socket, io=socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload= {usuario,area}, callback= Function)=>{
        usuariosConectados.actualizarNombre(cliente.id, payload.usuario, payload.area);
        io.emit('usuarios-activos',usuariosConectados.getpersonas());
        callback({
            ok:true,
            mensaje:`Usuario ${payload.usuario} configurado`
        })
    });
}
const crearDocInter = async(cliente=Socket, io=socketIO.Server)=>{
    cliente.on('crear-documento-interno', (data,callback)=>{
        const personas =  usuariosConectados.getUsuario(cliente.id);
        cliente.broadcast.emit(`crear-documento-interno-${personas.area}`,'se creo documento interno');
        console.log(cliente.id);
        callback({
            ok:true,
            msg:'Se creo dcoumento con exito',
            personas
        })
    })
}
const firmarDocInter = async(cliente=Socket, io=socketIO.Server)=>{
    cliente.on('agregar-firma-interno', (data,callback)=>{
        const personas =  usuariosConectados.getUsuario(cliente.id);
        cliente.broadcast.emit(`agregar-firma-interno-${personas.area}`,'se creo documento interno');
        console.log(cliente.id);
        callback({
            ok:true,
            msg:'Se firmo documento con exito',
            personas
        })
    })
}
module.exports = {
    conectarCliente,
    configurarUsuario,
    desconectarCliente,
    crearDocInter,
    firmarDocInter
}