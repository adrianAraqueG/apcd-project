/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { datos };

/**--------------------------------------------------------|
 * --------------------- ARRAYS GLOBALES ------------------|
 *  -------------------------------------------------------|
 * */
 const datosGenerales = {
    fecha: '',
    ciudad: '',
    departamento: ''
}

const condicionesGenerales = {
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
}
const medidasControl = {
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
const herramientasEquipos = {
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
const escaleras = {
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


const datos = new Array();
datos['generales'] = datosGenerales;
datos['condicionesGenerales'] = condicionesGenerales;
datos['medidasControl'] = medidasControl;
datos['herramientasEquipos'] = herramientasEquipos;
datos['escaleras'] = escaleras;






/**--------------------------------------------------------| 
 * ------------------ DATOS GENERALES ---------------------|
 *  -------------------------------------------------------|
 * */
const fechaInput = document.querySelector('#fecha');
const ciudadInput = document.querySelector('#ciudad');
const departamentoInput = document.querySelector('#departamento');

document.addEventListener('DOMContentLoaded', () =>{
    ciudadInput.addEventListener('input', e =>{
        datosGenerales.ciudad = e.target.value;

        datos['generales'] = datosGenerales;
        console.log(datos);
    });
    fechaInput.addEventListener('input', e =>{
        datosGenerales.fecha = e.target.value;

        datos['generales'] = datosGenerales;
        // console.log(datos);
    });
    departamentoInput.addEventListener('input', e =>{
        datosGenerales.departamento = e.target.value;

        datos['generales'] = datosGenerales;
        // console.log(datos);
    });
});






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

                for(let value in condicionesGenerales){
                    condicionesGenerales[value] = e.target.value;
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
                for(let value in condicionesGenerales){
                    condicionesGenerales[value] = e.target.value;
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
                for(let value in condicionesGenerales){
                    condicionesGenerales[value] = e.target.value;
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
 for(let value in condicionesGenerales){
    const input = document.querySelectorAll(`input[name="c-g-${i}"]`);

    input.forEach( elemento => {
        elemento.addEventListener('change', e =>{
            condicionesGenerales[value] = e.target.value;
        });
    });

    i = i + 1;
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
            console.log(medidasControl);

        } else if(e.target.checked === false){
            for(let value in medidasControl){
                medidasControl[value] = false;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="m-c-${i}"]`);
                input.checked = false;
            }
            console.log(medidasControl);
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
            console.log(input.checked);
            console.log(medidasControl);
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
            console.log(herramientasEquipos);
            console.log(datos);

        } else if(e.target.checked === false){
            for(let value in herramientasEquipos){
                herramientasEquipos[value] = false;
            }
            for(let i = 1; i <= npreguntas; i++){
                const input = document.querySelector(`input[name="h-e-${i}"]`);
                input.checked = false;
            }
            console.log(herramientasEquipos);
            console.log(datos);
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
            console.log(input.checked);
            console.log(herramientasEquipos);
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
        //console.log(e.target.checked);
        escaleras['escF1'][`e-f1-${i}`] = e.target.checked;
        console.log(escaleras);
    }); 
}


// ESCALERA DOBLE F2
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-f2-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-f2-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escF2'][`e-f2-${i}`] = e.target.checked;
        console.log(escaleras);
    }); 
}

// ESCALERA TIJERA ALUMINIO
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-ta-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-ta-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escTA'][`e-ta-${i}`] = e.target.checked;
        console.log(escaleras);
    }); 
}

// ESCALERA ARTICULADA - TELESCÓPICA
for(let i = 1; i <= 14; i++){
    const input = document.querySelector(`input[name=e-at-${i}]`);

    input.checked = false;
    escaleras.escF1[`e-at-${i}`] = false; 
    
    input.addEventListener('input', e =>{
        escaleras['escAT'][`e-at-${i}`] = e.target.checked;
        console.log(escaleras);
    }); 
}




/**--------------------------------------------------------| 
 * ------------------ FUNCIONES ---------------------------|
 *  -------------------------------------------------------|
 * */