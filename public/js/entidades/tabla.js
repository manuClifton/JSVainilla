
import {
    buscarMascota,
    ocultarBotones
} from '../controller/logica.js';

export let idSeleccionado;

export function crearTabla(lista){

    const tabla = document.createElement('table');
   // tr.setAttribute('data-id', element['id']);
    tabla.setAttribute('class', 'table table-hover') //pregunta si tiene el atributo y sino lo crea
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
    
    return tabla;
}

function crearCabecera(item){

    const thead = document.createElement('thead');
    thead.setAttribute('class', 'bg-secondary table-dark') 
    const tr = document.createElement('tr');
   
    for (const key in item) {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col') 
        const titulo = document.createTextNode(key);
        th.appendChild(titulo);
        //th.textContent = key;
        tr.appendChild(th);
    }

    thead.appendChild(tr);

    return thead;
}

function crearCuerpo(lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');
        tr.setAttribute('scope', 'row') 

        for (const key in element) {
            const td = document.createElement('td');
            td.setAttribute('class', 'font-weight-bold') 
            
            const texto = document.createTextNode(element[key]);

            td.appendChild(texto);

            tr.appendChild(td);
        }
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
        }
        
        agregarManejadorTR(tr);
        tbody.appendChild(tr);
    });

    return tbody;
}


// esto va en logica y se exporta aca
let flag = false;
function agregarManejadorTR(tr){
    if(tr){
        tr.addEventListener('click', function(e){

        // ocultar boton agregar y mostrar los demas
        if(!flag){
            ocultarBotones();
            flag = true;
        }

        //buscar por id
        idSeleccionado = e.target.parentNode.getAttribute('data-id');

        buscarMascota(e.target.parentNode.getAttribute('data-id'));

        })
    }
}


export function limpiar(){
    ocultarBotones();
    let frm = document.forms[0];
        frm.titulo.value = "";
        frm.descripcion.value = "";
        frm.precio.value = "";
        frm.animal.value = "";
        frm.raza.value = "";
        frm.fecha.value = "";
      //  frm.vacuna.value = "";
    flag = false;
}
