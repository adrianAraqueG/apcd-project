import { datos as link1 } from './generales.js';
import { ordenes as link2 } from './ordenes.js';
import { integrantes as link3 } from './integrantes.js';

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
    const pdf = new jsPDF('p', 'pt', 'legal');
    pdf.setFontSize(8);
    pdf.setTextColor(255,0,0);

    const image = await loadImage('img/forms/apcd-form.jpg');
    pdf.addImage(image, 'PNG', -60, 10, 720, 1015);

    // Datos Generales - Relleno
    if(obtenerLS('datosGenerales')){
        const datosGenerales = obtenerLS('datosGenerales');
        const {fecha, ciudad, departamento} = datosGenerales;
        const fechaArr = fecha.split('-');

        pdf.text(ciudad.toUpperCase(), 240, 53);
        pdf.text(departamento.toUpperCase(), 450, 51);
        pdf.text(fechaArr[0], 125, 54);
        pdf.text(fechaArr[1], 105, 54);
        pdf.text(fechaArr[2], 83, 54);  
    }


    // Integrantes - Relleno
    /*if(obtenerLS('integrantes')){
        const integrantes = obtenerLS('integrantes');

        let counter = 1;
        integrantes.forEach( integrante => {
            const {nombre, cargo, cedula} = integrante;
            //console.log(getCoordsInt(counter));
            pdf.text(nombre.toUpperCase(), getCoordsInt(counter).nombre[0], getCoordsInt(counter).nombre[1]);
            pdf.text(cedula.toUpperCase(), getCoordsInt(counter).cedula[0], getCoordsInt(counter).cedula[1]);
            pdf.text(cargo.toUpperCase(), getCoordsInt(counter).cargo[0], getCoordsInt(counter).cargo[1]);

            counter = counter + 1;
        });
    }*/

    //pdf.text('AUXILIAR', 248, 112);

    // Condiciones Generales - Relleno
    /*if(obtenerLS('condicionesGenerales')){
        const condicionesGenerales = obtenerLS('condicionesGenerales');
        
        for(let value in condicionesGenerales.preguntas){
            const coords = getCoordsCG(value, condicionesGenerales.preguntas[value]);
            pdf.text('x', coords[0], coords[1]);
        }   
    }*/


    pdf.save('apcd.pdf');
}

function getCoordsInt(pos){
    const intPost = [
        {
            nombre: [42, 89],
            cedula: [172, 86],
            cargo: [248, 86]
        },
        {
            nombre: [42, 101],
            cedula: [172, 99],
            cargo: [248, 98]
        },
        {
            nombre: [42, 115],
            cedula: [172, 112],
            cargo: [248, 112]
        }
    ]

    switch(pos){
        case 1:{
            return intPost[0];
        }
        case 2:{
            return intPost[1];
        }
        case 3:{
            return intPost[2];
        }
    }
}

function getCoordsCG(nombre, valor){
    const coordsSi = {
        'c-g-1': [382, 154],
        'c-g-2': [382, 161],
        'c-g-3': [382, 171],
        'c-g-4': [382, 184],
        'c-g-5': [382, 191],
        'c-g-6': [382, 202],
        'c-g-7': [382, 214],
        'c-g-8': [382, 226],
        'c-g-9': [382, 234],
        'c-g-10': [382, 240],
        'c-g-11': [382, 248],
        'c-g-12': [382, 255],
        'c-g-13': [382, 262],
        'c-g-14': [382, 270],
    };
    const coordsNo = {
        'c-g-1': [396, 154],
        'c-g-2': [396, 161],
        'c-g-3': [396, 171],
        'c-g-4': [396, 184],
        'c-g-5': [396, 191],
        'c-g-6': [396, 202],
        'c-g-7': [396, 214],
        'c-g-8': [396, 226],
        'c-g-9': [396, 234],
        'c-g-10': [396, 240],
        'c-g-11': [396, 248],
        'c-g-12': [396, 255],
        'c-g-13': [396, 262],
        'c-g-14': [396, 270],
    };
    const coordsNA = {
        'c-g-1': [410, 154],
        'c-g-2': [410, 161],
        'c-g-3': [410, 171],
        'c-g-4': [410, 184],
        'c-g-5': [410, 191],
        'c-g-6': [410, 202],
        'c-g-7': [410, 214],
        'c-g-8': [410, 226],
        'c-g-9': [410, 234],
        'c-g-10': [410, 240],
        'c-g-11': [410, 248],
        'c-g-12': [410, 255],
        'c-g-13': [410, 262],
        'c-g-14': [410, 270],
    };

    if(valor === 'si'){
        for(let item in coordsSi){
            if(item === nombre){
                return coordsSi[item];
            }
        }
    } else if(valor === 'no'){
        for(let item in coordsNo){
            if(item === nombre){
                return coordsNo[item];
            }
        }
    } else if(valor === 'na'){
        for(let item in coordsNA){
            if(item === nombre){
                return coordsNA[item];
            }
        }
    }
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



function obtenerLS(datos){
    
    const LS = window.localStorage;
    switch(datos){
        case 'datosGenerales': {
            if(LS.getItem('datosGenerales')){
                const dt = JSON.parse(LS.getItem('datosGenerales'));
                return dt;
            }else{
                return false;
            }
        }
        case 'condicionesGenerales': {
            if(LS.getItem('condicionesGenerales')){
                const dt = JSON.parse(LS.getItem('condicionesGenerales'));
                return dt;
            }else{
                return false;
            }
        }
        case 'medidasControl': {
            
            break;
        }
        case 'herramientasEquipos': {
            
            break;
        }
        case 'escaleras': {
            
            break;
        }
        case 'ordenes': {
            
            break;
        }
        case 'integrantes': {
            if(LS.getItem('integrantes')){
                const dt = JSON.parse(LS.getItem('integrantes'));
                return dt;
            }else{
                return false;
            }
            break;
        }
    }
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


