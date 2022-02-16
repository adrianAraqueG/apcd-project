/** APCD - JS 
 * 
 * 
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

const ordenTrabajo = [];

let condicionesGenerales = [];
let medidasDeControl = [];
let herramientasEquipos = [];
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
datos['medidasDeControl'] = medidasDeControl;
datos['herramientasEquipos'] = herramientasEquipos;


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
let inputCG;

//Leer los radios de los marcadores generales
const markallCG = document.querySelectorAll(`input[name="c-g-ma"]`);
markallCG.forEach( elemento => {elemento.addEventListener('change', () => {marcarTodasCG(elemento, 14);});});

// llenar datos por defecto & agregar datos al objeto
for(let i = 1; i <= 14; i++){
    inputCG = document.querySelectorAll(`input[name="c-g-${i}"]`);
    
    condicionesGenerales[i] = false;
    datos['condicionesGenerales'] = condicionesGenerales;

    inputCG.forEach( elemento => { 
        elemento.addEventListener('input', () => {agregarValor(condicionesGenerales, elemento, i, 'cg')});
     }); 
}






/**--------------------------------------------------------| 
 * ------------------ MEDIDAS DE CONTROL ------------------|
 *  -------------------------------------------------------|
 * */
// markall
const markallMC = document.querySelector('input[name="m-c-ma"]');
markallMC.addEventListener('change', marcarTodasMC);

for(let i = 1; i <= 27; i++){
    let inputMC = document.querySelector(`input[name="m-c-${i}"]`);

    medidasDeControl[i] = false;
    datos['medidasDeControl'] = medidasDeControl;

    inputMC.addEventListener('input', () =>{
        agregarValor(medidasDeControl, inputMC, i, 'mc');
    });
}






/**--------------------------------------------------------| 
 * ---------------- HERRAMIENTAS Y EQUIPOS ----------------|
 *  -------------------------------------------------------|
 * */
// markall
const markallHE = document.querySelector('input[name="h-e-ma"]');
markallHE.addEventListener('change', marcarTodasHE);

for(let i = 1; i <= 13; i++){
    let inputHE = document.querySelector(`input[name="h-e-${i}"]`);
    
    herramientasEquipos[i] = false;
    datos['herramientasEqupos'] = herramientasEquipos;

    inputHE.addEventListener('input', () =>{
        agregarValor(herramientasEquipos, inputHE, i, 'he');
    });
}




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
// agregar Valores a los arrays
function agregarValor(array, input, numero, id){
    let valor = {}

    console.log(input);
    console.log(numero);

    if(input.type === 'checkbox' && id === 'mc'){
        if(input.checked === true){
            medidasDeControl[numero] = true;
        }else if(input.checked === false){
            medidasDeControl[numero] = false;
        }

        console.log(medidasDeControl);
        console.log('input al checkbox');

        return;

    } else if(input.type === 'checkbox' && id === 'he'){
        if(input.checked === true){
            herramientasEquipos[numero] = true;
        }else if(input.checked === false){
            herramientasEquipos[numero] = false;
        }

        console.log(herramientasEquipos);
        console.log('input al checkbox');

        return;

    }else if(input.type === "radio" && id === "cg"){
        if(input.checked){
            valor = {
                input: input.value
            }    
        }else{
            valor = {
                valor: input.value
            }
        }
    }

    array[numero] = valor;
    console.log(array);
    console.log('cambio');
}


// marcar Todos los Items con la misma opción CG
function marcarTodasCG(input, ndatos){
    if(input.value === 'si'){

        for(let i = 1; i <= ndatos; i++){

            inputCG = document.querySelectorAll(`input[name="c-g-${i}"]`);
            inputCG.forEach( elemento => {
                
                    if(elemento.value === 'si'){
                        elemento.checked = true;
                    } console.log('chequeado');
                
                condicionesGenerales[i].input = 'si';
            });
        }

        console.log(condicionesGenerales);

    }else if(input.value === 'no'){

        for(let i = 1; i <= ndatos; i++){
            inputCG = document.querySelectorAll(`input[name="c-g-${i}"]`);
            inputCG.forEach( elemento => {

                    if(elemento.value === 'no'){
                        elemento.checked = true;
                    } console.log('chequeado');
                
                condicionesGenerales[i].input = 'no';
            });
        }

        console.log(condicionesGenerales);

    }else if(input.value === 'na'){

        for(let i = 1; i <= ndatos; i++){
            inputCG = document.querySelectorAll(`input[name="c-g-${i}"]`);
            inputCG.forEach( elemento => {

                    if(elemento.value === 'na'){
                        elemento.checked = true;
                    } console.log('chequeado');
                
                condicionesGenerales[i].input = 'na';
            });
        }

        console.log(condicionesGenerales);
    }
}

function marcarTodasMC(){
    if(markallMC.checked === true){
        for(let i = 1; i <= 27; i++){
            let inputs = document.querySelector(`input[name="m-c-${i}"]`);
            inputs.checked = true;
            medidasDeControl[i] = true;
        }
    } else{
        for(let i = 1; i <= 27; i++){
            let inputs = document.querySelector(`input[name="m-c-${i}"]`);
            inputs.checked = false;
            medidasDeControl[i] = false;
        }
    }

    console.log(datos);
}

function marcarTodasHE(){
    if(markallHE.checked === true){
        for(let i = 1; i <= 27; i++){
            let inputs = document.querySelector(`input[name="h-e-${i}"]`);
            inputs.checked = true;
            herramientasEquipos[i] = true;
        }
    } else{
        for(let i = 1; i <= 27; i++){
            let inputs = document.querySelector(`input[name="h-e-${i}"]`);
            inputs.checked = false;
            herramientasEquipos[i] = false;
        }
    }

    console.log(datos);
}