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
        console.log('añadiendo orden al objeto');
        console.log(this.ordenes);
    }

    getOrdenes(){
        return this.ordenes;
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
                    //btnEditar.onclick = editarOrden(id);
    
                    const btnEliminar = document.createElement('button');
                    btnEliminar.classList.add('btn', 'btn-danger', 'mb-2', 'mt-3', 'ms-2');
                    btnEliminar.textContent = 'Eliminar';
                    btnEditar.setAttribute('type', 'button');
                    btnEliminar.onclick = () => eliminarOrden(id);
                
                //Añadir al div padre
                cardBody.appendChild(cardText);
                cardBody.appendChild(btnEditar);
                cardBody.appendChild(btnEliminar);
    
                divOrden.appendChild(cardHeader);
                divOrden.appendChild(cardBody);
                    
    
    
                document.querySelector('#ordenes').appendChild(divOrden);
                console.log('imprimiendo ordenes...');
            });
        }
    }


    // Limpia los objetos que haya dentro del contenedor de las órdenes
    static limpiarDivOrdenes(){
        const divOrdenes = document.querySelector('#ordenes');

        while(divOrdenes.firstChild){
            divOrdenes.removeChild(divOrdenes.firstChild);
        }

        console.log('limpiando div ordenes...');
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
function crearOrden(){

    const nOrden = document.querySelector('#nOrden');
    const hiOrden = document.querySelector('#hiOrden');
    const hfOrden = document.querySelector('#hfOrden');

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
                p1: false,
                p2: false,
                p3: false,
                p4: false,
                p5: false,
                p6: false,
                p7: false,
                p8: false,
                p9: false,
                p10: false,
                p11: false,
                p12: false,
                p13: false,
                p14: false,
                p15: false,
                p16: false,
                p17: false,
                p18: false,
                p19: false,
            },
            condEsp: {
                p1: false,
                p2: false,
                p3: false,
                p4: false,
                p5: false,
                p6: false,
                p7: false,
                p8: false,
                p9: false,
                p10: false,
                p11: false,
                p12: false,
                p13: false,
            },
            peligrosRiesgos: {
                tareasAltoRiesgo: {
                    p1: false,
                    p2: false,
                    p3: false,
                    p4: false,
                    p5: false,
                    p6: false,
                    p7: false,
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