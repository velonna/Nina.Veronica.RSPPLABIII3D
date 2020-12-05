import {crearFiltro,crearTabla} from './dom.js'

  class Anuncio {
      constructor(_id, _titulo,_transaccion,_descripcion,_precio) {
      this.id = _id;
      this.titulo = _titulo;
      this.transaccion = _transaccion;
      this.descripcion = _descripcion;
      this.precio = _precio;     
           
    }
  
}

export default class Anuncio_Auto extends Anuncio {
  constructor(_id, _titulo, _transaccion, _descripcion, _precio, _puertas, _kms, _potencia) {
      super(_id, _titulo, _transaccion, _descripcion, _precio);
      this.puertas = _puertas;
      this.kms= _kms;
      this.potencia =_potencia;

  }
}
class Vista{
  constructor(divTabla, divFiltros){
      this.divTabla = divTabla;
      this.divFiltros = divFiltros;
      this.lista = {};
      this.inicializar = true;
  }
  set Lista(lista){
      this.lista = lista;
  }
  mostrarSpin(){
      vaciarElemento(this.divTabla);
      insertarSpinner(this.divTabla);
  }

  mostrarTabla(){
      vaciarElemento(this.divTabla);
      this.inicializarVista();
      this.divTabla.appendChild(crearTabla(this, filtrarLista(filtroCalcular(filtrarFilas(this.lista)))));

  }

  inicializarVista(){
      if(this.inicializar){
          this.divFiltros.appendChild( crearFiltro(this));
          this.inicializar = false;
      }
  }
}
function vaciarElemento(elemento){
  while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
}
function insertarSpinner(elemento){
  const div = document.createElement('div');
  div.setAttribute('align', 'center')
  
  const img = document.createElement('img');
  img.className = 'spinner';/*
  img.style.width = "50px";
  img.style.height = "50px";*/
  img.setAttribute("src", "./../img/rueda.gif");
      img.setAttribute("alt", "Spinner");
  div.appendChild(img);

  elemento.appendChild(div);
}
function filtrarLista(lista){

  let retorno = [];

  retorno = lista.map(row => {
      let fila = {};
      for (const key in row) {
          if(document.getElementById("check" + key).checked){
              fila[key] = row[key];
          }else if(key == "id"){
              fila['noid'] = row[key];
              console.log(fila['noid']);
          }
      }
      return fila;        
  });
  return retorno;
}   

function filtrarFilas(lista){
  let retorno = [];
  let filtro = document.getElementById("selectfila").value;
  retorno = lista.filter(row => {
     
      if(filtro == 'Seleccione')
          return true;

      return row.transaccion == filtro;
  });
  return retorno;
}

function filtroCalcular(lista){
    let select = document.getElementById("selectfila");
    let res = document.getElementById("txtResultadoFiltro");
    let resMin = document.getElementById("txtResultadoFiltroMin");
    let resMax = document.getElementById("txtResultadoFiltroMax");
    let resPotencia = document.getElementById("txtResultadoFiltroPotencia");
       
    if(select.selectedIndex==0){
        res.value = "Precio:  N/A";
        resMin.value = " Minimo: N/A";
        resMax.value = "Maximo: N/A";
        resPotencia.value = "Potencia: N/A";

        return lista;
    }
  
  if(lista.length > 0){
  const num=  lista.map(c => Number(c.precio));
    resMin.value ="Max: " + Math.min(...num);
    resMax.value ="Min: "+ Math.max(...num);
    resPotencia.value = "Pot.: "+lista.reduce((ac, cv)=>Number(ac)+Number(cv.potencia),0)/lista.length;
     res.value = "Precio: "+ lista.reduce((ac, cv)=>Number(ac)+Number(cv.precio),0)/lista.length;
  }

  else{
    res.value = "N/A";
  }
     

  return lista;
}

export {Vista};