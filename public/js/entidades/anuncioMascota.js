
import Anuncio from './anuncio.js';

export default class Anuncio_Mascota extends Anuncio{
    constructor(id,titulo,descripcion,precio,animal,raza,fecha,vacuna){
        
        super(id, titulo, descripcion, precio);

        this.animal = animal;
        this.raza = raza;
        this.fecha = fecha;
        this.vacuna = vacuna;
    }

    set Animal(animal){          //actua como propiedad
        this.animal = animal;
    }
    get Animal(){       
        return this.animal;
    }
    set Raza(raza){          //actua como propiedad
        this.raza = raza;
    }
    get Raza(){       
        return this.raza;
    }

    set Fecha(fecha){          //actua como propiedad
        this.fecha = fecha;
    }
    get Fecha(){       
        return this.fecha;
    }

    set Vacuna(vacuna){          //actua como propiedad
        this.vacuna = vacuna;
    }
    get Vacuna(){       
        return this.vacuna;
    }

}