/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { integrantes };

/**--------------------------------------------------------|
 * --------------------- ARRAYS GLOBALES ------------------|
 *  -------------------------------------------------------|
 * */

const integrantes = [];

const nombreInput = document.querySelector('#nombreInt');
const cedulaInput = document.querySelector('#cedulaInt');
const cargoInput = document.querySelector('#cargoInt');

const btnGuardar = document.querySelector('#btnGuardarInt');
const btnAbrirModal = document.querySelector('#abrirModalInt')

btnAbrirModal.addEventListener('click', agregarInt);


/** FUNCIONES */

function agregarInt(){
    //Validar
    if(nombreInput.value === ''){
        inputAlerta(nombreInput);
        return;
    }else if(cedulaInput.value === ''){
        inputAlerta(cedulaInput);
        return;
    }else if(cargoInput.value === ''){
        inputAlerta(cargoInput);
        return;
    }

    if(confirm('¿Quieres añadir el nuevo integrante?')){
        const nuevoIntegrante = {
            id: Date.now(),
            nombre: nombreInput.value.toUpperCase(),
            cedula: cedulaInput.value,
            cargo: cargoInput.value
        }
    
        // añadir nuevo integrante al objeto
        integrantes.push(nuevoIntegrante);
        console.log(integrantes);
        btnCerrar1.click();

    }
    
    // cerrando todo...
    const btnCerrar1 = document.querySelector('#btnCerrarInt1');
    const btnCerrar2 = document.querySelector('#btnCerrarInt2');
    btnCerrar1.addEventListener('click', cerrar);
    btnCerrar2.addEventListener('click', cerrar);

    function cerrar(){
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);
    }
}

function inputAlerta(child){
    if(!child.classList.contains('is-invalid')){
        child.classList.add('is-invalid');
    }

    child.addEventListener('click', act);

    function act(){
        if(child.classList.contains('is-invalid')){
            child.classList.remove('is-invalid');
        }

        child.removeEventListener('click', act, false);
    }
}