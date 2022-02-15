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
        //console.log('añadiendo orden al objeto');
        //console.log(this.ordenes);
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
        console.log(ordenActualizada);
        for( let orden in this.ordenes ){
            if(this.ordenes[orden].id === ordenActualizada.id){
                this.ordenes[orden] = ordenActualizada;
            }
        };

        UI.imprimirOrdenes();
        console.log(this.ordenes);
    }

    eliminarOrden(id){
        this.ordenes = this.ordenes.filter( orden => orden.id !== id);
    }
}



/** --------- Clase UI -------- */
class UI{
    // Agrega alertas a los inputs
    static inputAlerta(tipo, child){
        console.log(child);
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
                //console.log('imprimiendo ordenes...');
                //console.log(divOrden);
            });
        }
    }


    // Limpia los objetos que haya dentro del contenedor de las órdenes
    static limpiarDivOrdenes(){
        const divOrdenes = document.querySelector('#ordenes');

        while(divOrdenes.firstChild){
            divOrdenes.removeChild(divOrdenes.firstChild);
        }

        //console.log('limpiando div ordenes...');
    }
}




/**--------------------------------------------------------|
 * --------------------- INSTANCIAS -----------------------|
 *  -------------------------------------------------------|
 * */
export const ordenes = new Orden;



/**--------------------------------------------------------|
 * --------------------- LISTENERS ------------------------|
 *  -------------------------------------------------------|
 * */
document.addEventListener('DOMContentLoaded', () =>{
    // Comprobar si hay ordenes
    if(ordenes.getOrdenes().length > 0){
        //actualizar placeholder
        
    }else{
        // actualizar placeholder
        
    }

});



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
            console.log('nOden');
        });
    
        hiOrden.addEventListener('input', () =>{
            if(hiOrden.classList.contains('is-invalid')){
                hiOrden.classList.remove('is-invalid');
            }
        });
    }

    // validar campos
    if(nOrden.value === ''){
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
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                    p6: false,
                },
                biomecanicos: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                    p6: false,
                },
                riesgoPublico: {
                    p1: false,
                },
                electrico: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                },
                psicosocial: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                },
                biologicos: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                    p6: false,
                    p7: false,
                },
                mecanico: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                },
                locativo: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                },
                accTransito: {
                    p1: false,
                    p2: false,
                    p3: false,
                },
                fenoNaturales: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                },
                quimicos: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                    p6: false,
                    p7: false,
                    p8: false,
                },
            }
        }
    }

    ordenes.addOrden(ordenTrabajo);

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
        console.log('eliminando orden ', id);
        ordenes.eliminarOrden(id);

        UI.imprimirOrdenes();
    
        console.log(ordenes);
    }
}



function editarOrden(id){
    console.log('editando: ', id);

    const orden = ordenes.getOrden(id);
    const {numero, horaFinal, horaInicial} = orden;
    const {datosPropios} = orden;

    document.querySelector('#edit-nOrden').value = numero;
    document.querySelector('#edit-hiOrden').value = horaInicial;
    document.querySelector('#edit-hfOrden').value = horaFinal;

    let c1 = 1
    for(let valor in datosPropios.condEsp){
        const input = document.querySelector(`input[name="c-e-${c1}"]`);
        input.checked = datosPropios.condEsp[`c-e-${c1}`];

        c1 = c1 + 1;
    }
    let c2 = 1
    for(let valor in datosPropios.eleProtInd){
        const input = document.querySelector(`input[name="e-p-i-${c2}"]`);
        input.checked = datosPropios.eleProtInd[`e-p-i-${c2}`];

        c2 = c2 + 1;
    }

    // Listeners
    const btnGuardarCambios = document.querySelector('#guardarCambios');
    btnGuardarCambios.addEventListener('click', actualizar);
    function actualizar(e){
        if(confirm('está por guardar')){

            const ordenEditada = {
                id,
                numero: document.querySelector('#edit-nOrden').value,
                horaInicial: document.querySelector('#edit-hiOrden').value,
                horaFinal: document.querySelector('#edit-hfOrden').value,
                datosPropios: {
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
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                            p6: false,
                        },
                        biomecanicos: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                            p6: false,
                        },
                        riesgoPublico: {
                            p1: false,
                        },
                        electrico: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                        },
                        psicosocial: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                        },
                        biologicos: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                            p6: false,
                            p7: false,
                        },
                        mecanico: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                        },
                        locativo: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                        },
                        accTransito: {
                            p1: false,
                            p2: false,
                            p3: false,
                        },
                        fenoNaturales: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                        },
                        quimicos: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: false,
                            p5: false,
                            p6: false,
                            p7: false,
                            p8: false,
                        },
                    }
                }
            }

            let c1 = 1
            for(let valor in datosPropios.condEsp){
                const input = document.querySelector(`input[name="c-e-${c1}"]`);
                ordenEditada.datosPropios.condEsp[`c-e-${c1}`] = input.checked;

                c1 = c1 + 1;
            }

            let c2 = 1
            for(let valor in datosPropios.eleProtInd){
                const input = document.querySelector(`input[name="e-p-i-${c2}"]`);
                ordenEditada.datosPropios.eleProtInd[`e-p-i-${c2}`] = input.checked;

                c2 = c2 + 1;
            }

            ordenes.editarOrden(ordenEditada);
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
        console.log('Quitando listeners...');
        console.log('Ordenes Generales: ');
        console.log(ordenes.getOrdenes());
        btnGuardarCambios.removeEventListener('click', actualizar, false);
        btnCerrar1.removeEventListener('click', cerrar, false);
        btnCerrar2.removeEventListener('click', cerrar, false);
    }
}