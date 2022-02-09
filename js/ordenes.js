/** ARRAYS Y OBJETOS GLOBALES */
export const f = [];
const ordenTrabajo = {
    numero: false,
    horaFinal: false,
    horaInicial: false,
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

const ordenes = new Orden;

class UI{
    static imprimirAlerta(tipo, child){
        console.log(child);
        if(tipo === 'error'){
            child.classList.add('is-invalid');
        }
    }

    static imprimirOrdenes(){

    }
}

const crearOrden = document.querySelector('#crearOrden');




// Crea una nueva orden
crearOrden.addEventListener('click', (e) =>{

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
        UI.imprimirAlerta('error', nOrden);
        return; 
    }else if(hiOrden.value.length === 0){
        UI.imprimirAlerta('error', hiOrden);
        return;
    }

    // crear orden
    const ordenTrabajo = {
        numero: nOrden.value,
        horaInicial: hiOrden.value,
        horaFinal: hiOrden.value.length <= 0 ? false: hiOrden.value,
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
});