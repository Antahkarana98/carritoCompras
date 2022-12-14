
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    // cuando agregar un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // cuando queremos remover un curso del carrito

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
      articulosCarrito = JSON.parse (localStorage.getItem('carrito')) || [];

      carritoHTML();
    });

    //vaciar carrito de compras
    // hay dos opciones cuando es poco codigo se puede utilizar una funcion anonima y si es mas se puede usar una funcion normal
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    } );

}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(event){
  if(event.target.classList.contains('borrar-curso')){
    const cursoId = event.target.getAttribute('data-id');
    articulosCarrito.forEach(curso => {
      if(curso.id === cursoId){
       // si la cantidad es mayor a 1 entonces cantidad--
        if(curso.cantidad > 1){
          // actualizamos la cantidad
          curso.cantidad--;
          // mostramos de nuevo el html
          carritoHTML();
        }else{
           // recorremos con filter
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
          // volvemos a cargar el html
          carritoHTML();
        }
      }
    });

  }
}

function limpiarCarrito(e){
    articulosCarrito = [];

    limpiarHTML();
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
    //verifica si el elemento ya existe en el carrito

    const productoExistente = articulosCarrito.some(curso => curso.id === cursoSeleccionado.id);
    if(productoExistente){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === cursoSeleccionado.id) {
                curso.cantidad++;
                return curso; //retorna el curso actualizado
            } else{
                return curso; //retorna los cursos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else{
        //Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, cursoSeleccionado];
    }
}

// Muestra el carrito de compras en el html

function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    // recorre el carrito y genera el html

    articulosCarrito.forEach( curso => {
        //
        // traversing sobre los objetos la otra la manera sin taversing es curso.imagen etc
        const {titulo, precio, imagen, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // agrega el html del carrito en el tdbody
        contenedorCarrito.appendChild(row);
    })
    sincronizarStorage();
}


function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Elimina los cursos del tbody o los limpia
function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // se recomienda limpiar mejor de esta manera programacion funcional

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
