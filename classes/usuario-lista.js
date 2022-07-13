//const Usuario = require("./usuario");

class Usuarios {

     
     //persona=[];

    constructor() {
        this.personas=[];
     }

    // Agregar un usuario
    agregar( id,nombre, area ) {
        let persona = {id,nombre,area};
        this.personas.push(persona);
        return this.personas;
    }
    actualizarNombre( id= '', nombre= '', area='' ) {

        for( let usuario of this.personas ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                usuario.area = area
                break;
            }

        }


        console.log('===== Actualizando usuario ====');
        console.log( this.personas );

    }
    // Obtener personas de usuarios
    getpersonas() {
        return this.personas.filter(usuario=> usuario.nombre != '');
    }

    // Obtener un usuario
    getUsuario(id) {

        return this.personas.find( usuario => usuario.id === id );

    }

    // Obtener usuario en una sala en particular
    getUsuariosEnSala( sala= '' ) {

        return this.personas.filter( usuario =>usuario.sala === sala );

    }

    // Borrar Usuario
    borrarUsuario( id= '' ) {

        const tempUsuario = this.getUsuario( id );

        this.personas = this.personas.filter( usuario => usuario.id !== id );

        return tempUsuario;
        
    }
}

module.exports = {
    Usuarios
}