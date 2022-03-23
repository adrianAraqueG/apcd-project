/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { datos };
import { actualizarBtn as actualizarBtn } from './app.js'
const datos = [];



/**--------------------------------------------------------|
 * --------------------- ARRAYS GLOBALES ------------------|
 *  -------------------------------------------------------|
 * */
let datosGenerales = {
    fecha: '',
    ciudad: '',
    departamento: '',
}

let condicionesGenerales = {
    preguntas: {
        'c-g-1': false,
        'c-g-2': false,
        'c-g-3': false,
        'c-g-4': false,
        'c-g-5': false,
        'c-g-6': false,
        'c-g-7': false,
        'c-g-8': false,
        'c-g-9': false,
        'c-g-10': false,
        'c-g-11': false,
        'c-g-12': false,
        'c-g-13': false,
        'c-g-14': false,
    },
    observaciones: {
        'c-g-1-obs': false,
        'c-g-2-obs': false,
        'c-g-3-obs': false,
        'c-g-4-obs': false,
        'c-g-5-obs': false,
        'c-g-6-obs': false,
        'c-g-7-obs': false,
        'c-g-8-obs': false,
        'c-g-9-obs': false,
        'c-g-10-obs': false,
        'c-g-11-obs': false,
        'c-g-12-obs': false,
        'c-g-13-obs': false,
        'c-g-14-obs': false,
    }
}
let medidasControl = {
    'm-c-1': false,
    'm-c-2': false,
    'm-c-3': false,
    'm-c-4': false,
    'm-c-5': false,
    'm-c-6': false,
    'm-c-7': false,
    'm-c-8': false,
    'm-c-9': false,
    'm-c-10': false,
    'm-c-11': false,
    'm-c-12': false,
    'm-c-13': false,
    'm-c-14': false,
    'm-c-15': false,
    'm-c-16': false,
    'm-c-17': false,
    'm-c-18': false,
    'm-c-19': false,
    'm-c-20': false,
    'm-c-21': false,
    'm-c-22': false,
    'm-c-23': false,
    'm-c-24': false,
    'm-c-25': false,
    'm-c-26': false,
    'm-c-27': false,
}
let herramientasEquipos = {
    'h-e-1': false,
    'h-e-2': false,
    'h-e-3': false,
    'h-e-4': false,
    'h-e-5': false,
    'h-e-6': false,
    'h-e-7': false,
    'h-e-8': false,
    'h-e-9': false,
    'h-e-10': false,
    'h-e-11': false,
    'h-e-12': false,
    'h-e-13': false,
}
let escaleras = {
    escF1: {
       'e-f1-1': false,
       'e-f1-2': false,
       'e-f1-3': false,
       'e-f1-4': false,
       'e-f1-5': false,
       'e-f1-6': false,
       'e-f1-7': false,
       'e-f1-8': false,
       'e-f1-9': false,
       'e-f1-10': false,
       'e-f1-11': false,
       'e-f1-12': false,
       'e-f1-13': false,
       'e-f1-14': false,
    },
    escF2: {
       'e-f2-1': false,
       'e-f2-2': false,
       'e-f2-3': false,
       'e-f2-4': false,
       'e-f2-5': false,
       'e-f2-6': false,
       'e-f2-7': false,
       'e-f2-8': false,
       'e-f2-9': false,
       'e-f2-10': false,
       'e-f2-11': false,
       'e-f2-12': false,
       'e-f2-13': false,
       'e-f2-14': false,
    },
    escTA: {
       'e-ta-1': false,
       'e-ta-2': false,
       'e-ta-3': false,
       'e-ta-4': false,
       'e-ta-5': false,
       'e-ta-6': false,
       'e-ta-7': false,
       'e-ta-8': false,
       'e-ta-9': false,
       'e-ta-10': false,
       'e-ta-11': false,
       'e-ta-12': false,
       'e-ta-13': false,
       'e-ta-14': false,
    },
    escAT: {
       'e-at-1': false,
       'e-at-2': false,
       'e-at-3': false,
       'e-at-4': false,
       'e-at-5': false,
       'e-at-6': false,
       'e-at-7': false,
       'e-at-8': false,
       'e-at-9': false,
       'e-at-10': false,
       'e-at-11': false,
       'e-at-12': false,
       'e-at-13': false,
       'e-at-14': false,
    }
}

// Ejecutando al cargar la página.
obtenerLS();
activarSelects();
actualizarBtn();



/**--------------------------------------------------------| 
 * ------------------ CONDICIONES GENERALES INPUTS --------|
 *  -------------------------------------------------------|
 * */

// Marcar todas - Condiciones Generales
do{
    const markAll = document.querySelectorAll('input[name="c-g-ma"]');
    markAll.forEach( elemento =>{

        const npreguntas = 14;

        elemento.addEventListener('input', e =>{
            if(e.target.value === 'si'){

                for(let value in condicionesGenerales.preguntas){
                    condicionesGenerales.preguntas[value] = e.target.value;
                }

                for(let i = 1; i <= npreguntas; i++){
                    const inputs = document.querySelectorAll(`input[name="c-g-${i}"]`);
                    inputs.forEach(input => {
                        if(input.value === 'si'){
                            input.checked = true;
                        }
                        
                    });
                }
                actualizarLS('condicionesGenerales');
                

            }else if(e.target.value === 'no'){
                for(let value in condicionesGenerales.preguntas){
                    condicionesGenerales.preguntas[value] = e.target.value;
                }

                for(let i = 1; i <= npreguntas; i++){
                    const inputs = document.querySelectorAll(`input[name="c-g-${i}"]`);
                    inputs.forEach(input => {
                        if(input.value === 'no'){
                            input.checked = true;
                        }
                    });
                }

                actualizarLS('condicionesGenerales');
               

            }else if(e.target.value === 'na'){
                for(let value in condicionesGenerales.preguntas){
                    condicionesGenerales.preguntas[value] = e.target.value;
                }
                
                for(let i = 1; i <= npreguntas; i++){
                    const inputs = document.querySelectorAll(`input[name="c-g-${i}"]`);
                    inputs.forEach(input => {
                        if(input.value === 'na'){
                            input.checked = true;
                        }
                    });
                }

                actualizarLS('condicionesGenerales');
                
            }

            actualizarBtn();
        });
    });

}while(false);

// Agregar listeners - Condiciones Generales
do{
    // sincronizar datos
    if(window.localStorage.getItem('condicionesGenerales')){

        // para las preguntas
        for(let value in condicionesGenerales.preguntas){
            const inputs = document.querySelectorAll(`input[name=${value}]`);
            inputs.forEach( input => {
                
                if(input.value === condicionesGenerales.preguntas[value]){
                    input.checked = true;
                }

            });
        }

    }


    let i = 1
    for(let value in condicionesGenerales.preguntas){
        const input = document.querySelectorAll(`input[name="c-g-${i}"]`);

        input.forEach( elemento => {
            elemento.addEventListener('change', e =>{
                condicionesGenerales.preguntas[value] = e.target.value;
                actualizarLS('condicionesGenerales');
                actualizarBtn();
            });
        });

        i = i + 1;
    }


}while(false);


// Agregar Observaciones
do{
    const txtArea = document.querySelector('#aggObsTxtarea');

    for(let value in condicionesGenerales.observaciones){
        const button = document.querySelector(`button[name=${value}]`);
        

        button.addEventListener('click', e =>{
            // Rellenar txt area con los datos guardados
            if(condicionesGenerales.observaciones[value] !== false){
                txtArea.value = condicionesGenerales.observaciones[value];
            }else{
                txtArea.value = '';
            }

            guardarObs(button.name);
        });

    }   

}while(false);






/**--------------------------------------------------------| 
 * ------------------ MEDIDAS DE CONTROL ------------------|
 *  -------------------------------------------------------|
 * */
// Marcar Todas - Medidas de Control
do{
    const markAll = document.querySelector('input[name="m-c-ma"]');

    markAll.addEventListener('input', e =>{
        if(e.target.checked === true){
            for(let value in medidasControl){
                medidasControl[value] = true;
                actualizarLS('medidasControl');
                actualizarBtn();
            }
            for(let value in medidasControl){
                const input = document.querySelector(`input[name=${value}]`);
                input.checked = true;
                actualizarLS('medidasControl');
                actualizarBtn();
            }

        } else if(e.target.checked === false){
            for(let value in medidasControl){
                medidasControl[value] = false;
                actualizarLS('medidasControl');
                actualizarBtn();
            }
            for(let value in medidasControl){
                const input = document.querySelector(`input[name=${value}]`);
                input.checked = false;
                actualizarLS('medidasControl');
                actualizarBtn();
            }
        }
    });

}while(false);

// Agregar listeners - Medidas de Control
do{
    // sincronizar datos
    if(window.localStorage.getItem('medidasControl')){

        // para las preguntas
        for(let value in medidasControl){
            const input = document.querySelector(`input[name=${value}]`);

            input.checked = medidasControl[value];

        }

    }


    let i = 1;
    for(let value in medidasControl){
        const input = document.querySelector(`input[name=${value}]`);
        
        input.addEventListener('input', e =>{
            medidasControl[value] = input.checked;
            actualizarLS('medidasControl');
            actualizarBtn();
        });

        i = i + 1;
    }
}while(false);






/**--------------------------------------------------------| 
 * ---------------- HERRAMIENTAS Y EQUIPOS ----------------|
 *  -------------------------------------------------------|
 * */
do{
    // Sincronizar Datos

    for(let value in herramientasEquipos){
        let inputs = document.querySelectorAll(`input[name=${value}]`);
        

        inputs.forEach(input =>{

            if(input.value === herramientasEquipos[value]){
                input.checked = true;
            }

            input.addEventListener('input', e =>{
                herramientasEquipos[value] = e.target.value;
                actualizarLS('herramientasEquipos');
                actualizarBtn();
            });
        });
    }
}while(false);






/**--------------------------------------------------------| 
 * ------------------ ESCALERAS ---------------------------|
 *  -------------------------------------------------------|
 * */

// ESCALERA DOBLE F1
for(let value in escaleras.escF1){
    const input = document.querySelector(`input[name=${value}]`);

    // sincronizar datos
    if(window.localStorage.getItem('escaleras')){
        input.checked = escaleras.escF1[value];
    } 
    
    input.addEventListener('input', e =>{
        escaleras.escF1[value] = e.target.checked;
        actualizarLS('escaleras');
        actualizarBtn();
    }); 
}


// ESCALERA DOBLE F2
for(let value in escaleras.escF2){
    const input = document.querySelector(`input[name=${value}]`);

    // sincronizar datos
    if(window.localStorage.getItem('escaleras')){
        input.checked = escaleras.escF2[value];
    }
    
    input.addEventListener('input', e =>{
        escaleras.escF2[value] = e.target.checked;
        actualizarLS('escaleras');
        actualizarBtn();
    }); 
}

// ESCALERA TIJERA ALUMINIO
for(let value in escaleras.escTA){
    const input = document.querySelector(`input[name=${value}]`);

    // sincronizar datos
    if(window.localStorage.getItem('escaleras')){
        input.checked = escaleras.escTA[value];
    } 
    
    input.addEventListener('input', e =>{
        escaleras.escTA[value] = e.target.checked;
        actualizarLS('escaleras');
        actualizarBtn();
    }); 
}

// ESCALERA ARTICULADA - TELESCÓPICA
for(let value in escaleras.escAT){
    const input = document.querySelector(`input[name=${value}]`);

    // sincronizar datos
    if(window.localStorage.getItem('escaleras')){
        input.checked = escaleras.escAT[value];
    }
    
    input.addEventListener('input', e =>{
        escaleras.escAT[value] = e.target.checked;
        actualizarLS('escaleras');
        actualizarBtn();
    }); 
}




/**--------------------------------------------------------| 
 * ------------------ FUNCIONES ---------------------------|
 *  -------------------------------------------------------|
 * */


// llena los campos generales y agrega listeners
function activarSelects(){
    const fechaInput = document.querySelector('#fecha');
    const ciudadSelect = document.querySelector('#ciudad')
    const departamentoSelect = document.querySelector('#departamento');

    departamentoSelect.addEventListener('change', e =>{
        datosGenerales.departamento = e.target.value;
        llenarCiudades(e.target.value);
        actualizarLS('datosGenerales');
        actualizarBtn();
    });

    // sincronizar los datos
    fechaInput.value = datosGenerales.fecha;
    if(datosGenerales.departamento !== ''){
        departamentoSelect.value = datosGenerales.departamento;
        llenarCiudades(datosGenerales.departamento);
    }

    ciudadSelect.addEventListener('change', e =>{
        datosGenerales.ciudad = e.target.value;
        actualizarLS('datosGenerales');
        actualizarBtn();
    });
    
    // Guardar Fecha
    fechaInput.addEventListener('input', e =>{
        datosGenerales.fecha = e.target.value;
        actualizarLS('datosGenerales');
        actualizarBtn();
    });
    
}


// guarda las observaciones en generales
function guardarObs(name){
    const btnGuardar = document.querySelector('#btnGuardarObs');
    const txtArea = document.querySelector('#aggObsTxtarea');

    btnGuardar.addEventListener('click', actualizar);

    function actualizar(){
        if(confirm('¿Quieres guardar la Observación?')){
            condicionesGenerales.observaciones[name] = txtArea.value;
            actualizarLS('condicionesGenerales');
            actualizarBtn();

            btnCerrar1.click();
        }
    }

    const btnCerrar1 = document.querySelector('#btnCerrarAggObs1');
    const btnCerrar2 = document.querySelector('#btnCerrarAggObs2');
    btnCerrar1.addEventListener('click', cerrar);
    btnCerrar2.addEventListener('click', cerrar);

    function cerrar(){
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);
        btnGuardar.removeEventListener('click', actualizar, false);
    }
}


// actualiza los datos en el localStorage
function actualizarLS(objeto){
    const LS = window.localStorage;

    switch(objeto){
        case 'datosGenerales': {
            if(LS.getItem('datosGenerales')){
                LS.removeItem('datosGenerales');
            }
            LS.setItem('datosGenerales', JSON.stringify(datosGenerales));
            break;
        }
        case 'condicionesGenerales': {
            if(LS.getItem('condicionesGenerales')){
                LS.removeItem('condicionesGenerales');
            }
            LS.setItem('condicionesGenerales', JSON.stringify(condicionesGenerales));
            break;
        }
        case 'medidasControl': {
            if(LS.getItem('medidasControl')){
                LS.removeItem('medidasControl');
            }
            LS.setItem('medidasControl', JSON.stringify(medidasControl));
            break;
        }
        case 'herramientasEquipos': {
            if(LS.getItem('herramientasEquipos')){
                LS.removeItem('herramientasEquipos');
            }
            LS.setItem('herramientasEquipos', JSON.stringify(herramientasEquipos));
            console.log('seteado');
            break;
        }
        case 'escaleras': {
            if(LS.getItem('escaleras')){
                LS.removeItem('escaleras');
            }
            LS.setItem('escaleras', JSON.stringify(escaleras));
            break;
        }
    }
}

// sincroniza los datos con LS
function obtenerLS(){
    const LS = window.localStorage;

    if(LS.getItem('datosGenerales')){
        const datosLS = LS.getItem('datosGenerales');
        datosGenerales = JSON.parse(datosLS);
    }
    if(LS.getItem('condicionesGenerales')){
        const datosLS = LS.getItem('condicionesGenerales');
        condicionesGenerales = JSON.parse(datosLS);
    }

    if(LS.getItem('medidasControl')){
        const datosLS = LS.getItem('medidasControl');
        medidasControl = JSON.parse(datosLS);
    }

    if(LS.getItem('herramientasEquipos')){
        const datosLS = LS.getItem('herramientasEquipos');
        herramientasEquipos = JSON.parse(datosLS);
    }

    if(LS.getItem('escaleras')){
        const datosLS = LS.getItem('escaleras');
        escaleras = JSON.parse(datosLS);
    }
}

// llenar options a ciudad
function llenarCiudades(departamento){
    const ciudadSelect = document.querySelector('#ciudad')
    const departamentos = {
        casanare:['yopal', 'aguazul', 'orocue'],
        caldas: ['aranzazu', 'manizales']
    }
    switch (departamento){
        case 'casanare': {
            // limpiando options de ciudad
            while(ciudadSelect.firstChild){
                ciudadSelect.removeChild(ciudadSelect.firstChild);
            }
            if(ciudadSelect.hasAttribute('disabled')){
                ciudadSelect.removeAttribute('disabled');
            }

            // llenando options de ciudad
            departamentos.casanare.forEach( ciudad => {
                const option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad.toUpperCase();
                ciudadSelect.appendChild(option);
            });

            // guardar la primera ciudad por defecto
            datosGenerales.ciudad = departamentos.casanare[0];

            break;
        }
        case 'caldas': {
            // limpiando options de ciudad
            while(ciudadSelect.firstChild){
                ciudadSelect.removeChild(ciudadSelect.firstChild);
            }
            if(ciudadSelect.hasAttribute('disabled')){
                ciudadSelect.removeAttribute('disabled');
            }

            // llenando options de ciudad
            departamentos.caldas.forEach( ciudad => {
                const option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad.toUpperCase();
                ciudadSelect.appendChild(option);
            });

            // guardar la primera ciudad por defecto
            datosGenerales.ciudad = departamentos.caldas[0];

            break;
        }
        
    }
}