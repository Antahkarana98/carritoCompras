const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    // cuando agregar un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado); 
    }
}

// lee el contenido del html 

function leerDatosCurso(curso){

    // crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Agregar elementos al carrito

    agregarElementosCarrito(infoCurso);
    
    console.log(articulosCarrito);

    carritoHTML();
}


function agregarElementosCarrito(cursoSeleccionado){
    articulosCarrito = [...articulosCarrito, cursoSeleccionado]
}

// Muestra el carrito de compras en el html

function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    // recorre el carrito y genera el html

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;  

        // agrega el html del carrito en el tdbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody o los limpia
function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // se recomienda limpiar mejor de esta manera programacion funcional

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}git 