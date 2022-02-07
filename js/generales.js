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
        // console.log(datos);
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
    let def = {input: false};
    condicionesGenerales[i] = def;
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

    let def = false;
    medidasDeControl[i] = def;
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
    //console.log(inputHE);

    let def = false;
    herramientasEquipos[i] = def;
    datos['herramientasEqupos'] = herramientasEquipos;

    inputHE.addEventListener('input', () =>{
        agregarValor(herramientasEquipos, inputHE, i, 'he');
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