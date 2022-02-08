/** ARRAYS Y OBJETOS GLOBALES */
const ordenes = [];
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
        this.ordenes = []
    }

    getOrdenes(){
        return this.ordenes;
    }

    deleteOrden(id){

    }
}

class UI{
    
}