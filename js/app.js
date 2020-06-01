// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "agregar carrito"
  cursos.addEventListener('click', comprarCurso);
  // Dispara cuando se presiona "borrar curso"
  carrito.addEventListener('click', eliminarCurso);
  // al vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  // al cargar la pagina mostrar localstorgae
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }

  // vaciar local storage
  vaciarLocalStorage();

  return false;
}

// elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;
  if (e.target.classList.contains('borrar-curso')) {
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
    e.target.parentElement.parentElement.remove();
  }

  eliminarCursoLocalStorage(cursoId);
}
// Funciones

// funcion que inserta el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
    // enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
  };

  insertarCarrito(infoCurso);
}

// muestra el curso en el carrito

function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
        <img src="${curso.imagen}" width=100/>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `;

  listaCarrito.appendChild(row);
  guardarCursoLocalStorage(curso);
}

// almacena cursos del carrito al local storage
function guardarCursoLocalStorage(curso) {
  let cursos = obtenerCursosLocalStorage();

  cursos.push(curso);

  localStorage.setItem('cursos', JSON.stringify(cursos));
}

// trae los cursos del localStorage
function obtenerCursosLocalStorage() {
  let cursosLS;

  if (localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }

  return cursosLS;
}

// imprime los cursos del localStorage en la lista de carrito
function leerLocalStorage() {
  let cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach((curso) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
          <img src="${curso.imagen}" width=100/>
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `;

    listaCarrito.appendChild(row);
  });
}

//  elimina el curso por id en el LS
function eliminarCursoLocalStorage(curso) {
  let cursosLS = obtenerCursosLocalStorage();

  // iteramos comparando el id del curso borrado con los de LS
  cursosLS.forEach((cursoLS, index) => {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });

  // agregamos el arreglo actual al LS
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// elimina todos los cursos del ls
function vaciarLocalStorage() {
  localStorage.clear();
}
