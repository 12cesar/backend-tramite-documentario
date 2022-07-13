class Usuario {

    id= '';
    nombre= '';
    area= '';

    constructor( id= '' ) { 
        
        this.id = id;
        this.nombre = 'sin-nombre';
        this.area   = 'sin-sala';

    }

}

module.exports = {
    Usuario
}