import Anuncio_Auto from "./class.js"



function cargar(vista, dato){
    const xhr = new XMLHttpRequest();
    delete dato.id;
    vista.mostrarSpin();
    xhr.addEventListener( 'readystatechange', () => {

        if ( xhr.readyState == 4 ) {

            if ( xhr.status >= 200 && xhr.status < 300 ) {

                let data = JSON.parse(xhr.responseText);
                listar(vista);
        
            } else { 

                let msg = xhr.statusText || 'Se produjo un error';

                console.warn( `Error: ${ xhr.status } - ${ msg }` );
            }
        }
    });
    xhr.open( 'POST', 'http://localhost:3000/anuncio_auto' );
    xhr.setRequestHeader( 'Content-type', 'application/json;charset=utf-8' );

    xhr.send( JSON.stringify(dato));
}

function modificar(vista, dato){
    let id = dato.id;
    delete dato.id;
    vista.mostrarSpin();

    fetch("http://localhost:3000/anuncio_auto/"+id, {
        method:"PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
    })
    .then((res)=>{
        return res.ok? res.text():Promise.reject(res);
    })
    .then((text)=>{
        listar(vista);
    })
    .catch((err)=>{
        console.error('Error al leer los datos');
    })
    .finally(()=>{
    })
 
 }


async function borrar(vista, id){
    vista.mostrarSpin();
    try {
        const res = await fetch("http://localhost:3000/anuncio_auto/"+id, {
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!res.ok){
              
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }
        const data = await res.json();
        listar(vista);
        
    } catch (err) {
        console.log(`Error ${err.status} ${err.statusText}`);
        
    }
 
 }

 async function listar(vista){
   
    vista.mostrarSpin();
	
	  try {
        const res = await fetch("http://localhost:3000/anuncio_auto", {
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!res.ok){
              
            let msgError = res.statusText || 'Se produjo un error listando datos';
            throw { status: res.status, statusText: msgError };
        }
        const data = await res.json();
         let anuncios = data.map((item)=>{
                    return new Anuncio_Auto(item.id, item.titulo, item.transaccion, item.descripcion, item.precio, item.puertas, item.kms, item.potencia);
                })
                vista.Lista = anuncios;
                vista.mostrarTabla();
        
    } catch (err) {
        console.log(`Error ${err.status} ${err.statusText}`);
        
    }


}

export {listar, cargar, modificar, borrar}