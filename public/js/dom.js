import Anuncio_Auto from './class.js'

function crearTabla(vista, lista){
    const tabla = document.createElement('table');
    tabla.classList.add("table");
    tabla.classList.add("table-hover");
    tabla.classList.add("table-dark");
    tabla.classList.add("table-sm");

    
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(vista, lista));

    return tabla;
}

function crearCabecera(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(const key in item){
        if(key != "noid"){
            const th = document.createElement('th');
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            tr.appendChild(th);

        }
    }
    thead.appendChild(tr);
    return thead;

}

function crearCuerpo(vista, lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key != "noid"){
                const td = document.createElement('td');
                const texto = document.createTextNode(element[key]);
                td.appendChild(texto);
                tr.appendChild(td);  

            }

        }
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
        }else if(element.hasOwnProperty('noid')){
            tr.setAttribute('data-id', element['noid']);

        }
        agregarManejadorTR(tr, vista);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTR(tr, vista){
    if(tr){
        tr.addEventListener("click", function(e){
            
            mostrarAnuncio(
                (vista.lista.filter((el) => el.id == e.target.parentNode.dataset.id ))[0]
            );
        })

    }
}

function crearFiltroColumna(vista){
   
    const lista = vista.lista;
  
    const row = document.createElement('div');
    row.classList.add("row");

    for(const key in lista[0]){
        const formcheck = document.createElement('div');
        formcheck.classList.add("form-check");
        formcheck.classList.add("col-sm-6");
        formcheck.classList.add("col-md-2");
        
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("value", key);
        input.classList.add("form-check-input");
        input.name = "check" + key;
        input.id = "check" + key;
        input.checked = true;
        input.addEventListener('click', ()=>vista.mostrarTabla());

        const label = document.createElement("label");
        label.setAttribute("for", "check" + key);
        label.classList.add("form-check-label");
        const texto = document.createTextNode(key);

        label.appendChild(texto);
        formcheck.appendChild(input);
        formcheck.appendChild(label);
        row.appendChild(formcheck);

    }

    return row;
}

function crearFiltroFila(vista){
   
    const lista = vista.lista;   
    const row = document.createElement('div');
    row.classList.add("row");
    row.classList.add("dropdown");
    const div1 = document.createElement('div');
    div1.classList.add("col-sm-6");

    const filtexto = document.createTextNode("Filtrar");
    const fillabel = document.createElement('label');
    fillabel.setAttribute('for', 'selectfila');
      fillabel.appendChild(filtexto);
      div1.appendChild(fillabel);
    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = "selectfila";
    select.addEventListener('change', ()=>vista.mostrarTabla());

    let tipos = lista.map(element=>element.transaccion).unique();
    
    tipos = ["Seleccione", ...tipos];

    tipos.forEach(element => {
        const option = document.createElement("option");
        option.setAttribute("value", element);
        const texto = document.createTextNode(element);
        
        option.appendChild(texto);
        select.appendChild(option);
    });

    div1.appendChild(select);
    row.appendChild(div1);    
    const div2 = document.createElement('div');
    div2.classList.add("form-group");
    div2.classList.add("col-sm-6");            
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('disabled', 'true');
    input1.id = "txtResultadoFiltroMax";
    input1.classList.add("form-control");    

    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('disabled', 'true');
    input2.id = "txtResultadoFiltroMin";
    input2.classList.add("form-control");   

    const input3 = document.createElement('input');
    input3.setAttribute('type', 'text');
    input3.setAttribute('disabled', 'true');
    input3.id = "txtResultadoFiltroPotencia";
    input3.classList.add("form-control");  

    const label = document.createElement('label');
    label.setAttribute('for', 'txtResultadoFiltro');        
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('disabled', 'true');
    input.id = "txtResultadoFiltro";
    input.classList.add("form-control");
    
    const protexto = document.createTextNode("Promedios");

    label.appendChild(protexto);
    div2.appendChild(label);
    div2.appendChild(input1);
    div2.appendChild(input2);
    div2.appendChild(input3);
    div2.appendChild(input);

    row.appendChild(div2);

    return row;
}

function crearFiltro(vista){

    const frag = document.createDocumentFragment();

    frag.appendChild(crearFiltroFila(vista));

    frag.appendChild(crearFiltroColumna(vista));
 
    return frag;
}


function ControlPorId(frm){
   
    if(frm.id.value== ""){
  
        document.getElementById("agregar").disabled = false; 
        document.getElementById("modificar").disabled = true;
        document.getElementById("eliminar").disabled = true;
    }else{
        document.getElementById("agregar").disabled = true; 
        document.getElementById("modificar").disabled = false;
        document.getElementById("eliminar").disabled = false;
 
    }
}
function obtenerAnuncio(id, frm){
    let transaccion="Venta";
    if(document.getElementById("rdoA").checked){
        transaccion="Alquiler";
    }
    const nuevoAnuncio = new Anuncio_Auto(id, frm.titulo.value,transaccion,
    frm.descripcion.value,frm.precio.value,frm.puertas.value, frm.kms.value, frm.potencia.value);
    return nuevoAnuncio;    
}


function mostrarAnuncio(anuncio){
    const frm = document.forms[0];
    frm.id.value = anuncio.id;
    if(anuncio.transaccion=="Alquiler"){
        document.getElementById("rdoA").checked=true;
    }else{document.getElementById("rdoV").checked=true;}
    frm.titulo.value = anuncio.titulo;
    frm.descripcion.value = anuncio.descripcion;
    frm.precio.value = anuncio.precio;
    frm.puertas.value = anuncio.puertas;
    frm.kms.value = anuncio.kms;
    frm.potencia.value = anuncio.potencia;
    ControlPorId(frm);
}
export {crearTabla, crearFiltro,ControlPorId,obtenerAnuncio};