import { datos, datos as datosGenerales } from './generales.js';
import { ordenes as ordenes } from './ordenes.js';
import { integrantes as integrantes } from './integrantes.js';

const btnBorrarTodo = document.querySelector('#borrarTodo');
btnBorrarTodo.addEventListener('click', e => {
    if(confirm('¿Está seguro de que quiere borrar toda la planilla?')){
        window.localStorage.clear();
        actualizarBtn();
        location.reload();
    }
});

export function actualizarBtn(){
    const divBtn = document.querySelector('#divBtnBT');
    const LS = window.localStorage;
    if(LS.getItem('ordenes') 
    || LS.getItem('datosGenerales')
    || LS.getItem('condicionesGenerales')
    || LS.getItem('medidasControl')
    || LS.getItem('herramientasEquipos')
    || LS.getItem('escaleras')
    || LS.getItem('integrantes')){
        if(divBtn.classList.contains('d-none')){
            divBtn.classList.remove('d-none');
        }
    }else{
        divBtn.classList.add('d-none');
    }
}


