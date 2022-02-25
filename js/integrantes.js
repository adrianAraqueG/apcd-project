/** APCD - JS 
 * Adrián Araque
 * Opegin
*/

export { integrantes };

/**--------------------------------------------------------|
 * --------------------- ARRAYS GLOBALES ------------------|
 *  -------------------------------------------------------|
 * */

let integrantes = [];

const nombreInput = document.querySelector('#nombreInt');
const cedulaInput = document.querySelector('#cedulaInt');
const cargoInput = document.querySelector('#cargoInt');
const integrantesDiv = document.querySelector('#integrantes');

const btnGuardar = document.querySelector('#btnGuardarInt');
const btnAbrirModal = document.querySelector('#abrirModalInt');

obtenerLS();
console.log(integrantes);

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
    const btnCerrar1 = document.querySelector('#btnCerrarInt1');
    const btnCerrar2 = document.querySelector('#btnCerrarInt2');
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
            cargo: cargoInput.value
        }
    
        // añadir nuevo integrante al objeto
        integrantes.push(nuevoIntegrante);
        actualizarLS();
        btnCerrar1.click();
        console.log(integrantes);

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
            btnEditar.classList.add('btn', 'btn-primary', 'text-light', 'p-2', 'me-2');
            btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i>`;
            btnEditar.onclick = () =>{ editarIntegrante(id) }
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#modalIntegrantes');

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
        console.log('elimiando...', id);
        console.log(integrantes);
        imprimirIntegrantes();
    }
}



function editarIntegrante(id){
    console.log('editando...', id);

    // Cambiando texto Modal
    const modalLabel = document.querySelector('#integrantesTitle');
    modalLabel.textContent = 'Editando Integrante';
    btnGuardar.textContent = 'Guardar Cambios';

    // Llenando inputs
    integrantes.forEach(integrante =>{ 
        if(integrante.id === id){
            nombreInput.value = integrante.nombre;
            cedulaInput.value = integrante.cedula;
            cargoInput.value = integrante.cargo;
        }
    });

    // Agregar listener al botón guardar cambios
    btnGuardar.addEventListener('click', guardarEdicion);
    function guardarEdicion(){
        if(confirm('¿Quieres guardar los cambios?')){
            const integranteEditado = {
                id: id,
                nombre: nombreInput.value,
                cedula: cedulaInput.value,
                cargo: cargoInput.value,
            }

            integrantes.forEach((integrante, index) =>{
                if(integrante.id === integranteEditado.id){
                    integrantes[index] = integranteEditado;
                }
            });

            imprimirIntegrantes();

            btnCerrar1.click();
            console.log(integrantes);
        }
    }

    // resetear todo
    const btnCerrar1 = document.querySelector('#btnCerrarInt1');
    const btnCerrar2 = document.querySelector('#btnCerrarInt2');
    btnCerrar1.addEventListener('click', cerrar);
    btnCerrar2.addEventListener('click', cerrar);

    function cerrar(){
        btnGuardar.removeEventListener('click', guardarEdicion, false);
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);

        nombreInput.value = '';
        cedulaInput.value = '';
        cargoInput.value = '';
        modalLabel.textContent = 'Agregar Nuevo Integrante';
        btnGuardar.textContent = 'Guardar';
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

    if(integrantes.length > 0 && divIntegrantes.contains(ph)){
        divIntegrantes.removeChild(ph);
    }else if(integrantes.length <= 0 ){
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