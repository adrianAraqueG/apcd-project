/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { datos };

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
    }
}




/**--------------------------------------------------------| 
 * ------------------ DATOS GENERALES ---------------------|
 *  -------------------------------------------------------|
 * */
// Ejecutando al cargar la página.
document.addEventListener('DOMContentLoaded', () =>{
    obtenerLS();

    llenarSelects();
});



const datos = [];
/*datos['datosGenerales'] = datosGenerales;
datos['condicionesGenerales'] = condicionesGenerales;
datos['medidasControl'] = medidasControl;
datos['herramientasEquipos'] = herramientasEquipos;
datos['escaleras'] = escaleras;*/




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
            }
        });
    });

}while(false);

// Agregar listeners - Condiciones Generales
do{
 let i = 1
 for(let value in condicionesGenerales.preguntas){
    const input = document.querySelectorAll(`input[name="c-g-${i}"]`);

    input.forEach( elemento => {
        elemento.addEventListener('change', e =>{
            condicionesGenerales.preguntas[value] = e.target.value;
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
                console.log('distinto a false');
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
    const npreguntas = 27

    markAll.addEventListener('input', e =>{
        if(e.target.checked === true){
            for(let value in medidasControl){
                medidasControl[value] = true;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="m-c-${i}"]`);
                input.checked = true;
            }

        } else if(e.target.checked === false){
            for(let value in medidasControl){
                medidasControl[value] = false;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="m-c-${i}"]`);
                input.checked = false;
            }
        }
    });

}while(false);

// Agregar listeners - Medidas de Control
do{
    let i = 1;
    for(let value in medidasControl){
        const input = document.querySelector(`input[name="m-c-${i}"]`);
        
        input.addEventListener('input', e =>{
            medidasControl[value] = input.checked;
        });

        i = i + 1;
    }
}while(false);






/**--------------------------------------------------------| 
 * ---------------- HERRAMIENTAS Y EQUIPOS ----------------|
 *  -------------------------------------------------------|
 * */
// Marcar Todas - Herramientas y Equipos
do{
    const markAll = document.querySelector('input[name="h-e-ma"]');
    const npreguntas = 13

    markAll.addEventListener('input', e =>{
        if(e.target.checked === true){
            for(let value in herramientasEquipos){
                herramientasEquipos[value] = true;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="h-e-${i}"]`);
                input.checked = true;
            }

        } else if(e.target.checked === false){
            for(let value in herramientasEquipos){
                herramientasEquipos[value] = false;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="h-e-${i}"]`);
                input.checked = false;
            }
        }
    });

}while(false);

// Agregar listeners - Herramientas y Equipos 
do{
    let i = 1;
    for(let value in herramientasEquipos){
        const input = document.querySelector(`input[name="h-e-${i}"]`);
        
        input.addEventListener('input', e =>{
            herramientasEquipos[value] = input.checked;
        });

        i = i + 1;
    }
}while(false);






/**--------------------------------------------------------| 
 * ------------------ ESCALERAS ---------------------------|
 *  -------------------------------------------------------|
 * */

// ESCALERA DOBLE F1
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-f1-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-f1-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escF1'][`e-f1-${i}`] = e.target.checked;
    }); 
}


// ESCALERA DOBLE F2
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-f2-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-f2-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escF2'][`e-f2-${i}`] = e.target.checked;
    }); 
}

// ESCALERA TIJERA ALUMINIO
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-ta-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-ta-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escTA'][`e-ta-${i}`] = e.target.checked;
    }); 
}

// ESCALERA ARTICULADA - TELESCÓPICA
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-at-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-at-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escAT'][`e-at-${i}`] = e.target.checked;
    }); 
}




/**--------------------------------------------------------| 
 * ------------------ FUNCIONES ---------------------------|
 *  -------------------------------------------------------|
 * */

function llenarSelects(){
    const fechaInput = document.querySelector('#fecha');
    const ciudadSelect = document.querySelector('#ciudad')
    const departamentoSelect = document.querySelector('#departamento');

    // sincronizar los datos
    fechaInput.value = datosGenerales.fecha;
    if(datosGenerales.departamento !== ''){
        departamentoSelect.value = datosGenerales.departamento;
    }

    // lista de departamentos  y ciudades
    const departamentos = {
        'casanare': ['YOPAL', 'AGUAZUL', 'TAURAMENA', 'OROCUE'],
        'caldas': ['MANIZALES', 'ARANZAZU', 'LA MERCED'],
    }

    if(!window.localStorage.getItem('datosGenerales')){
        departamentoSelect.addEventListener('change', e => {
            datosGenerales.departamento = (e.target.value);
            
            while(ciudadSelect.firstChild){
                ciudadSelect.removeChild(ciudadSelect.firstChild);
            }
    
            setTimeout(departamentos[e.target.value].forEach(ciudad => {
                const opcion = document.createElement('option');
                opcion.value = ciudad.toLowerCase();
                opcion.textContent = ciudad;
    
                ciudadSelect.appendChild(opcion);
            }), 100);
    
            datosGenerales.ciudad = departamentos[e.target.value][0].toLowerCase();
    
            ciudadSelect.removeAttribute('disabled');
    
            actualizarLS();
        });
    }else{
        //debugger;
        departamentoSelect.addEventListener('change', e =>{;
            datosGenerales.departamento = (e.target.value);

            while(ciudadSelect.firstChild){
                ciudadSelect.removeChild(ciudadSelect.firstChild);
            }
    
            setTimeout(departamentos[e.target.value].forEach(ciudad => {
                const opcion = document.createElement('option');
                opcion.value = ciudad.toLowerCase();
                opcion.textContent = ciudad;
    
                ciudadSelect.appendChild(opcion);
            }), 100);
    
            datosGenerales.ciudad = departamentos[e.target.value][0].toLowerCase();

            actualizarLS();
        });

        while(ciudadSelect.firstChild){
            ciudadSelect.removeChild(ciudadSelect.firstChild);
        }

        setTimeout(departamentos[datosGenerales.departamento].forEach(ciudad => {
            const opcion = document.createElement('option');
            opcion.value = ciudad.toLowerCase();
            opcion.textContent = ciudad;

            ciudadSelect.appendChild(opcion);
        }), 100);

        ciudadSelect.removeAttribute('disabled');
        ciudadSelect.value = datosGenerales.ciudad;
    }

    ciudadSelect.addEventListener('change', e =>{
        datosGenerales.ciudad = e.target.value;
        actualizarLS();
    });
    
    // Guardar Fecha
    fechaInput.addEventListener('input', e =>{
        datosGenerales.fecha = e.target.value;
        actualizarLS();
    });
    
}


function guardarObs(name){
    const btnGuardar = document.querySelector('#btnGuardarObs');
    const txtArea = document.querySelector('#aggObsTxtarea');

    btnGuardar.addEventListener('click', actualizar);

    function actualizar(){
        console.log(txtArea.value);
        if(confirm('¿Quieres guardar la Observación?')){
            condicionesGenerales.observaciones[name] = txtArea.value;

            btnCerrar1.click();
            console.log('condGen:');
            console.log(condicionesGenerales.observaciones);
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

function actualizarLS(){
    // Variable para localStorage
    const LS = window.localStorage;

    LS.setItem('datosGenerales', JSON.stringify(datosGenerales));
    LS.setItem('condicionesGenerales', JSON.stringify(condicionesGenerales));
    LS.setItem('medidasControl', JSON.stringify(condicionesGenerales));
    LS.setItem('herramientasEquipos', JSON.stringify(condicionesGenerales));
    LS.setItem('escaleras', JSON.stringify(condicionesGenerales));
}

function obtenerLS(){
    const LS = window.localStorage;
    if(LS.getItem('datosGenerales')){
        let datosLS = JSON.parse(LS.getItem('datosGenerales'));
        datosGenerales = datosLS;

        datosLS = JSON.parse(LS.getItem('condicionesGenerales'));
        condicionesGenerales = datosLS;

        datosLS = JSON.parse(LS.getItem('medidasControl'));
        medidasControl = datosLS;

        datosLS = JSON.parse(LS.getItem('herramientasEquipos'));
        herramientasEquipos = datosLS;

        datosLS = JSON.parse(LS.getItem('escaleras'));
        escaleras = datosLS;
    }
}