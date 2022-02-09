/**--------------------------------------------------------|
 * --------------------- CLASES ---------------------------|
 *  -------------------------------------------------------|
 * */

class Orden {
    constructor(){
        this.ordenes = [];
    }

    addOrden(orden){
        this.ordenes = [...this.ordenes, orden];
        console.log(this.ordenes);
    }

    getOrdenes(){
        return this.ordenes;
    }

    deleteOrden(id){

    }
}

class UI{
    static inputAlerta(tipo, child){
        console.log(child);
        if(tipo === 'error'){
            child.classList.add('is-invalid');
        }
    }

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

    static imprimirOrdenes(){
        this.limpiarDivOrdenes();

        ordenes.getOrdenes().forEach(orden => {
            const {horaInicial, horaFinal, id, numero} = orden;

            const divOrden = document.createElement('div');
            divOrden.classList.add('card', 'mt-4');
            divOrden.dataset.id = id;

            divOrden.innerHTML = `
                <h5 class="card-header bg-primary text-light">Orden N#: <b>${numero}</b></h5>
                <div class="card-body">

                <p class="card-text">Hora Inicial: <b>${horaInicial}</b> <br> Hora Final: <b>${horaFinal ? horaFinal : '--|--'}</b></p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary mb-2 mt-3" data-bs-toggle="modal" data-bs-target="#editOrdenModal">
                        Ver y Editar
                    </button>

                </div>
            `;

            document.querySelector('#ordenes').appendChild(divOrden);
        });
    }

    static limpiarDivOrdenes(){
        const divOrdenes = document.querySelector('#ordenes');

        while(divOrdenes.firstChild){
            divOrdenes.removeChild(divOrdenes.firstChild);
        }
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



const crearOrden = document.querySelector('#crearOrden');

// Crea una nueva orden //
crearOrden.addEventListener('click', () =>{

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
});


/**--------------------------------------------------------|
 * --------------------- FUNCIONES ------------------------|
 *  -------------------------------------------------------|
 * */