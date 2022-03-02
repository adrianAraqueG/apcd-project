import { datos, datos as link1 } from './generales.js';
import { ordenes as link2 } from './ordenes.js';
import { integrantes as link3 } from './integrantes.js';

const btnBorrarTodo = document.querySelector('#borrarTodo');
btnBorrarTodo.addEventListener('click', e => {
    if(confirm('¿Está seguro de que quiere borrar toda la planilla?')){
        window.localStorage.clear();
        actualizarBtn();
        location.reload();
    }
});

document.addEventListener('DOMContentLoaded', () =>{
    setTimeout(() =>{
        const dLoader = document.querySelector('.d-loader');
        const body = document.querySelector('body');
        body.removeChild(dLoader);
    }, 300);
});

const btnDescargarPDF = document.querySelector('#descargarPDF');
btnDescargarPDF.addEventListener('click', convertirPDF);



async function convertirPDF(){
    const pdf = new jsPDF('p', 'pt', 'legal');
    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'BoldOblique');

    const image = await loadImage('img/forms/apcd-form.jpg');
    pdf.addImage(image, 'PNG', -60, 10, 720, 1015);

    // Datos Generales - Relleno
    if(obtenerLS('datosGenerales')){
        const datosGenerales = obtenerLS('datosGenerales');
        const {fecha, ciudad, departamento} = datosGenerales;
        const fechaArr = fecha.split('-');

        pdf.text(ciudad.toUpperCase(), 240, 53);
        pdf.text(departamento.toUpperCase(), 450, 51);
        pdf.text(fechaArr[0], 125, 54);
        pdf.text(fechaArr[1], 105, 54);
        pdf.text(fechaArr[2], 83, 54);  
    }


    // Integrantes - Relleno
    if(obtenerLS('integrantes')){
        const integrantes = obtenerLS('integrantes');

        let counter = 1;
        integrantes.forEach( integrante => {
            const {nombre, cargo, cedula} = integrante;
            if(getCoordsInt(counter, 'top')){
                const coords = getCoordsInt(counter, 'top');
                pdf.text(nombre.toUpperCase(), coords.nombre[0], coords.nombre[1]);
                pdf.text(cedula.toUpperCase(), coords.cedula[0], coords.cedula[1]);
                pdf.text(cargo.toUpperCase(), coords.cargo[0], coords.cargo[1]);
            }

            counter = counter + 1;
        });
    }

    

    // Condiciones Generales - Relleno
    if(obtenerLS('condicionesGenerales')){
        const condicionesGenerales = obtenerLS('condicionesGenerales');
        
        for(let value in condicionesGenerales.preguntas){
            if(condicionesGenerales.preguntas[value] !== false){
                const coords = getCoordsCG(value, condicionesGenerales.preguntas[value]);
                pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
            }
        }   
    }


    // Herramientas Equipos - Relleno
    if(obtenerLS('herramientasEquipos')){
        const herramientasEquipos = obtenerLS('herramientasEquipos');
        for(let value in herramientasEquipos){
            if(herramientasEquipos[value] !== false){
                const coords = getCoordsHE(value);
                pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
            }
        }
    }



    // Medidas Control - Relleno
    if(obtenerLS('medidasControl')){
        const medidasControl = obtenerLS('medidasControl');
        for(let value in medidasControl){
            if(medidasControl[value] !== false){
                const coords = getCoordsMC(value);
                pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
            }
        }
    }


    /** -------------------- Ordenes - Relleno -------------------- */
        // ESCALERA DOBLE F1- Relleno
        if(obtenerLS('escaleras')){
            const escF1 = obtenerLS('escaleras').escF1;
            for(let value in escF1){
                if(escF1[value] !== false){
                    const coords = getCoordsEsc(value, 'escF1');
                    pdf.circle(coords[0], coords[1], 1.8,'FD');
                }
            }
        }

        // ESCALERA DOBLE F2- Relleno
        if(obtenerLS('escaleras')){
            const escF2 = obtenerLS('escaleras').escF2;
            for(let value in escF2){
                if(escF2[value] !== false){
                    const coords = getCoordsEsc(value, 'escF2');
                    pdf.circle(coords[0], coords[1], 1.8,'FD');
                }
            }
        }

        // ESCALERA TA- Relleno
        if(obtenerLS('escaleras')){
            const escTA = obtenerLS('escaleras').escTA;
            for(let value in escTA){
                if(escTA[value] !== false){
                    const coords = getCoordsEsc(value, 'escTA');
                    pdf.circle(coords[0] + 2, coords[1] - 2, 1.8,'FD');
                }
            }
        }

        // ESCALERA AT- Relleno
        if(obtenerLS('escaleras')){
            const escAT = obtenerLS('escaleras').escAT;
            for(let value in escAT){
                if(escAT[value] !== false){
                    const coords = getCoordsEsc(value, 'escAT');
                    pdf.circle(coords[0] + 2, coords[1] - 2, 1.8,'FD');
                }
            }
        }
    
    
    
    // Firma - Relleno
    if(obtenerLS('integrantes')){
        const integrantes = obtenerLS('integrantes');

        let counter = 1;
        integrantes.forEach( integrante => {
            const { nombre } = integrante;

            if(getCoordsInt(counter, 'bottom')){
                const coords = getCoordsInt(counter, 'bottom');
                pdf.text(nombre.toUpperCase(), coords.nombre[0], coords.nombre[1]);
                pdf.text(nombre.toUpperCase(), coords.firma[0], coords.firma[1]);
            }

            counter = counter + 1;
        });
    }



    /** -------------------- Ordenes - Relleno -------------------- */

        // Datos Generales
        if(obtenerLS('ordenes')){
            let i = 0;
            const ordenes = obtenerLS('ordenes');

            ordenes.forEach( orden =>{
                pdf.setFontSize(7);
                const {numero, horaInicial, horaFinal, datosPropios} = orden;
                const { eleProtInd, condEsp, peligrosRiesgos } = datosPropios;
                const { tareasAltoRiesgo, fisicos, biomecanicos, riesgoPublico, psicosocial, electrico } = peligrosRiesgos;
                const { biologicos, mecanico, locativo, accTransito, fenoNaturales, quimicos } = peligrosRiesgos;
                const coords = getCoordsO(i);
                
                
                pdf.text(numero !== false ? numero : '', coords.numero[0], coords.numero[1]);
                pdf.text(horaFinal !== false ? horaFinal : '', coords.horaFinal[0], coords.horaFinal[1]);
                pdf.text(horaInicial !== false ? horaInicial : '', coords.horaInicial[0], coords.horaInicial[1]);
                
                for(let value in eleProtInd){
                    if(eleProtInd[value] !== false){
                        const ce = coords.eleProtInd[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in condEsp){
                    if(condEsp[value] !== false){
                        const ce = coords.condEsp[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                /** COL 1 */
                for(let value in tareasAltoRiesgo){
                    if(tareasAltoRiesgo[value] !== false){
                        const ce = coords.col1.tareasAltoRiesgo[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in fisicos){
                    if(fisicos[value] !== false){
                        const ce = coords.col1.fisicos[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in biomecanicos){
                    if(biomecanicos[value] !== false){
                        const ce = coords.col1.biomecanicos[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }
                
                for(let value in riesgoPublico){
                    if(riesgoPublico[value] !== false){
                        const ce = coords.col1.riesgoPublico[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in psicosocial){
                    if(psicosocial[value] !== false){
                        const ce = coords.col1.psicosocial[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in electrico){
                    if(electrico[value] !== false){
                        const ce = coords.col1.electrico[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                /** COL 2 */
                for(let value in biologicos){
                    if(biologicos[value] !== false){
                        const ce = coords.col2.biologicos[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in mecanico){
                    if(mecanico[value] !== false){
                        const ce = coords.col2.mecanico[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in locativo){
                    if(locativo[value] !== false){
                        const ce = coords.col2.locativo[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in accTransito){
                    if(accTransito[value] !== false){
                        const ce = coords.col2.accTransito[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in fenoNaturales){
                    if(fenoNaturales[value] !== false){
                        const ce = coords.col2.fenoNaturales[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                for(let value in quimicos){
                    if(quimicos[value] !== false){
                        const ce = coords.col2.quimicos[value];
                        pdf.circle(ce[0], ce[1], 1.8, 'FD');
                    }
                }

                i = i + 1;

                if(i > 6){
                    i = 0;
                    pdf.addPage();
                    pdf.addImage(image, 'PNG', -60, 10, 720, 1015);
                    pdf.setFontSize(8);

                    // Datos Generales - Relleno
                        if(obtenerLS('datosGenerales')){
                            const datosGenerales = obtenerLS('datosGenerales');
                            const {fecha, ciudad, departamento} = datosGenerales;
                            const fechaArr = fecha.split('-');

                            pdf.text(ciudad.toUpperCase(), 240, 53);
                            pdf.text(departamento.toUpperCase(), 450, 51);
                            pdf.text(fechaArr[0], 125, 54);
                            pdf.text(fechaArr[1], 105, 54);
                            pdf.text(fechaArr[2], 83, 54);  
                        }


                        // Integrantes - Relleno
                        if(obtenerLS('integrantes')){
                            const integrantes = obtenerLS('integrantes');

                            let counter = 1;
                            integrantes.forEach( integrante => {
                                const {nombre, cargo, cedula} = integrante;
                                if(getCoordsInt(counter, 'top')){
                                    const coords = getCoordsInt(counter, 'top');
                                    pdf.text(nombre.toUpperCase(), coords.nombre[0], coords.nombre[1]);
                                    pdf.text(cedula.toUpperCase(), coords.cedula[0], coords.cedula[1]);
                                    pdf.text(cargo.toUpperCase(), coords.cargo[0], coords.cargo[1]);
                                }

                                counter = counter + 1;
                            });
                        }

                        

                        // Condiciones Generales - Relleno
                        if(obtenerLS('condicionesGenerales')){
                            const condicionesGenerales = obtenerLS('condicionesGenerales');
                            
                            for(let value in condicionesGenerales.preguntas){
                                if(condicionesGenerales.preguntas[value] !== false){
                                    const coords = getCoordsCG(value, condicionesGenerales.preguntas[value]);
                                    pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
                                }
                            }   
                        }


                        // Herramientas Equipos - Relleno
                        if(obtenerLS('herramientasEquipos')){
                            const herramientasEquipos = obtenerLS('herramientasEquipos');
                            for(let value in herramientasEquipos){
                                if(herramientasEquipos[value] !== false){
                                    const coords = getCoordsHE(value);
                                    pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
                                }
                            }
                        }



                        // Medidas Control - Relleno
                        if(obtenerLS('medidasControl')){
                            const medidasControl = obtenerLS('medidasControl');
                            for(let value in medidasControl){
                                if(medidasControl[value] !== false){
                                    const coords = getCoordsMC(value);
                                    pdf.circle(coords[0] + 2, coords[1] - 2, 1.6, 'FD');
                                }
                            }
                        }


                        /** -------------------- Ordenes - Relleno -------------------- */
                            // ESCALERA DOBLE F1- Relleno
                            if(obtenerLS('escaleras')){
                                const escF1 = obtenerLS('escaleras').escF1;
                                for(let value in escF1){
                                    if(escF1[value] !== false){
                                        const coords = getCoordsEsc(value, 'escF1');
                                        pdf.circle(coords[0], coords[1], 1.8,'FD');
                                    }
                                }
                            }

                            // ESCALERA DOBLE F2- Relleno
                            if(obtenerLS('escaleras')){
                                const escF2 = obtenerLS('escaleras').escF2;
                                for(let value in escF2){
                                    if(escF2[value] !== false){
                                        const coords = getCoordsEsc(value, 'escF2');
                                        pdf.circle(coords[0], coords[1], 1.8,'FD');
                                    }
                                }
                            }

                            // ESCALERA TA- Relleno
                            if(obtenerLS('escaleras')){
                                const escTA = obtenerLS('escaleras').escTA;
                                for(let value in escTA){
                                    if(escTA[value] !== false){
                                        const coords = getCoordsEsc(value, 'escTA');
                                        pdf.circle(coords[0] + 2, coords[1] - 2, 1.8,'FD');
                                    }
                                }
                            }

                            // ESCALERA AT- Relleno
                            if(obtenerLS('escaleras')){
                                const escAT = obtenerLS('escaleras').escAT;
                                for(let value in escAT){
                                    if(escAT[value] !== false){
                                        const coords = getCoordsEsc(value, 'escAT');
                                        pdf.circle(coords[0] + 2, coords[1] - 2, 1.8,'FD');
                                    }
                                }
                            }

                            // Firma - Relleno
                            if(obtenerLS('integrantes')){
                                const integrantes = obtenerLS('integrantes');

                                let counter = 1;
                                integrantes.forEach( integrante => {
                                    const { nombre } = integrante;

                                    if(getCoordsInt(counter, 'bottom')){
                                        const coords = getCoordsInt(counter, 'bottom');
                                        pdf.text(nombre.toUpperCase(), coords.nombre[0], coords.nombre[1]);
                                        pdf.text(nombre.toUpperCase(), coords.firma[0], coords.firma[1]);
                                    }

                                    counter = counter + 1;
                                });
                            }
                }
            });
        }
    
    /** ---------------------------------------------------------- */



    //** Guardar PDF */
    if(confirm('¿Quieres guardar el PDF? Asegúrate de que llenaste TODOS los campos.')){
        const nombrePDF = obtenerLS('datosGenerales').fecha !== undefined ? obtenerLS('datosGenerales').fecha : 'apcd-pdf';
        pdf.save(nombrePDF);
    }
}

function getCoordsO(num){
    const coords = [
        {
            numero: [ 510, 296],
            horaInicial: [ 505, 303.5],
            horaFinal: [ 505, 310],
            eleProtInd: {
                'e-p-i-1': [133, 304],
                'e-p-i-2': [133, 311],
                'e-p-i-3': [133, 318],
                'e-p-i-4': [133, 325],
                'e-p-i-5': [133, 332],
                'e-p-i-6': [133, 339],
                'e-p-i-7': [133, 347],
                'e-p-i-8': [133, 354],
                'e-p-i-9': [133, 361],
                'e-p-i-10': [133, 368],
                'e-p-i-11': [133, 375],
                'e-p-i-12': [133, 382],
                'e-p-i-13': [133, 389],
                'e-p-i-14': [133, 396],
                'e-p-i-15': [133, 403],
                'e-p-i-16': [133, 410],
                'e-p-i-17': [133, 418],
                'e-p-i-18': [133, 425],
                'e-p-i-19': [133, 432],
            },
            condEsp: {
                'c-e-1': [487, 772],
                'c-e-2': [487, 780],
                'c-e-3': [487, 788],
                'c-e-4': [487, 797],
                'c-e-5': [487, 805],
                'c-e-6': [487, 814],
                'c-e-7': [487, 822],
                'c-e-8': [487, 830],
                'c-e-9': [487, 838],
                'c-e-10': [487, 847],
                'c-e-11': [487, 855],
                'c-e-12': [487, 863],
                'c-e-13': [487, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [134, 473],
                    't-a-r-2': [134, 480],
                    't-a-r-3': [134, 487],
                    't-a-r-4': [134, 494],
                    't-a-r-5': [134, 502],
                    't-a-r-6': [134, 509],
                    't-a-r-7': [134, 517],
                },
                fisicos: {
                    'p-f-1': [134, 532.5],
                    'p-f-2': [134, 540],
                    'p-f-3': [134, 547],
                    'p-f-4': [134, 555],
                    'p-f-5': [134, 563],
                    'p-f-6': [134, 570],
                },
                biomecanicos: {
                    'p-bm-1': [134, 591.5],
                    'p-bm-2': [134, 601],
                    'p-bm-3': [134, 608.5],
                    'p-bm-4': [134, 615.5],
                    'p-bm-5': [134, 623],
                    'p-bm-6': [134, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [134, 649],
                },
                electrico: {
                    'p-e-1': [134, 664],
                    'p-e-2': [134, 671.5],
                    'p-e-3': [134, 679],
                    'p-e-4': [134, 687],
                    'p-e-5': [134, 695],
                },
                psicosocial: {
                    'p-p-1': [134, 709],
                    'p-p-2': [134, 716.5],
                    'p-p-3': [134, 722.5],
                    'p-p-4': [134, 731],
                    'p-p-5': [134, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [321, 472],
                    'p-b-2': [321, 479],
                    'p-b-3': [321, 486],
                    'p-b-4': [321, 493],
                    'p-b-5': [321, 501],
                    'p-b-6': [321, 508],
                    'p-b-7': [321, 516],
                },
                mecanico: {
                    'p-m-1': [321, 532],
                    'p-m-2': [321, 539],
                    'p-m-3': [321, 546],
                    'p-m-4': [321, 553.5],
                },
                locativo: {
                    'p-l-1': [321, 569],
                    'p-l-2': [321, 579],
                    'p-l-3': [321, 590],
                    'p-l-4': [321, 600],
                },
                accTransito: {
                    'p-a-t-1': [322, 614],
                    'p-a-t-2': [322, 622],
                    'p-a-t-3': [322, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [322, 647],
                    'p-f-n-2': [322, 655],
                    'p-f-n-3': [322, 663],
                    'p-f-n-4': [322, 671],
                },
                quimicos: {
                    'p-q-1': [322, 686],
                    'p-q-2': [322, 693.5],
                    'p-q-3': [322, 701],
                    'p-q-4': [322, 708],
                    'p-q-5': [322, 715.5],
                    'p-q-6': [322, 723],
                    'p-q-7': [322, 730],
                    'p-q-8': [322, 737],
                },
            }
        },
        {
            numero: [ 510, 318],
            horaInicial: [ 505, 324],
            horaFinal: [ 505, 331],
            eleProtInd: {
                'e-p-i-1': [146.5, 304],
                'e-p-i-2': [146.5, 311],
                'e-p-i-3': [146.5, 318],
                'e-p-i-4': [146.5, 325],
                'e-p-i-5': [146.5, 332],
                'e-p-i-6': [146.5, 339],
                'e-p-i-7': [146.5, 347],
                'e-p-i-8': [146.5, 354],
                'e-p-i-9': [146.5, 361],
                'e-p-i-10': [146.5, 368],
                'e-p-i-11': [146.5, 375],
                'e-p-i-12': [146.5, 382],
                'e-p-i-13': [146.5, 389],
                'e-p-i-14': [146.5, 396],
                'e-p-i-15': [146.5, 403],
                'e-p-i-16': [146.5, 410],
                'e-p-i-17': [146.5, 418],
                'e-p-i-18': [146.5, 425],
                'e-p-i-19': [146.5, 432],
            },
            condEsp: {
                'c-e-1': [507, 772],
                'c-e-2': [507, 780],
                'c-e-3': [507, 788],
                'c-e-4': [507, 797],
                'c-e-5': [507, 805],
                'c-e-6': [507, 814],
                'c-e-7': [507, 822],
                'c-e-8': [507, 830],
                'c-e-9': [507, 838],
                'c-e-10': [507, 847],
                'c-e-11': [507, 855],
                'c-e-12': [507, 863],
                'c-e-13': [507, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [147, 473],
                    't-a-r-2': [147, 480],
                    't-a-r-3': [147, 487],
                    't-a-r-4': [147, 494],
                    't-a-r-5': [147, 502],
                    't-a-r-6': [147, 509],
                    't-a-r-7': [147, 517],
                },
                fisicos: {
                    'p-f-1': [147, 532.5],
                    'p-f-2': [147, 540],
                    'p-f-3': [147, 547],
                    'p-f-4': [147, 555],
                    'p-f-5': [147, 563],
                    'p-f-6': [147, 570],
                },
                biomecanicos: {
                    'p-bm-1': [147, 591.5],
                    'p-bm-2': [147, 601],
                    'p-bm-3': [147, 608.5],
                    'p-bm-4': [147, 615.5],
                    'p-bm-5': [147, 623],
                    'p-bm-6': [147, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [147, 649],
                },
                electrico: {
                    'p-e-1': [147, 664],
                    'p-e-2': [147, 671.5],
                    'p-e-3': [147, 679],
                    'p-e-4': [147, 687],
                    'p-e-5': [147, 695],
                },
                psicosocial: {
                    'p-p-1': [147, 709],
                    'p-p-2': [147, 716.5],
                    'p-p-3': [147, 722.5],
                    'p-p-4': [147, 731],
                    'p-p-5': [147, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [334, 472],
                    'p-b-2': [334, 479],
                    'p-b-3': [334, 486],
                    'p-b-4': [334, 493],
                    'p-b-5': [334, 501],
                    'p-b-6': [334, 508],
                    'p-b-7': [334, 516],
                },
                mecanico: {
                    'p-m-1': [334, 532],
                    'p-m-2': [334, 539],
                    'p-m-3': [334, 546],
                    'p-m-4': [334, 553.5],
                },
                locativo: {
                    'p-l-1': [334, 569],
                    'p-l-2': [334, 579],
                    'p-l-3': [334, 590],
                    'p-l-4': [334, 600],
                },
                accTransito: {
                    'p-a-t-1': [335, 614],
                    'p-a-t-2': [335, 622],
                    'p-a-t-3': [335, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [335, 647],
                    'p-f-n-2': [335, 655],
                    'p-f-n-3': [335, 663],
                    'p-f-n-4': [335, 671],
                },
                quimicos: {
                    'p-q-1': [335, 686],
                    'p-q-2': [335, 693.5],
                    'p-q-3': [335, 701],
                    'p-q-4': [335, 708],
                    'p-q-5': [335, 715.5],
                    'p-q-6': [335, 723],
                    'p-q-7': [335, 730],
                    'p-q-8': [335, 737],
                },
            }
        },
        {
            numero: [ 510, 339],
            horaInicial: [ 505, 346],
            horaFinal: [ 505, 353],
            eleProtInd: {
                'e-p-i-1': [160, 304],
                'e-p-i-2': [160, 311],
                'e-p-i-3': [160, 318],
                'e-p-i-4': [160, 325],
                'e-p-i-5': [160, 332],
                'e-p-i-6': [160, 339],
                'e-p-i-7': [160, 347],
                'e-p-i-8': [160, 354],
                'e-p-i-9': [160, 361],
                'e-p-i-10': [160, 368],
                'e-p-i-11': [160, 375],
                'e-p-i-12': [160, 382],
                'e-p-i-13': [160, 389],
                'e-p-i-14': [160, 396],
                'e-p-i-15': [160, 403],
                'e-p-i-16': [160, 410],
                'e-p-i-17': [160, 418],
                'e-p-i-18': [160, 425],
                'e-p-i-19': [160, 432],
            },
            condEsp: {
                'c-e-1': [524, 772],
                'c-e-2': [524, 780],
                'c-e-3': [524, 788],
                'c-e-4': [524, 797],
                'c-e-5': [524, 805],
                'c-e-6': [524, 814],
                'c-e-7': [524, 822],
                'c-e-8': [524, 830],
                'c-e-9': [524, 838],
                'c-e-10': [524, 847],
                'c-e-11': [524, 855],
                'c-e-12': [524, 863],
                'c-e-13': [524, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [160.5, 473],
                    't-a-r-2': [160.5, 480],
                    't-a-r-3': [160.5, 487],
                    't-a-r-4': [160.5, 494],
                    't-a-r-5': [160.5, 502],
                    't-a-r-6': [160.5, 509],
                    't-a-r-7': [160.5, 517],
                },
                fisicos: {
                    'p-f-1': [160.5, 532.5],
                    'p-f-2': [160.5, 540],
                    'p-f-3': [160.5, 547],
                    'p-f-4': [160.5, 555],
                    'p-f-5': [160.5, 563],
                    'p-f-6': [160.5, 570],
                },
                biomecanicos: {
                    'p-bm-1': [160.5, 591.5],
                    'p-bm-2': [160.5, 601],
                    'p-bm-3': [160.5, 608.5],
                    'p-bm-4': [160.5, 615.5],
                    'p-bm-5': [160.5, 623],
                    'p-bm-6': [160.5, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [160.5, 649],
                },
                electrico: {
                    'p-e-1': [160.5, 664],
                    'p-e-2': [160.5, 671.5],
                    'p-e-3': [160.5, 679],
                    'p-e-4': [160.5, 687],
                    'p-e-5': [160.5, 695],
                },
                psicosocial: {
                    'p-p-1': [160.5, 709],
                    'p-p-2': [160.5, 716.5],
                    'p-p-3': [160.5, 722.5],
                    'p-p-4': [160.5, 731],
                    'p-p-5': [160.5, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [347, 472],
                    'p-b-2': [347, 479],
                    'p-b-3': [347, 486],
                    'p-b-4': [347, 493],
                    'p-b-5': [347, 501],
                    'p-b-6': [347, 508],
                    'p-b-7': [347, 516],
                },
                mecanico: {
                    'p-m-1': [347, 532],
                    'p-m-2': [347, 539],
                    'p-m-3': [347, 546],
                    'p-m-4': [347, 553.5],
                },
                locativo: {
                    'p-l-1': [347, 569],
                    'p-l-2': [347, 579],
                    'p-l-3': [347, 590],
                    'p-l-4': [347, 600],
                },
                accTransito: {
                    'p-a-t-1': [347, 614],
                    'p-a-t-2': [347, 622],
                    'p-a-t-3': [347, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [347, 647],
                    'p-f-n-2': [347, 655],
                    'p-f-n-3': [347, 663],
                    'p-f-n-4': [347, 671],
                },
                quimicos: {
                    'p-q-1': [347, 686],
                    'p-q-2': [347, 693.5],
                    'p-q-3': [347, 701],
                    'p-q-4': [347, 708],
                    'p-q-5': [347, 715.5],
                    'p-q-6': [347, 723],
                    'p-q-7': [347, 730],
                    'p-q-8': [347, 737],
                },
            }
        },
        {
            numero: [ 510, 360],
            horaInicial: [ 505, 368],
            horaFinal: [ 505, 375],
            eleProtInd: {
                'e-p-i-1': [173, 304],
                'e-p-i-2': [173, 311],
                'e-p-i-3': [173, 318],
                'e-p-i-4': [173, 325],
                'e-p-i-5': [173, 332],
                'e-p-i-6': [173, 339],
                'e-p-i-7': [173, 347],
                'e-p-i-8': [173, 354],
                'e-p-i-9': [173, 361],
                'e-p-i-10': [173, 368],
                'e-p-i-11': [173, 375],
                'e-p-i-12': [173, 382],
                'e-p-i-13': [173, 389],
                'e-p-i-14': [173, 396],
                'e-p-i-15': [173, 403],
                'e-p-i-16': [173, 410],
                'e-p-i-17': [173, 418],
                'e-p-i-18': [173, 425],
                'e-p-i-19': [173, 432],
            },
            condEsp: {
                'c-e-1': [540, 772],
                'c-e-2': [540, 780],
                'c-e-3': [540, 788],
                'c-e-4': [540, 797],
                'c-e-5': [540, 805],
                'c-e-6': [540, 814],
                'c-e-7': [540, 822],
                'c-e-8': [540, 830],
                'c-e-9': [540, 838],
                'c-e-10': [540, 847],
                'c-e-11': [540, 855],
                'c-e-12': [540, 863],
                'c-e-13': [540, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [174, 473],
                    't-a-r-2': [174, 480],
                    't-a-r-3': [174, 487],
                    't-a-r-4': [174, 494],
                    't-a-r-5': [174, 502],
                    't-a-r-6': [174, 509],
                    't-a-r-7': [174, 517],
                },
                fisicos: {
                    'p-f-1': [174, 532.5],
                    'p-f-2': [174, 540],
                    'p-f-3': [174, 547],
                    'p-f-4': [174, 555],
                    'p-f-5': [174, 563],
                    'p-f-6': [174, 570],
                },
                biomecanicos: {
                    'p-bm-1': [174, 591.5],
                    'p-bm-2': [174, 601],
                    'p-bm-3': [174, 608.5],
                    'p-bm-4': [174, 615.5],
                    'p-bm-5': [174, 623],
                    'p-bm-6': [174, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [174, 649],
                },
                electrico: {
                    'p-e-1': [174, 664],
                    'p-e-2': [174, 671.5],
                    'p-e-3': [174, 679],
                    'p-e-4': [174, 687],
                    'p-e-5': [174, 695],
                },
                psicosocial: {
                    'p-p-1': [174, 709],
                    'p-p-2': [174, 716.5],
                    'p-p-3': [174, 722.5],
                    'p-p-4': [174, 731],
                    'p-p-5': [174, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [360, 472],
                    'p-b-2': [360, 479],
                    'p-b-3': [360, 486],
                    'p-b-4': [360, 493],
                    'p-b-5': [360, 501],
                    'p-b-6': [360, 508],
                    'p-b-7': [360, 516],
                },
                mecanico: {
                    'p-m-1': [360, 532],
                    'p-m-2': [360, 539],
                    'p-m-3': [360, 546],
                    'p-m-4': [360, 553.5],
                },
                locativo: {
                    'p-l-1': [360, 569],
                    'p-l-2': [360, 579],
                    'p-l-3': [360, 590],
                    'p-l-4': [360, 600],
                },
                accTransito: {
                    'p-a-t-1': [361, 614],
                    'p-a-t-2': [361, 622],
                    'p-a-t-3': [361, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [361, 647],
                    'p-f-n-2': [361, 655],
                    'p-f-n-3': [361, 663],
                    'p-f-n-4': [361, 671],
                },
                quimicos: {
                    'p-q-1': [361, 686],
                    'p-q-2': [361, 693.5],
                    'p-q-3': [361, 701],
                    'p-q-4': [361, 708],
                    'p-q-5': [361, 715.5],
                    'p-q-6': [361, 723],
                    'p-q-7': [361, 730],
                    'p-q-8': [361, 737],
                },
            }
        },
        {
            numero: [ 510, 381.5],
            horaInicial: [ 505, 389],
            horaFinal: [ 505, 397],
            eleProtInd: {
                'e-p-i-1': [186, 304],
                'e-p-i-2': [186, 311],
                'e-p-i-3': [186, 318],
                'e-p-i-4': [186, 325],
                'e-p-i-5': [186, 332],
                'e-p-i-6': [186, 339],
                'e-p-i-7': [186, 347],
                'e-p-i-8': [186, 354],
                'e-p-i-9': [186, 361],
                'e-p-i-10': [186, 368],
                'e-p-i-11': [186, 375],
                'e-p-i-12': [186, 382],
                'e-p-i-13': [186, 389],
                'e-p-i-14': [186, 396],
                'e-p-i-15': [186, 403],
                'e-p-i-16': [186, 410],
                'e-p-i-17': [186, 418],
                'e-p-i-18': [186, 425],
                'e-p-i-19': [186, 432],
            },
            condEsp: {
                'c-e-1': [557, 772],
                'c-e-2': [557, 780],
                'c-e-3': [557, 788],
                'c-e-4': [557, 797],
                'c-e-5': [557, 805],
                'c-e-6': [557, 814],
                'c-e-7': [557, 822],
                'c-e-8': [557, 830],
                'c-e-9': [557, 838],
                'c-e-10': [557, 847],
                'c-e-11': [557, 855],
                'c-e-12': [557, 863],
                'c-e-13': [557, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [187, 473],
                    't-a-r-2': [187, 480],
                    't-a-r-3': [187, 487],
                    't-a-r-4': [187, 494],
                    't-a-r-5': [187, 502],
                    't-a-r-6': [187, 509],
                    't-a-r-7': [187, 517],
                },
                fisicos: {
                    'p-f-1': [187, 532.5],
                    'p-f-2': [187, 540],
                    'p-f-3': [187, 547],
                    'p-f-4': [187, 555],
                    'p-f-5': [187, 563],
                    'p-f-6': [187, 570],
                },
                biomecanicos: {
                    'p-bm-1': [187, 591.5],
                    'p-bm-2': [187, 601],
                    'p-bm-3': [187, 608.5],
                    'p-bm-4': [187, 615.5],
                    'p-bm-5': [187, 623],
                    'p-bm-6': [187, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [187, 649],
                },
                electrico: {
                    'p-e-1': [187, 664],
                    'p-e-2': [187, 671.5],
                    'p-e-3': [187, 679],
                    'p-e-4': [187, 687],
                    'p-e-5': [187, 695],
                },
                psicosocial: {
                    'p-p-1': [187, 709],
                    'p-p-2': [187, 716.5],
                    'p-p-3': [187, 722.5],
                    'p-p-4': [187, 731],
                    'p-p-5': [187, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [373, 472],
                    'p-b-2': [373, 479],
                    'p-b-3': [373, 486],
                    'p-b-4': [373, 493],
                    'p-b-5': [373, 501],
                    'p-b-6': [373, 508],
                    'p-b-7': [373, 516],
                },
                mecanico: {
                    'p-m-1': [373, 532],
                    'p-m-2': [373, 539],
                    'p-m-3': [373, 546],
                    'p-m-4': [373, 553.5],
                },
                locativo: {
                    'p-l-1': [373, 569],
                    'p-l-2': [373, 579],
                    'p-l-3': [373, 590],
                    'p-l-4': [373, 600],
                },
                accTransito: {
                    'p-a-t-1': [374, 614],
                    'p-a-t-2': [374, 622],
                    'p-a-t-3': [374, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [374, 647],
                    'p-f-n-2': [374, 655],
                    'p-f-n-3': [374, 663],
                    'p-f-n-4': [374, 671],
                },
                quimicos: {
                    'p-q-1': [374, 686],
                    'p-q-2': [374, 693.5],
                    'p-q-3': [374, 701],
                    'p-q-4': [374, 708],
                    'p-q-5': [374, 715.5],
                    'p-q-6': [374, 723],
                    'p-q-7': [374, 730],
                    'p-q-8': [374, 737],
                },
            }
        },
        {
            numero: [ 510, 404],
            horaInicial: [ 505, 410.5],
            horaFinal: [ 505, 417],
            eleProtInd: {
                'e-p-i-1': [199, 304],
                'e-p-i-2': [199, 311],
                'e-p-i-3': [199, 318],
                'e-p-i-4': [199, 325],
                'e-p-i-5': [199, 332],
                'e-p-i-6': [199, 339],
                'e-p-i-7': [199, 347],
                'e-p-i-8': [199, 354],
                'e-p-i-9': [199, 361],
                'e-p-i-10': [199, 368],
                'e-p-i-11': [199, 375],
                'e-p-i-12': [199, 382],
                'e-p-i-13': [199, 389],
                'e-p-i-14': [199, 396],
                'e-p-i-15': [199, 403],
                'e-p-i-16': [199, 410],
                'e-p-i-17': [199, 418],
                'e-p-i-18': [199, 425],
                'e-p-i-19': [199, 432],
            },
            condEsp: {
                'c-e-1': [574, 772],
                'c-e-2': [574, 780],
                'c-e-3': [574, 788],
                'c-e-4': [574, 797],
                'c-e-5': [574, 805],
                'c-e-6': [574, 814],
                'c-e-7': [574, 822],
                'c-e-8': [574, 830],
                'c-e-9': [574, 838],
                'c-e-10': [574, 847],
                'c-e-11': [574, 855],
                'c-e-12': [574, 863],
                'c-e-13': [574, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [200, 473],
                    't-a-r-2': [200, 480],
                    't-a-r-3': [200, 487],
                    't-a-r-4': [200, 494],
                    't-a-r-5': [200, 502],
                    't-a-r-6': [200, 509],
                    't-a-r-7': [200, 517],
                },
                fisicos: {
                    'p-f-1': [200, 532.5],
                    'p-f-2': [200, 540],
                    'p-f-3': [200, 547],
                    'p-f-4': [200, 555],
                    'p-f-5': [200, 563],
                    'p-f-6': [200, 570],
                },
                biomecanicos: {
                    'p-bm-1': [200, 591.5],
                    'p-bm-2': [200, 601],
                    'p-bm-3': [200, 608.5],
                    'p-bm-4': [200, 615.5],
                    'p-bm-5': [200, 623],
                    'p-bm-6': [200, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [200, 649],
                },
                electrico: {
                    'p-e-1': [200, 664],
                    'p-e-2': [200, 671.5],
                    'p-e-3': [200, 679],
                    'p-e-4': [200, 687],
                    'p-e-5': [200, 695],
                },
                psicosocial: {
                    'p-p-1': [200, 709],
                    'p-p-2': [200, 716.5],
                    'p-p-3': [200, 722.5],
                    'p-p-4': [200, 731],
                    'p-p-5': [200, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [386, 472],
                    'p-b-2': [386, 479],
                    'p-b-3': [386, 486],
                    'p-b-4': [386, 493],
                    'p-b-5': [386, 501],
                    'p-b-6': [386, 508],
                    'p-b-7': [386, 516],
                },
                mecanico: {
                    'p-m-1': [386, 532],
                    'p-m-2': [386, 539],
                    'p-m-3': [386, 546],
                    'p-m-4': [386, 553.5],
                },
                locativo: {
                    'p-l-1': [386, 569],
                    'p-l-2': [386, 579],
                    'p-l-3': [386, 590],
                    'p-l-4': [386, 600],
                },
                accTransito: {
                    'p-a-t-1': [387, 614],
                    'p-a-t-2': [387, 622],
                    'p-a-t-3': [387, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [387, 647],
                    'p-f-n-2': [387, 655],
                    'p-f-n-3': [387, 663],
                    'p-f-n-4': [387, 671],
                },
                quimicos: {
                    'p-q-1': [387, 686],
                    'p-q-2': [387, 693.5],
                    'p-q-3': [387, 701],
                    'p-q-4': [387, 708],
                    'p-q-5': [387, 715.5],
                    'p-q-6': [387, 723],
                    'p-q-7': [387, 730],
                    'p-q-8': [387, 737],
                },
            }
        },
        {
            numero: [ 510, 425],
            horaInicial: [ 505, 432],
            horaFinal: [ 505, 439],
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
                'c-e-1': [591, 772],
                'c-e-2': [591, 780],
                'c-e-3': [591, 788],
                'c-e-4': [591, 797],
                'c-e-5': [591, 805],
                'c-e-6': [591, 814],
                'c-e-7': [591, 822],
                'c-e-8': [591, 830],
                'c-e-9': [591, 838],
                'c-e-10': [591, 847],
                'c-e-11': [591, 855],
                'c-e-12': [591, 863],
                'c-e-13': [591, 872],
            },
            col1: {
                tareasAltoRiesgo: {
                    't-a-r-1': [213, 473],
                    't-a-r-2': [213, 480],
                    't-a-r-3': [213, 487],
                    't-a-r-4': [213, 494],
                    't-a-r-5': [213, 502],
                    't-a-r-6': [213, 509],
                    't-a-r-7': [213, 517],
                },
                fisicos: {
                    'p-f-1': [213, 532.5],
                    'p-f-2': [213, 540],
                    'p-f-3': [213, 547],
                    'p-f-4': [213, 555],
                    'p-f-5': [213, 563],
                    'p-f-6': [213, 570],
                },
                biomecanicos: {
                    'p-bm-1': [213, 591.5],
                    'p-bm-2': [213, 601],
                    'p-bm-3': [213, 608.5],
                    'p-bm-4': [213, 615.5],
                    'p-bm-5': [213, 623],
                    'p-bm-6': [213, 632.5],
                },
                riesgoPublico: {
                    'r-p-1': [213, 649],
                },
                electrico: {
                    'p-e-1': [213, 664],
                    'p-e-2': [213, 671.5],
                    'p-e-3': [213, 679],
                    'p-e-4': [213, 687],
                    'p-e-5': [213, 695],
                },
                psicosocial: {
                    'p-p-1': [213, 709],
                    'p-p-2': [213, 716.5],
                    'p-p-3': [213, 722.5],
                    'p-p-4': [213, 731],
                    'p-p-5': [213, 738],
                },
            },
            col2: {
                biologicos: {
                    'p-b-1': [399, 472],
                    'p-b-2': [399, 479],
                    'p-b-3': [399, 486],
                    'p-b-4': [399, 493],
                    'p-b-5': [399, 501],
                    'p-b-6': [399, 508],
                    'p-b-7': [399, 516],
                },
                mecanico: {
                    'p-m-1': [399, 532],
                    'p-m-2': [399, 539],
                    'p-m-3': [399, 546],
                    'p-m-4': [399, 553.5],
                },
                locativo: {
                    'p-l-1': [399, 569],
                    'p-l-2': [399, 579],
                    'p-l-3': [399, 590],
                    'p-l-4': [399, 600],
                },
                accTransito: {
                    'p-a-t-1': [400, 614],
                    'p-a-t-2': [400, 622],
                    'p-a-t-3': [400, 631],
                },
                fenoNaturales: {
                    'p-f-n-1': [400, 647],
                    'p-f-n-2': [400, 655],
                    'p-f-n-3': [400, 663],
                    'p-f-n-4': [400, 671],
                },
                quimicos: {
                    'p-q-1': [400, 686],
                    'p-q-2': [400, 693.5],
                    'p-q-3': [400, 701],
                    'p-q-4': [400, 708],
                    'p-q-5': [400, 715.5],
                    'p-q-6': [400, 723],
                    'p-q-7': [400, 730],
                    'p-q-8': [400, 737],
                },
            }
        },
    ]
    return coords[num];
}

function getCoordsEsc(nombre, tipo){
    const coords = {
        escF1: {
           'e-f1-1': [300, 311],
           'e-f1-2': [300, 320],
           'e-f1-3': [300, 332],
           'e-f1-4': [300, 338],
           'e-f1-5': [300, 346],
           'e-f1-6': [300, 353],
           'e-f1-7': [300, 360],
           'e-f1-8': [300, 367],
           'e-f1-9': [300, 375],
           'e-f1-10': [300, 382],
           'e-f1-11': [300, 389],
           'e-f1-12': [300, 396],
           'e-f1-13': [300, 403],
           'e-f1-14': [300, 410],
        },
        escF2: {
           'e-f2-1': [327, 310],
           'e-f2-2': [327, 321],
           'e-f2-3': [327, 332],
           'e-f2-4': [327, 338],
           'e-f2-5': [327, 346],
           'e-f2-6': [327, 353],
           'e-f2-7': [327, 360],
           'e-f2-8': [327, 367],
           'e-f2-9': [327, 375],
           'e-f2-10': [327, 382],
           'e-f2-11': [327, 389],
           'e-f2-12': [327, 396],
           'e-f2-13': [327, 403],
           'e-f2-14': [327, 410],
        },
        escTA: {
           'e-ta-1': [351, 312],
           'e-ta-2': [351, 322],
           'e-ta-3': [351, 333],
           'e-ta-4': [351, 340],
           'e-ta-5': [351, 348],
           'e-ta-6': [351, 355],
           'e-ta-7': [351, 362],
           'e-ta-8': [351, 369],
           'e-ta-9': [351, 377],
           'e-ta-10': [351, 384],
           'e-ta-11': [351, 391],
           'e-ta-12': [351, 398],
           'e-ta-13': [351, 405],
           'e-ta-14': [351, 412],
        },
        escAT: {
            'e-at-1': [377, 312],
            'e-at-2': [377, 322],
            'e-at-3': [377, 333],
            'e-at-4': [377, 340],
            'e-at-5': [377, 348],
            'e-at-6': [377, 355],
            'e-at-7': [377, 362],
            'e-at-8': [377, 369],
            'e-at-9': [377, 377],
            'e-at-10': [377, 384],
            'e-at-11': [377, 391],
            'e-at-12': [377, 398],
            'e-at-13': [377, 405],
            'e-at-14': [377, 412],
        }
    }

    switch(tipo){
        case 'escF1': {
            for(let value in coords.escF1){
                if(nombre === value){
                    return coords.escF1[value];
                }
            }
        }
        case 'escF2': {
            for(let value in coords.escF2){
                if(nombre === value){
                    return coords.escF2[value];
                }
            }
        }
        case 'escTA': {
            for(let value in coords.escTA){
                if(nombre === value){
                    return coords.escTA[value];
                }
            }
        }
        case 'escAT': {
            for(let value in coords.escAT){
                if(nombre === value){
                    return coords.escAT[value];
                }
            }
        }
    }
}

function getCoordsMC(nombre){
    const coords = {
        'm-c-1': [411, 488],
        'm-c-2': [411, 496],
        'm-c-3': [411, 503],
        'm-c-4': [411, 510],
        'm-c-5': [411, 517.5],
        'm-c-6': [411, 525.5],
        'm-c-7': [411, 534],
        'm-c-8': [411, 541],
        'm-c-9': [411, 548],
        'm-c-10': [411, 555.5],
        'm-c-11': [411, 563],
        'm-c-12': [411, 572],
        'm-c-13': [412, 581],
        'm-c-14': [412, 593],
        'm-c-15': [412, 602],
        'm-c-16': [412, 609.5],
        'm-c-17': [412, 617],
        'm-c-18': [412, 624.5],
        'm-c-19': [412, 633],
        'm-c-20': [413, 641.5],
        'm-c-21': [413, 650],
        'm-c-22': [413, 657],
        'm-c-23': [413, 664],
        'm-c-24': [413, 672],
        'm-c-25': [413, 681],
        'm-c-26': [413, 688],
        'm-c-27': [413, 696],
    }

    for(let value in coords){
        if(value === nombre){
            return coords[value];
        }
    }
}

function getCoordsHE(nombre){
    const coords = {
        'h-e-1': [397, 305],
        'h-e-2': [397, 312], 
        'h-e-3': [397, 319],
        'h-e-4': [397, 326],
        'h-e-5': [397, 333],
        'h-e-6': [397, 340],
        'h-e-7': [397, 347],
        'h-e-8': [397, 354],
        'h-e-9': [397, 361],
        'h-e-10': [397, 368],
        'h-e-11': [397, 376],
        'h-e-12': [397, 383],
        'h-e-13': [397, 390],
    }

    for(let value in coords){
        if(value === nombre){
            return coords[value];
        }
    }
}

function getCoordsInt(pos, lugar){
    const coords1 = [
        {
            nombre: [42, 89],
            cedula: [172, 86],
            cargo: [248, 86]
        },
        {
            nombre: [42, 101],
            cedula: [172, 99],
            cargo: [248, 98]
        },
        {
            nombre: [42, 115],
            cedula: [172, 112],
            cargo: [248, 112]
        }
    ]

    const coords2 = [
        {
            nombre: [135, 905],
            firma: [135, 916],
        },
        {
            nombre: [135, 926],
            firma: [135, 936],
        },
        {
            nombre: [135, 947],
            firma: [135, 958],
        }
    ]

    if(lugar === 'top'){
        switch(pos){
            case 1:{
                return coords1[0];
            }
            case 2:{
                return coords1[1];
            }
            case 3:{
                return coords1[2];
            }
        }
    }else if(lugar === 'bottom'){
        switch(pos){
            case 1:{
                return coords2[0];
            }
            case 2:{
                return coords2[1];
            }
            case 3:{
                return coords2[2];
            }
        }
    }
}

function getCoordsCG(nombre, valor){
    const coordsSi = {
        'c-g-1': [382, 154],
        'c-g-2': [382, 161],
        'c-g-3': [382, 171],
        'c-g-4': [382, 184],
        'c-g-5': [382, 191],
        'c-g-6': [382, 202],
        'c-g-7': [382, 214],
        'c-g-8': [382, 226],
        'c-g-9': [382, 234],
        'c-g-10': [382, 240],
        'c-g-11': [382, 248],
        'c-g-12': [382, 255],
        'c-g-13': [382, 262],
        'c-g-14': [382, 270],
    };
    const coordsNo = {
        'c-g-1': [396, 154],
        'c-g-2': [396, 161],
        'c-g-3': [396, 171],
        'c-g-4': [396, 184],
        'c-g-5': [396, 191],
        'c-g-6': [396, 202],
        'c-g-7': [396, 214],
        'c-g-8': [396, 226],
        'c-g-9': [396, 234],
        'c-g-10': [396, 240],
        'c-g-11': [396, 248],
        'c-g-12': [396, 255],
        'c-g-13': [396, 262],
        'c-g-14': [396, 270],
    };
    const coordsNA = {
        'c-g-1': [410, 154],
        'c-g-2': [410, 161],
        'c-g-3': [410, 171],
        'c-g-4': [410, 184],
        'c-g-5': [410, 191],
        'c-g-6': [410, 202],
        'c-g-7': [410, 214],
        'c-g-8': [410, 226],
        'c-g-9': [410, 234],
        'c-g-10': [410, 240],
        'c-g-11': [410, 248],
        'c-g-12': [410, 255],
        'c-g-13': [410, 262],
        'c-g-14': [410, 270],
    };

    if(valor === 'si'){
        for(let item in coordsSi){
            if(item === nombre){
                return coordsSi[item];
            }
        }
    } else if(valor === 'no'){
        for(let item in coordsNo){
            if(item === nombre){
                return coordsNo[item];
            }
        }
    } else if(valor === 'na'){
        for(let item in coordsNA){
            if(item === nombre){
                return coordsNA[item];
            }
        }
    }
}




/**--------------------------------------------------------|
 * --------------------- UTILIDADES -----------------------|
 *  -------------------------------------------------------|
 * */
function loadImage(url){
    return new Promise( resolve =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = e =>{
            const reader = new FileReader();
            reader.onload = event =>{
                const res = event.target.result;
                resolve(res);
            }
            const file = xhr.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}



function obtenerLS(datos){
    
    const LS = window.localStorage;
    switch(datos){
        case 'datosGenerales': {
            if(LS.getItem('datosGenerales')){
                const dt = JSON.parse(LS.getItem('datosGenerales'));
                return dt;
            }else{
                return false;
            }
        }
        case 'condicionesGenerales': {
            if(LS.getItem('condicionesGenerales')){
                const dt = JSON.parse(LS.getItem('condicionesGenerales'));
                return dt;
            }else{
                return false;
            }
        }
        case 'medidasControl': {
            if(LS.getItem('medidasControl')){
                const dt = JSON.parse(LS.getItem('medidasControl'));
                return dt;
            }else{
                return false;
            }
            break;
        }
        case 'herramientasEquipos': {
            if(LS.getItem('herramientasEquipos')){
                const dt = JSON.parse(LS.getItem('herramientasEquipos'));
                return dt;
            }else{
                return false;
            }
        }
        case 'escaleras': {
            if(LS.getItem('escaleras')){
                const dt = JSON.parse(LS.getItem('escaleras'));
                return dt;
            }else{
                return false;
            }
        }
        case 'ordenes': {
            if(LS.getItem('ordenes')){
                const dt = JSON.parse(LS.getItem('ordenes'));
                return dt;
            }else{
                return false;
            }
        }
        case 'integrantes': {
            if(LS.getItem('integrantes')){
                const dt = JSON.parse(LS.getItem('integrantes'));
                return dt;
            }else{
                return false;
            }
        }
    }
}



export function actualizarBtn(){
    const divBtn = document.querySelector('#divBtnBT');
    const LS = window.localStorage;
    if(LS.getItem('ordenes') 
    || LS.getItem('datosGenerales')
    || LS.getItem('condicionesGenerales')
    || LS.getItem('medidasControl')
    || LS.getItem('herramientasEquipos')
    || LS.getItem('escaleras')
    || LS.getItem('integrantes')){
        if(divBtn.classList.contains('d-none')){
            divBtn.classList.remove('d-none');
        }
    }else{
        divBtn.classList.add('d-none');
    }
}


