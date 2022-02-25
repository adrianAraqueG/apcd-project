import { datos, datos as datosGenerales } from './generales.js';
import { ordenes as ordenes } from './ordenes.js';
import { integrantes as integrantes } from './integrantes.js';

const btnBorrarTodo = document.querySelector('#borrarTodo');

btnBorrarTodo.addEventListener('click', e => {
    if(confirm('¿Está seguro de que quiere borrar toda la planilla?')){
        window.localStorage.clear();
        location.reload();
    }
});


