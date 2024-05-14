
import {
    obtenerMascotasXhr,
    actualizarLista,
    altaMascota,
    bajaMascotaXhr,
    modificarMascota,
    promedio
} from './controller/logica.js';

import {
    limpiar,
    idSeleccionado
} from './entidades/tabla.js';


let frm;
let frm2;
let divTabla;
let listaMascotas;
let btnCancelar;
let btnDelete;
let btnEdit;
let inputPromedio;
let filtro;
let checks;



window.addEventListener('load', inicializarManejadores);

 async function inicializarManejadores(){

    listaMascotas = await obtenerMascotasXhr();

    console.log(listaMascotas);

    divTabla = document.getElementById('divTabla');

    actualizarLista(listaMascotas);


    frm = document.forms[0];
 
    frm.addEventListener('submit', async (e) =>{ // referencia al formulario
        e.preventDefault();

        let exito = await altaMascota(frm);
        
        listaMascotas = await obtenerMascotasXhr();

         actualizarLista(listaMascotas);
    });
    frm2 = document.forms[1];

    checks = document.querySelectorAll( '.cbox' );
    checks.forEach( element  =>  { filtrarColumnas( element, listaMascotas ); });

}


btnCancelar = document.getElementById('btnCancel');
btnCancelar.addEventListener('click', e =>{
    e.preventDefault();
    limpiar();
});


btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', async (e) =>{
    e.preventDefault();
    //Eliminar de la lista y actualizar
    console.log(idSeleccionado);
    
    let exito = bajaMascotaXhr(idSeleccionado);

    listaMascotas = await obtenerMascotasXhr();

    actualizarLista(listaMascotas);
    limpiar();
});


btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', async e =>{
    e.preventDefault();
    //Eliminar de la lista y actualizar

    let mascota = listaMascotas.find(element => element['id'] == idSeleccionado);
    console.log(mascota);
    mascota.titulo =  frm.titulo.value;
    mascota.descripcion = frm.descripcion.value;
    mascota.precio = frm.precio.value;
    mascota.animal = frm.animal.value;
    mascota.raza = frm.raza.value;
    mascota.fecha = frm.fecha.value;
    mascota.vacuna = frm.vacuna.value;

    let exito = await modificarMascota(mascota);

    listaMascotas = await obtenerMascotasXhr();

    actualizarLista(listaMascotas);
    limpiar();
});


inputPromedio = document.getElementById('promedio');
filtro = document.getElementById('filtro');
filtro.addEventListener('change', async (e) =>{
    e.preventDefault();

    console.log(frm2.filtrar.value);

    let media = promedio(frm2.filtrar.value, listaMascotas);

    console.log(media);
    inputPromedio.value = media;

    //actualizarLista(lista);
});



async function filtrarColumnas( check, listaMascotas ) {
    

    check.addEventListener( 'click', async() => { 
        let listaMapeada = listaMascotas.map( row => { 
            let fila = {};
            for (const key in row) {
                console.log(key);
                if ( document.getElementById('cbox'+key).checked ) {
                    fila[key] = row[key];
                }

            }
            return fila;
        })

        console.log(listaMapeada);
        actualizarLista(listaMapeada);

    });
};














/*
checks = document.getElementById('contenedor-checkboxs');

checks.addEventListener('change', async (e)=>{
    e.preventDefault();

   // const list = document.querySelectorAll('thead tr th'); // devuelve NodeList con elementos dentro de un div con esa clase
   filtrarColumnas()
});

function filtrarColumnas(){
    const activos = [];
    const checkboxs = [...document.getElementById('contenedor-checkboxs').children];
    console.log(checkboxs);
    
    checkboxs.forEach(element => {
        if(element.checked){
            activos.push(element.value);
        }
    });

   // console.log(activos);
}*/