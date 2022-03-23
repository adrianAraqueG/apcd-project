/**--------------------------------------------------------|
 * --------------------- CLASES ---------------------------|
 *  -------------------------------------------------------|
 * */

/** ---------- Clase Orden --------- */
class Orden {
    constructor(){
        this.ordenes = [];
    }

    addOrden(orden){
        this.ordenes = [...this.ordenes, orden];
    }

    getOrdenes(){
        return this.ordenes;
    }

    getOrden(idOrden){
        for(const orden in this.ordenes){
            if(this.ordenes[orden].id === idOrden){
                return this.ordenes[orden];
            }
        }
    }

    editarOrden(ordenActualizada){
        for( let orden in this.ordenes ){
            if(this.ordenes[orden].id === ordenActualizada.id){
                this.ordenes[orden] = ordenActualizada;
            }
        };

        UI.imprimirOrdenes();
    }

    eliminarOrden(id){
        this.ordenes = this.ordenes.filter( orden => orden.id !== id);
    }

    obtenerLS(){
        const LS = window.localStorage;
        if(LS.getItem('ordenes')){
            const datosLS = LS.getItem('ordenes');
            this.ordenes = JSON.parse(datosLS);

            UI.imprimirOrdenes();
        }
    }

    actualizarLS(){
        const LS = window.localStorage;
        if(LS.getItem('ordenes')){
            LS.removeItem('ordenes');
        }
    
        LS.setItem('ordenes', JSON.stringify(this.ordenes));
    }
}



/** --------- Clase UI -------- */
class UI{
    // Agrega alertas a los inputs
    static inputAlerta(tipo, child){
        if(tipo === 'error'){
            child.classList.add('is-invalid');
        }
    }


    // Imprime alertas success y danger
    static imprimirAlerta(tipo, mensaje, elemento){
        if(tipo === 'success'){
            let divAlerta = document.createElement('div');
            divAlerta.innerHTML = `
                <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                        ${mensaje}
                    </div>
                </div>
            `;

            elemento.appendChild(divAlerta);

            setTimeout(()=>{
                elemento.removeChild(divAlerta);
            }, 3000);

        }
    }


    // Imprime las órdenes que haya en la instancia
    static imprimirOrdenes(){
        this.limpiarDivOrdenes();

        if(ordenes.getOrdenes().length > 0){
            ordenes.getOrdenes().forEach(orden => {
                const {horaInicial, horaFinal, id, numero} = orden;
    
                const divOrden = document.createElement('div');
                divOrden.classList.add('card', 'mt-4');
                divOrden.dataset.id = id;
    
                const cardHeader = document.createElement('h5');
                cardHeader.classList.add('card-header', 'bg-primary', 'text-light');
                cardHeader.innerHTML = `Orden N#: <b>${numero}</b>`;
    
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
    
                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.innerHTML = `Hora Inicial: <b>${horaInicial}</b> <br> Hora Final: <b>${horaFinal ? horaFinal : '--:--'}</b>`;
    
                    const btnEditar = document.createElement('button');
                    btnEditar.classList.add('btn', 'btn-primary', 'mb-2', 'mt-3');
                    btnEditar.textContent = 'Ver y Editar';
                    btnEditar.setAttribute('type', 'button');
                    btnEditar.setAttribute('data-bs-toggle', 'modal');
                    btnEditar.setAttribute('data-bs-target', '#editOrdenModal');
                    btnEditar.onclick = () => {editarOrden(id)};
    
                    const btnEliminar = document.createElement('button');
                    btnEliminar.classList.add('btn', 'btn-danger', 'mb-2', 'mt-3', 'ms-2');
                    btnEliminar.textContent = 'Eliminar';
                    btnEditar.setAttribute('type', 'button');
                    btnEliminar.onclick = () => {eliminarOrden(id)};
                
                //Añadir al div padre
                cardBody.appendChild(cardText);
                cardBody.appendChild(btnEditar);
                cardBody.appendChild(btnEliminar);
    
                divOrden.appendChild(cardHeader);
                divOrden.appendChild(cardBody);
                    
    
    
                document.querySelector('#ordenes').appendChild(divOrden);

                this.placeholder();
            });
        }
    }


    // Limpia los objetos que haya dentro del contenedor de las órdenes
    static limpiarDivOrdenes(){
        const divOrdenes = document.querySelector('#ordenes');

        while(divOrdenes.firstChild){
            divOrdenes.removeChild(divOrdenes.firstChild);
        }

    }

    // Placeholder - agrega o quita placeholder al div ordenes
    static placeholder(){
        const divOrdenes = document.querySelector('#ordenes');

        const ph = document.createElement('p');
        ph.classList.add('fs-4', 'text-secondary');
        ph.textContent = 'Aún no hay ordenes';

        if(ordenes.getOrdenes().length > 0 && divOrdenes.contains(ph)){
            divOrdenes.removeChild(ph);
        }else if(ordenes.getOrdenes().length <= 0 ){
            divOrdenes.appendChild(ph);
        }
    }
}




/**--------------------------------------------------------|
 * --------------------- INSTANCIAS -----------------------|
 *  -------------------------------------------------------|
 * */
export const ordenes = new Orden;
import {actualizarBtn as actualizarBtn} from './app.js';
ordenes.obtenerLS();
actualizarBtn();
UI.placeholder();



const btnCrearOrden = document.querySelector('#btnCrearOrden');

// Crea una nueva orden //
btnCrearOrden.addEventListener('click', crearOrden); 


/**--------------------------------------------------------|
 * --------------------- FUNCIONES ------------------------|
 *  -------------------------------------------------------|
 * */

let c = 0;
function crearOrden(){

    const nOrden = document.querySelector('#nOrden');
    const hiOrden = document.querySelector('#hiOrden');
    const hfOrden = document.querySelector('#hfOrden');

    if(c <= 0){
        nOrden.addEventListener('input', () =>{
            if(nOrden.classList.contains('is-invalid')){
                nOrden.classList.remove('is-invalid');
            }
        });
    
        hiOrden.addEventListener('input', () =>{
            if(hiOrden.classList.contains('is-invalid')){
                hiOrden.classList.remove('is-invalid');
            }
        });
    }


    const pInt = parseInt(nOrden.value);
    // validar campos
    if(nOrden.value === '' /*|| nOrden.value.length > 12 || pInt.toString().match(/\d/g).length < 12*/){
        UI.inputAlerta('error', nOrden);
        return; 
    }else if(hiOrden.value.length === 0){
        UI.inputAlerta('error', hiOrden);
        return;
    }



    // crear orden
    const ordenTrabajo = {
        id: Date.now(),
        numero: nOrden.value,
        horaInicial: hiOrden.value,
        horaFinal: hfOrden.value.length <= 0 ? false: hfOrden.value,
        datosPropios: {
            condEsp: {
                'c-e-1': false,
                'c-e-2': false,
                'c-e-3': false,
                'c-e-4': false,
                'c-e-5': false,
                'c-e-6': false,
                'c-e-7': false,
                'c-e-8': false,
                'c-e-9': false,
                'c-e-10': false,
                'c-e-11': false,
                'c-e-12': false,
                'c-e-13': false,
            },
            peligrosRiesgos: {
                tareasAltoRiesgo: {
                    't-a-r-1': false,
                    't-a-r-2': false,
                    't-a-r-3': false,
                    't-a-r-4': false,
                    't-a-r-5': false,
                    't-a-r-6': false,
                    't-a-r-7': false,
                },
                fisicos: {
                    'p-f-1': false,
                    'p-f-2': false,
                    'p-f-3': false,
                    'p-f-4': false,
                    'p-f-5': false,
                    'p-f-6': false,
                },
                biomecanicos: {
                    'p-bm-1': false,
                    'p-bm-1': false,
                    'p-bm-1': false,
                    'p-bm-1': false,
                    'p-bm-1': false,
                    'p-bm-1': false,
                },
                riesgoPublico: {
                    'r-p-1': false,
                },
                electrico: {
                    'p-e-1': false,
                    'p-e-1': false,
                    'p-e-1': false,
                    'p-e-1': false,
                    'p-e-1': false,
                },
                psicosocial: {
                    'p-p-1': false,
                    'p-p-2': false,
                    'p-p-3': false,
                    'p-p-4': false,
                    'p-p-5': false,
                },
                biologicos: {
                    'p-b-1': false,
                    'p-b-2': false,
                    'p-b-3': false,
                    'p-b-4': false,
                    'p-b-5': false,
                    'p-b-6': false,
                    'p-b-7': false,
                },
                mecanico: {
                    'p-m-1': false,
                    'p-m-2': false,
                    'p-m-3': false,
                    'p-m-4': false,
                },
                locativo: {
                    'p-l-1': false,
                    'p-l-2': false,
                    'p-l-3': false,
                    'p-l-4': false,
                },
                accTransito: {
                    'p-a-t-1': false,
                    'p-a-t-2': false,
                    'p-a-t-3': false,
                },
                fenoNaturales: {
                    'p-f-n-1': false,
                    'p-f-n-2': false,
                    'p-f-n-3': false,
                    'p-f-n-4': false,
                },
                quimicos: {
                    'p-q-1': false,
                    'p-q-2': false,
                    'p-q-3': false,
                    'p-q-4': false,
                    'p-q-5': false,
                    'p-q-6': false,
                    'p-q-7': false,
                    'p-q-8': false,
                },
            }
        }
    }

    ordenes.addOrden(ordenTrabajo);
    ordenes.actualizarLS();
    actualizarBtn();

    // limpiar inputs
    nOrden.value = '';
    hiOrden.value = '';
    hfOrden.value = '';

    // agregar alerta de success
    const divAlerta = document.querySelector('#nuevaOrden');
    UI.imprimirAlerta('success', 'Nueva orden agregada', divAlerta);

    // imprimir de nuevo las ordenes
    UI.imprimirOrdenes();

    c = c + 1;
};



function eliminarOrden(id){
    
    const opcion = confirm(`¿Quieres eliminar la orden ${id}?`);

    if(opcion === true){
        ordenes.eliminarOrden(id);
        ordenes.actualizarLS();
        if(ordenes.getOrdenes().length === 0){
            window.localStorage.removeItem('ordenes');
            actualizarBtn();
        }
        actualizarBtn();
        UI.imprimirOrdenes();
        UI.placeholder();
    }
}



function editarOrden(id){

    const orden = ordenes.getOrden(id);
    const {numero, horaFinal, horaInicial} = orden;
    const {datosPropios} = orden;

    document.querySelector('#edit-nOrden').value = numero;
    document.querySelector('#edit-hiOrden').value = horaInicial;
    document.querySelector('#edit-hfOrden').value = horaFinal;


    // Marcar Todas - Condicones Específicas
    do{
        const markAll = document.querySelector('input[name="c-e-ma"]');
        const npreguntas = 13


        // Settear el check de 'Marcar Todas'
        let counter = 0
        for(let value in datosPropios.condEsp){
            if(datosPropios.condEsp[value] === true){
                counter = counter + 1;
            }
        }

        if(counter === npreguntas){
            markAll.checked = true;
        }else{
            markAll.checked = false;
        }

        markAll.addEventListener('input', e =>{
            if(e.target.checked === true){
                for(let i = 1; i <= npreguntas; i++){
                    const input = document.querySelector(`input[name="c-e-${i}"]`);
                    input.checked = true;
                }

            } else if(e.target.checked === false){
                for(let i = 1; i <= npreguntas; i++){
                    const input = document.querySelector(`input[name="c-e-${i}"]`);
                    input.checked = false;
                }
            }
        });
        

    }while(false);

    // Llenar valores - Condiciones Específicas
    let c = 1
    for(let valor in datosPropios.condEsp){
        const inputs = document.querySelectorAll(`input[name=${valor}]`);
        
        inputs.forEach(input =>{
            if(input.value === datosPropios.condEsp[`${valor}`]){
                input.checked = true;
            }else{
                input.checked = false;
            }
        });
    }
    


    // Llenar valores - Tareas Alto Riesgo
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.tareasAltoRiesgo){
        const input = document.querySelector(`input[name="t-a-r-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.tareasAltoRiesgo[`t-a-r-${c}`];

        c = c + 1;
    }

    // Llenar valores - Peligros físicos
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.fisicos){
        const input = document.querySelector(`input[name="p-f-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.fisicos[`p-f-${c}`];

        c = c + 1;
    }

    // Llenar valores - Peligros biomecánicos
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.biomecanicos){
        const input = document.querySelector(`input[name="p-bm-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.biomecanicos[`p-bm-${c}`];

        c = c + 1;
    }

    // Llenar valores - Riesgo público
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.riesgoPublico){
        const input = document.querySelector(`input[name="r-p-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.riesgoPublico[`r-p-${c}`];

        c = c + 1;
    }
    // Llenar valores - Peligro eléctrico
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.electrico){
        const input = document.querySelector(`input[name="p-e-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.electrico[`p-e-${c}`];

        c = c + 1;
    }

    // Llenar valores - Psicosocial
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.psicosocial){
        const input = document.querySelector(`input[name="p-p-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.psicosocial[`p-p-${c}`];

        c = c + 1;
    }

    // Llenar valores - Biológicos
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.biologicos){
        const input = document.querySelector(`input[name="p-b-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.biologicos[`p-b-${c}`];

        c = c + 1;
    }

    // Llenar valores - Mecánico
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.mecanico){
        const input = document.querySelector(`input[name="p-m-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.mecanico[`p-m-${c}`];

        c = c + 1;
    }

    // Llenar valores - Locativo
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.locativo){
        const input = document.querySelector(`input[name="p-l-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.locativo[`p-l-${c}`];

        c = c + 1;
    }

    // Llenar valores - Accidente de Tránsito
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.accTransito){
        const input = document.querySelector(`input[name="p-a-t-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.accTransito[`p-a-t-${c}`];

        c = c + 1;
    }

    // Llenar valores - Fenómenos Naturales
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.fenoNaturales){
        const input = document.querySelector(`input[name="p-f-n-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.fenoNaturales[`p-f-n-${c}`];

        c = c + 1;
    }

    // Llenar valores - Químicos
    c = 1
    for(let valor in datosPropios.peligrosRiesgos.quimicos){
        const input = document.querySelector(`input[name="p-q-${c}"]`);
        input.checked = datosPropios.peligrosRiesgos.quimicos[`p-q-${c}`];

        c = c + 1;
    }
    

    // Listeners
    const btnGuardarCambios = document.querySelector('#guardarCambios');
    btnGuardarCambios.addEventListener('click', actualizar);
    function actualizar(e){
        if(confirm('¿Guardar cambios realizados en la Orden?')){

            const ordenEditada = {
                id,
                numero: document.querySelector('#edit-nOrden').value,
                horaInicial: document.querySelector('#edit-hiOrden').value,
                horaFinal: document.querySelector('#edit-hfOrden').value,
                datosPropios: {
                    condEsp: {
                        'c-e-1': false,
                        'c-e-2': false,
                        'c-e-3': false,
                        'c-e-4': false,
                        'c-e-5': false,
                        'c-e-6': false,
                        'c-e-7': false,
                        'c-e-8': false,
                        'c-e-9': false,
                        'c-e-10': false,
                        'c-e-11': false,
                        'c-e-12': false,
                        'c-e-13': false,
                    },
                    peligrosRiesgos: {
                        tareasAltoRiesgo: {
                            't-a-r-1': false,
                            't-a-r-2': false,
                            't-a-r-3': false,
                            't-a-r-4': false,
                            't-a-r-5': false,
                            't-a-r-6': false,
                            't-a-r-7': false,
                        },
                        fisicos: {
                            'p-f-1': false,
                            'p-f-2': false,
                            'p-f-3': false,
                            'p-f-4': false,
                            'p-f-5': false,
                            'p-f-6': false,
                        },
                        biomecanicos: {
                            'p-bm-1': false,
                            'p-bm-2': false,
                            'p-bm-3': false,
                            'p-bm-4': false,
                            'p-bm-5': false,
                            'p-bm-6': false,
                        },
                        riesgoPublico: {
                            'r-p-1': false,
                        },
                        electrico: {
                            'p-e-1': false,
                            'p-e-2': false,
                            'p-e-3': false,
                            'p-e-4': false,
                            'p-e-5': false,
                        },
                        psicosocial: {
                            'p-p-1': false,
                            'p-p-2': false,
                            'p-p-3': false,
                            'p-p-4': false,
                            'p-p-5': false,
                        },
                        biologicos: {
                            'p-b-1': false,
                            'p-b-2': false,
                            'p-b-3': false,
                            'p-b-4': false,
                            'p-b-5': false,
                            'p-b-6': false,
                            'p-b-7': false,
                        },
                        mecanico: {
                            'p-m-1': false,
                            'p-m-2': false,
                            'p-m-3': false,
                            'p-m-4': false,
                        },
                        locativo: {
                            'p-l-1': false,
                            'p-l-2': false,
                            'p-l-3': false,
                            'p-l-4': false,
                        },
                        accTransito: {
                            'p-a-t-1': false,
                            'p-a-t-2': false,
                            'p-a-t-3': false,
                        },
                        fenoNaturales: {
                            'p-f-n-1': false,
                            'p-f-n-2': false,
                            'p-f-n-3': false,
                            'p-f-n-4': false,
                        },
                        quimicos: {
                            'p-q-1': false,
                            'p-q-2': false,
                            'p-q-3': false,
                            'p-q-4': false,
                            'p-q-5': false,
                            'p-q-6': false,
                            'p-q-7': false,
                            'p-q-8': false,
                        },
                    }
                }
            }

            // Guardar Valores ya seleccionados

            // Guardar - Condiciones Específicas
            let c = 1;
            for(let valor in datosPropios.condEsp){
                const inputs = document.querySelectorAll(`input[name=${valor}]`);

                inputs.forEach(input =>{
                    if(input.checked === true){
                        ordenEditada.datosPropios.condEsp[valor] = input.value;
                    }
                });
            }

            // Guardar - Tareas Alto Riesgo
            c = 1;
            for(let valor in datosPropios.peligrosRiesgos.tareasAltoRiesgo){
                const input = document.querySelector(`input[name="t-a-r-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.tareasAltoRiesgo[`t-a-r-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Peligros físicos
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.fisicos){
                const input = document.querySelector(`input[name="p-f-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.fisicos[`p-f-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Peligros biomecánicos
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.biomecanicos){
                const input = document.querySelector(`input[name="p-bm-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.biomecanicos[`p-bm-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Riesgo público
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.riesgoPublico){
                const input = document.querySelector(`input[name="r-p-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.riesgoPublico[`r-p-${c}`] = input.checked;

                c = c + 1;
            }
            // Guardar valores - Peligro eléctrico
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.electrico){
                const input = document.querySelector(`input[name="p-e-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.electrico[`p-e-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Psicosocial
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.psicosocial){
                const input = document.querySelector(`input[name="p-p-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.psicosocial[`p-p-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Biológicos
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.biologicos){
                const input = document.querySelector(`input[name="p-b-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.biologicos[`p-b-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Mecánico
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.mecanico){
                const input = document.querySelector(`input[name="p-m-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.mecanico[`p-m-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Locativo
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.locativo){
                const input = document.querySelector(`input[name="p-l-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.locativo[`p-l-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Accidente de Tránsito
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.accTransito){
                const input = document.querySelector(`input[name="p-a-t-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.accTransito[`p-a-t-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Fenómenos Naturales
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.fenoNaturales){
                const input = document.querySelector(`input[name="p-f-n-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.fenoNaturales[`p-f-n-${c}`] = input.checked;

                c = c + 1;
            }

            // Guardar valores - Químicos
            c = 1
            for(let valor in datosPropios.peligrosRiesgos.quimicos){
                const input = document.querySelector(`input[name="p-q-${c}"]`);
                ordenEditada.datosPropios.peligrosRiesgos.quimicos[`p-q-${c}`] = input.checked;

                c = c + 1;
            }
            
            ordenes.editarOrden(ordenEditada);
            ordenes.actualizarLS();
            actualizarBtn();
            btnCerrar1.click();
        } 
    }

    // cuando cerramos...
    const btnCerrar1 = document.querySelector('#cerrarModal1');
    const btnCerrar2 = document.querySelector('#cerrarModal2');
    btnCerrar1.addEventListener('click', cerrar);
    btnCerrar2.addEventListener('click', cerrar);

    function cerrar(){
        // Borrar listeners
        btnGuardarCambios.removeEventListener('click', actualizar, false);
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);
    }
}