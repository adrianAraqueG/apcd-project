/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { integrantes };
import { actualizarBtn as actualizarBtn } from './app.js';
//actualizarBtn();

/**--------------------------------------------------------|
 * --------------------- ARRAYS GLOBALES ------------------|
 *  -------------------------------------------------------|
 * */

let integrantes = [];

const nombreInput = document.querySelector('#nombreIntAdd');
const cedulaInput = document.querySelector('#cedulaIntAdd');
const cargoInput = document.querySelector('#cargoIntAdd');
const integrantesDiv = document.querySelector('#integrantes');

const btnGuardar = document.querySelector('#btnSaveInt');
const btnAbrirModal = document.querySelector('#abrirModalIntAdd');

obtenerLS();

btnAbrirModal.addEventListener('click', agregarInt);

document.addEventListener('DOMContentLoaded', () =>{
    imprimirPlaceholder();
});

/** FUNCIONES */

function agregarInt(){
    btnGuardar.addEventListener('click', guardarInt);
}



function guardarInt(){
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

    // cerrando todo...
    const btnCerrar1 = document.querySelector('#btnCloseInt1Add');
    const btnCerrar2 = document.querySelector('#btnCloseInt2Add');
    btnCerrar1.addEventListener('click', cerrar);
    btnCerrar2.addEventListener('click', cerrar);

    function cerrar(){
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);
        btnGuardar.removeEventListener('click', guardarInt, false);

        nombreInput.value = '';
        cedulaInput.value = '';
        cargoInput.value = '';
    }

    if(confirm('¿Quieres añadir el nuevo integrante?')){
        const nuevoIntegrante = {
            id: Date.now(),
            nombre: nombreInput.value.toUpperCase(),
            cedula: cedulaInput.value,
            cargo: cargoInput.value,
            eleProtInd: {
                'e-p-i-1': false,
                'e-p-i-2': false,
                'e-p-i-3': false,
                'e-p-i-4': false,
                'e-p-i-5': false,
                'e-p-i-6': false,
                'e-p-i-7': false,
                'e-p-i-8': false,
                'e-p-i-9': false,
                'e-p-i-10': false,
                'e-p-i-11': false,
                'e-p-i-12': false,
                'e-p-i-13': false,
                'e-p-i-14': false,
                'e-p-i-15': false,
                'e-p-i-16': false,
                'e-p-i-17': false,
                'e-p-i-18': false,
                'e-p-i-19': false,
            },
        }
    
        // añadir nuevo integrante al objeto
        integrantes.push(nuevoIntegrante);
        actualizarLS();
        actualizarBtn();
        btnCerrar1.click();

        // imprimir los integrantes
        imprimirIntegrantes();
    }
}



function imprimirIntegrantes(){
    limpiarDiv();

    if(integrantes.length > 0){
        const tablaHeader = document.createElement('table');
        tablaHeader.classList.add('table', 'table-light', 'table-striped', 'table-bordered', 'mb-5');
        tablaHeader.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>C.C</th>
                    <th>Cargo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        `;

        const tablaBody = document.createElement('tbody');
        integrantes.forEach(integrante =>{
            const {id, nombre, cedula, cargo} = integrante;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${nombre.toUpperCase()}</td>
                <td>${cedula}</td>
                <td>${cargo.toUpperCase()}</td>
            `;
            fila.dataset.id = id;

            const casillaBtn = document.createElement('td');
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-primary', 'text-light', 'p-2', 'me-2', 'mb-2');
            btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i>`;
            btnEditar.onclick = () =>{ editarIntegrante(id) }
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#modalIntEdit');

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'text-light', 'p-2');
            btnEliminar.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
            btnEliminar.onclick = () => { eliminarIntegrante(id) }


            casillaBtn.appendChild(btnEditar);
            casillaBtn.appendChild(btnEliminar);
            fila.appendChild(casillaBtn);
            tablaBody.appendChild(fila);

            
        });

        tablaHeader.appendChild(tablaBody);
        integrantesDiv.appendChild(tablaHeader);
    }else{
        imprimirPlaceholder();
    }
}



function eliminarIntegrante(id){
    if(confirm('¿Seguro quieres eliminar este integrante?')){
        integrantes = integrantes.filter(integrante => integrante.id !== id);
        actualizarLS();
        if(integrantes.length <= 0){
            window.localStorage.removeItem('integrantes');
        }
        actualizarBtn();
        imprimirIntegrantes();
    }
}



function getInt(id){
    let result;
    integrantes.forEach( (int, index) => {
        if(int.id === id){
            result = int;
        }        
    });
    return result;
}



function editInt(newInt){
    integrantes.forEach((int, index) =>{
        if(newInt.id === int.id){
            integrantes[index] = newInt;
            console.log(integrantes);
        }
    });
}



function editarIntegrante(id){
    console.log('editando: ' + id);
    let intActual = getInt(id);
    const { nombre, cedula, cargo, eleProtInd } = intActual;

    // Rellenar Datos
    document.querySelector('#nombreInt-edit').value = nombre;
    document.querySelector('#cedulaInt-edit').value = cedula;
    document.querySelector('#cargoInt-edit').value = cargo;

    for(let value in eleProtInd){
        const inputs = document.querySelectorAll(`input[name=${value}]`);
        inputs.forEach( input =>{
            if(input.value === eleProtInd[value]){
                input.checked = true;
            }else {
                input.checked = false;
            }
        });
    }


    // Guardar Datos
    const btnGuardarCambios = document.querySelector('#btnSaveIntEdit');
    btnGuardarCambios.addEventListener('click', guardar);
    function guardar(){
        let intEditando  = {
            id,
            nombre: document.querySelector('#nombreInt-edit').value,
            cedula: document.querySelector('#cedulaInt-edit').value,
            cargo: document.querySelector('#cargoInt-edit').value,
            eleProtInd: {
                'e-p-i-1': false,
                'e-p-i-2': false,
                'e-p-i-3': false,
                'e-p-i-4': false,
                'e-p-i-5': false,
                'e-p-i-6': false,
                'e-p-i-7': false,
                'e-p-i-8': false,
                'e-p-i-9': false,
                'e-p-i-10': false,
                'e-p-i-11': false,
                'e-p-i-12': false,
                'e-p-i-13': false,
                'e-p-i-14': false,
                'e-p-i-15': false,
                'e-p-i-16': false,
                'e-p-i-17': false,
                'e-p-i-18': false,
                'e-p-i-19': false,
            }
        }

        // Guardar datos - EleProtInd
        for(let value in intEditando.eleProtInd){
            const inputs = document.querySelectorAll(`input[name=${value}]`);
            inputs.forEach( input =>{
                if(input.checked === true){
                    intEditando.eleProtInd[value] = input.value;
                }
            }); 
        }

        editInt(intEditando);
        actualizarLS();
        imprimirIntegrantes();
        btnClose1.click();

    }

    const btnClose1 = document.querySelector('#btnCloseInt1Edit');
    const btnClose2 = document.querySelector('#btnCloseInt2Edit');
    btnClose1.addEventListener('click', cerrar);
    btnClose2.addEventListener('click', cerrar);

    function cerrar(){
        btnGuardarCambios.removeEventListener('click', guardar, false);
        btnClose1.removeEventListener('click', cerrar, false);
        btnClose2.removeEventListener('click', cerrar, false);
    }

}



function limpiarDiv(){
    while(integrantesDiv.firstChild){
        integrantesDiv.removeChild(integrantesDiv.firstChild);
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



function imprimirPlaceholder(){
    const divIntegrantes = document.querySelector('#integrantes');

    const ph = document.createElement('p');
    ph.classList.add('fs-4', 'text-secondary');
    ph.textContent = 'Aún no hay integrantes';
    ph.setAttribute('id', 'ph');

    if(integrantes.length > 0 && divIntegrantes.firstChild){
        divIntegrantes.removeChild(ph);
    }else if(integrantes.length <= 0 && !divIntegrantes.firstChild){
        divIntegrantes.appendChild(ph);
    }
}

function actualizarLS(){
    const LS = window.localStorage;
    if(LS.getItem('integrantes')){
        LS.removeItem('integrantes');
    }

    LS.setItem('integrantes', JSON.stringify(integrantes));
}

function obtenerLS(){
    const LS = window.localStorage;
    if(LS.getItem('integrantes')){
        const datosLS = LS.getItem('integrantes');
        integrantes = JSON.parse(datosLS);
        imprimirIntegrantes();
    }else{
        console.log('No hay datos en LS');
    }
}