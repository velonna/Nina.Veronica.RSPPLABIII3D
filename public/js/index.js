
import {listar, cargar, modificar, borrar} from './ajaxReq.js'
import {ControlPorId,obtenerAnuncio} from './dom.js'
import {Vista} from './class.js'

Array.prototype.unique = function(){return [...new Set(this)]};

let vista;
let frm;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){
    iniciarLocalStr("datosChek");
    vista = new Vista(document.getElementById('divTabla'),document.getElementById('divFiltros'));
    listar(vista);
    frm = document.forms[0];
    ControlPorId(frm);
    frm.cancelar.addEventListener('click', e=>{
        frm.id.value = '';        
        ControlPorId(frm);
    })
    frm.addEventListener('submit', e=>{
        e.preventDefault();
        
        if(e.submitter.id == "agregar"){
            const nuevoAnuncio = obtenerAnuncio(0,frm);
            if(nuevoAnuncio){
                cargar(vista, nuevoAnuncio);
                frm.reset();
            }

        }
        
        if(e.submitter.id == "modificar"){
            const nuevoAnuncio = obtenerAnuncio(Number(frm.id.value), frm);
            console.log(nuevoAnuncio);
            modificar(vista, nuevoAnuncio);
            limpiar()
            ControlPorId(frm);
        }
        
        if(e.submitter.id == "eliminar"){
            const id = Number(frm.id.value);
            borrar(vista, id);
            limpiar()
            ControlPorId(frm);
        }
        if(e.submitter.id == "cancelar"){
            limpiar()
            ControlPorId(frm);
        }
        
    })

}
function limpiar(){
    frm.reset();
    frm.id.value = '';
}
function iniciarLocalStr(unalist) {
    let array = new Array();
    if (localStorage.getItem(unalist) == null) {
        guardarDatosEnLStr(unalist, array);
        
    }
}
function guardarDatosEnLStr(nombre, datos) {

    localStorage.setItem(nombre, JSON.stringify(datos));
}



