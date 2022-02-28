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

const btnDescargarPDF = document.querySelector('#descargarPDF');
btnDescargarPDF.addEventListener('click', convertirPDF);




/**--------------------------------------------------------|
 * --------------------- UTILIDADES -----------------------|
 *  -------------------------------------------------------|
 * */
async function convertirPDF(){
    const image = await loadImage('img/forms/apcd-form.jpg');
    //console.log(image);
    const pdf = new jsPDF('p', 'pt', 'legal');

    pdf.addImage(image, 'PNG', -60, 10, 720, 1015);

    pdf.save('apcd.pdf');
    
}

function loadImage(url){
    return new Promise( resolve =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = e =>{
            const reader = new FileReader();
            reader.onload = event =>{
                const res = event.target.result;
                resolve(res);
            }
            const file = xhr.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}



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


