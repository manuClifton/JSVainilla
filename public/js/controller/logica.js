
import Anuncio_Mascota from '../entidades/anuncioMascota.js';
import {
    crearTabla,
    limpiar
} from '../entidades/tabla.js';

const URL = "https://test-sergicode.netlify.app/.netlify/functions/index/mascotas";


export function obtenerMascotasXhr(){
    return new Promise( (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        let datos= [];
        console.log('Contenido de datos:', datos);
        xhr.addEventListener('readystatechange', ()=>{

            if(xhr.readyState == 4){ 
                if(xhr.status >= 200 && xhr.status < 300){
                    //Si todo sale bien
                    datos = JSON.parse(xhr.responseText);
                    const mascotas = [];
                        if (Array.isArray(datos)) {
                            datos.forEach(element => {
                                const mascotaOrdenada = new Anuncio_Mascota(
                                    element.id,
                                    element.titulo,
                                    element.descripcion,
                                    element.precio,
                                    element.animal,
                                    element.raza,
                                    element.fecha,
                                    element.vacuna
                                );
                                mascotas.push(mascotaOrdenada);
                            });
                        }
                    resolve(mascotas);
                }else{
                    //salio todo mal
                    let mensaje = xhr.statusText || "Se produjo un ERROR";
                    reject( {status: xhr.status, statusText: mensaje} );
                }
            }
        });
        xhr.open('GET', URL);
        xhr.send();
    })
}


export function altaMascota(frm){
    const nuevaMascota = {
        "titulo": frm.titulo.value,
        "descripcion": frm.descripcion.value,
        "precio": parseInt(frm.precio.value),
        "animal":frm.animal.value,
        "raza": frm.raza.value,
        "fecha": frm.fecha.value,
        "vacuna": frm.vacuna.value
    };
    const config = {
        method: 'POST',
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevaMascota)
    };

    return fetch(URL, config)  //POST con configuracion y datos
    .then((response)=>{
        if(!response.ok) {
            throw new Error(`Error al agregar la mascota: ${response.status} - ${response.statusText}`);
        }
        return response.json(); //devuelve una promesa que es no bloqueante
    })
    .then((mascotaAgregada)=>{
        console.log("Mascota agregada correctamente:", mascotaAgregada);
        return true;
    })
    .catch((err)=>{
        console.error("Error al agregar la mascota:", err.message);
        return false;
    });
}

export function bajaMascotaXhr(id){
    try {
        return new Promise( async ( resolve, reject ) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener( 'readystatechange', () => {
                if ( xhr.readyState == 4 ) {
                    if ( xhr.status >= 200 && xhr.status < 300 ) {
                        resolve( true );
                    } else {
                        let mensaje = xhr.statusText || 'Se produjo un ERROR';
                        reject(  { status: xhr.status, statusText: mensaje } );
                    }
                }
            });
            xhr.open( 'DELETE', `${URL}/${id}` );
            xhr.setRequestHeader( 'Content-type', 'application/json;charset=utf-8' );
            xhr.send( );
        });

    } catch ( err ) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export function modificarMascota(mascota){
    try {
        let id = mascota.id;
            mascota.precio = parseInt(mascota.precio);
            delete mascota.id;
        return new Promise( async ( resolve, reject ) => {
            const xhr = new XMLHttpRequest();
    
            xhr.addEventListener( 'readystatechange', () => {
                if ( xhr.readyState == 4 ) {
                    if ( xhr.status >= 200 && xhr.status < 300 ) {
                        resolve( true );
                    } else {
                        let mensaje = xhr.statusText || 'Se produjo un ERROR';
                        reject(  { status: xhr.status, statusText: mensaje } );
                    }
                }
            });
            xhr.open( 'PUT', `${URL}/${id}` );
            xhr.setRequestHeader( 'Content-type', 'application/json;charset=utf-8' );
            xhr.send(JSON.stringify(mascota)); 
        });

    } catch ( err ) {
        throw { status: err.status, statusText: err.statusText };
    }
}

/* 
export function modificarMascota(mascota){
    let id = mascota.id;
    mascota.precio = parseInt(mascota.precio);
    delete mascota.id;

    const config = {
        method: 'PUT',
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(mascota)
    }

    fetch(URL + '/' + id, config) //PUT con configuracion y datos
    .then((response)=>{
        if(!response.ok) return Promise.reject(response); //retorna una promesa fallida
        return response.json(); //devuelve una promesa que es no bloqueante
    })
    .then(mascotaEditada=>{
        console.log("ENTRE A MODIFICAR ", mascotaEditada);
        return mascotaEditada;
    })
    .catch((err)=>{
        console.error(err.status);
    })

}*/


export function actualizarLista(listaMascotas){
    divTabla.innerHTML = "<img src='./image/spinner.gif' style=' margin-top: 5vw;' class='text.center' >";
    setTimeout(() => {
        while (divTabla.firstChild) {
            divTabla.removeChild(divTabla.lastChild);
          }
          divTabla.appendChild(crearTabla(listaMascotas));
    }, 2000);
}


export async function buscarMascota(id){
    let lista  = await obtenerMascotasXhr();
    lista.forEach(element => {
        if(element['id'] == id){
            let frm = document.forms[0];
            frm.titulo.value = element['titulo'],
            frm.descripcion.value = element['descripcion'],
            frm.precio.value = element['precio'],
            frm.animal.value = element['animal'], 
            frm.raza.value = element['raza'],
            frm.fecha.value = element['fecha'],
            frm.vacuna.value = element['vacuna']
        }
    });
}

export function ocultarBotones(){
    const btns = document.getElementsByTagName('button');
    for (let index = 0; index < btns.length; index++) {
        btns[index].classList.toggle('ocultarBtn');
    }
}


export function promedio(filtro, lista){
    let media;     
    if(filtro != "todos"){
        const listaFiltrada = lista.filter(mascota => mascota.animal == filtro);
        //console.log(listaFiltrada);
        const suma = listaFiltrada.reduce( (previo, actual)=>{
            return previo + actual.precio;
        }, 0);
    
        media = suma / listaFiltrada.length;
        actualizarLista(listaFiltrada);
    }else{
        const suma = lista.reduce( (previo, actual)=>{
            return previo + actual.precio;
        }, 0);
    
        media = suma / lista.length;
        actualizarLista(lista);
    }
    return media;
}





