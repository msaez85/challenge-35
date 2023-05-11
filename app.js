/*challenge 35*/

class Libro {
  constructor(titulo, genero, autor) {
    this.titulo = titulo;
    this.genero = genero;
    this.autor = autor;
    this.leido = false;
  }
}

class Biblioteca {
  constructor(propietario) {
    this.propietario = propietario;
    this.libros = [];
    this.libroActual = null;
    this.ultimoLibro = null;
    this.siguienteLibro = null;
  }

  agregarLibro(titulo, genero, autor) {
    if (this.libros.some(l => { l.titulo == titulo && l.genero == genero && l.autor == autor })) {
      alert('Este libro ya existe en su biblioteca');
      return false;
    } else {
      this.libros.push(new Libro(titulo, genero, autor));
      return true;
    }
  }

  empezarLibro(libro) {
    if (this.libroActual != null && libro.titulo == this.libroActual.titulo && libro.genero == this.libroActual.genero && libro.autor == this.libroActual.autor) {
      alert('Actualmente esta leyendo este libro');
    } else {
      this.libroActual = libro;
    }
  }

  finalizarLibro(libro) {
    if (this.libroActual != null && libro.titulo == this.libroActual.titulo && libro.genero == this.libroActual.genero && libro.autor == this.libroActual.autor) {
      this.ultimoLibro = libro;
      this.libroActual = null;
      this.libros.map(l => {
        if (l.titulo == libro.titulo && l.genero == libro.genero && l.autor == libro.autor) {
          l.leido = true;
        }
      });
    } else {
      alert('No puede finalizar un libro que no esta leyendo actualmente');
    }
  }

  proximoLibro(libro) {
    if (this.libroActual != null && libro.titulo == this.libroActual.titulo && libro.genero == this.libroActual.genero && libro.autor == this.libroActual.autor) {
      alert('Actualmente esta leyendo este libro');
    } else {
      this.siguienteLibro = libro;
    }
  }
}


let newBiblioteca = new Biblioteca('John Doe');
newBiblioteca.agregarLibro('The Hobbit', 'Fantasy', 'J.R.R. Tolkien');
newBiblioteca.agregarLibro('Warbreaker', 'Fantasy', 'Brandon Sanderson');
newBiblioteca.agregarLibro('Sword of Destiny', 'Fantasy', 'Andrzej Sapkowki');
newBiblioteca.agregarLibro('American Gods', 'Fantasy', 'Neil Gaiman');


const labelNombre = document.getElementById('nombre');
const labelAutor = document.getElementById('autor');
const labelGenero = document.getElementById('genero');


const ddComenzar = document.getElementById('librosNoLeidos');
const ddFinalizar = document.getElementById('finalizarLibro');
const ddProximo = document.getElementById('proximoLibro');

const miTablaEstado = document.getElementById("mi-estado");

newBiblioteca.libros.forEach(l => {
  const optionComenzar = document.createElement('option');
  optionComenzar.text = l.titulo + ', ' + l.genero + ', ' + l.autor;
  ddComenzar.add(optionComenzar);
  const optionProximo = document.createElement('option');
  optionProximo.text = l.titulo + ', ' + l.genero + ', ' + l.autor;
  ddProximo.add(optionProximo);
});

const optionfinalizar = document.createElement('option');
optionfinalizar.text = 'ningún libro para finalizar';
ddFinalizar.add(optionfinalizar);


function limpiarListaLibros() {
  let numComenzar = ddComenzar.length;
  let numFinalizar = ddFinalizar.length;
  let numProximo = ddProximo.length;

  for (var i = numComenzar - 1; i >= 0; i--) {
    ddComenzar.remove(i);
  }
  for (var i = numFinalizar - 1; i >= 0; i--) {
    ddFinalizar.remove(i);
  }
  for (var i = numProximo - 1; i >= 0; i--) {
    ddProximo.remove(i);
  }

}

function actualizacionListaLibros() {
  limpiarListaLibros();
  newBiblioteca.libros.forEach(l => {
    if (newBiblioteca.libroActual == null) {
      optionfinalizar.text = 'ningún libro para finalizar';
      ddFinalizar.add(optionfinalizar);
    }
    if (newBiblioteca.libroActual != null && l.titulo == newBiblioteca.libroActual.titulo && l.genero == newBiblioteca.libroActual.genero && l.autor == newBiblioteca.libroActual.autor) {
      const optionfinalizar = document.createElement('option');
      optionfinalizar.text = l.titulo + ', ' + l.genero + ', ' + l.autor;
      ddFinalizar.add(optionfinalizar);
    } else {
      const optionComenzar = document.createElement('option');
      optionComenzar.text = l.titulo + ', ' + l.genero + ', ' + l.autor;
      ddComenzar.add(optionComenzar);
      const optionProximo = document.createElement('option');
      optionProximo.text = l.titulo + ', ' + l.genero + ', ' + l.autor;
      ddProximo.add(optionProximo);
    }
  }
  )
}

function agregarNuevoLibro() {
  if (newBiblioteca.agregarLibro(labelNombre.value,  labelGenero.value, labelAutor.value)) {
    document.getElementById('form-libro').reset();
    alert("Libro agregado exitosamente");
    actualizacionListaLibros();
  }
}

function comenzarNuevoLibro() {
  const values = ddComenzar.value.split(', ');
  const refLibro = new Libro(values[0], values[1], values[2]);
  newBiblioteca.empezarLibro(refLibro);
  actualizacionListaLibros();
}

function finalizarActualLibro() {
  const values = ddFinalizar.value.split(', ');
  const refLibro = new Libro(values[0], values[1], values[2]);
  console.log(refLibro.genero + '-' + refLibro.autor + '-' + refLibro.titulo);
  newBiblioteca.finalizarLibro(refLibro);
  actualizacionListaLibros();
}

function proximoNuevoLibro() {
  const values = ddProximo.value.split(', ');
  const refLibro = new Libro(values[0], values[1], values[2]);
  newBiblioteca.proximoLibro(refLibro);
  actualizacionListaLibros();
}

function limpiarTablaLibros() {
  const filas = document.querySelectorAll('.lineaEstado');
  filas.forEach(fila => { fila.remove(); });
}


function mostarEstadoBiblioteca() {
  limpiarTablaLibros();
  for (let i = 0; i < newBiblioteca.libros.length; i++) {
    const linea = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("td");
      let cellText = document.createTextNode('');
      switch (j) {
        case 0:
          cellText = document.createTextNode(newBiblioteca.libros[i].titulo);
          break;
        case 1:
          cellText = document.createTextNode(newBiblioteca.libros[i].autor);
          break;
        case 2:
          cellText = document.createTextNode(newBiblioteca.libros[i].genero);
          break;
        case 3:
          if (newBiblioteca.libros[i].leido) {
            cellText = document.createTextNode('Si');
          } else {
            cellText = document.createTextNode('No');
          }
          break;
        case 4:
          if (newBiblioteca.libroActual != null && newBiblioteca.libros[i].titulo == newBiblioteca.libroActual.titulo && newBiblioteca.libros[i].genero == newBiblioteca.libroActual.genero && newBiblioteca.libros[i].autor == newBiblioteca.libroActual.autor) {
            cellText = document.createTextNode('Si');
          } else {
            cellText = document.createTextNode('No');
          }
          break;
        case 5:
          if (newBiblioteca.siguienteLibro != null && newBiblioteca.libros[i].titulo == newBiblioteca.siguienteLibro.titulo && newBiblioteca.libros[i].genero == newBiblioteca.siguienteLibro.genero && newBiblioteca.libros[i].autor == newBiblioteca.siguienteLibro.autor) {
            cellText = document.createTextNode('Si');
          } else {
            cellText = document.createTextNode('No');
          }
          break;
      }
      linea.classList.add('lineaEstado');
      cell.appendChild(cellText);
      linea.appendChild(cell);
    }
    miTablaEstado.appendChild(linea);
  }
}
