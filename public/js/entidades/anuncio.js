

export default class Anuncio{
    constructor(id,titulo,descripcion,precio){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = "ventas";
        this.descripcion = descripcion;
        this.precio = precio;
    }

    set Titulo(titulo){          //actua como propiedad
        this.titulo = titulo;
    }
    get Titulo(){       
        return this.titulo;
    }
    set Descripcion(descripcion){          //actua como propiedad
        this.descripcion = descripcion;
    }
    get Descripcion(){       
        return this.descripcion;
    }

}