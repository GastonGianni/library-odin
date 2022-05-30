const modal = document.getElementById("myModal");
const btnModal = document.getElementById("btnNew");
const btnCloseModal = document.getElementById("closeModal");
const inputTitulo = document.getElementById("inputTitulo");
const inputAutor = document.getElementById("inputAutor");
const inputPaginas = document.getElementById("inputPaginas");
const btnAgregar = document.getElementById("btnAgregarLibro");
const cardContainer = document.getElementById("cardContainer");
let code = 0;
let libreria = [];
// btnTrash.addEventListener("click", esconderLibro);
// mostrarLibro();

btnModal.addEventListener("click", () => {
  modal.classList.remove("d-none");
  resetForm();
});

btnCloseModal.addEventListener("click", () => {
  modal.classList.add("d-none");
});

function agregarLibro(libro) {
  libreria.push(libro);
  // code = code + 1;

  let card = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  card.setAttribute("id", "card");
  card.setAttribute(
    "class",
    "card col-12 mh-50 col-md-4 justify-content-between"
  );
  h1.setAttribute("id", "titulo");
  h1.textContent = `Titulo: ${inputTitulo.value}`;
  p.setAttribute("id", "autor");
  p.textContent = `Autor/a: ${inputAutor.value}`;
  p2.setAttribute("id", "paginas");
  p2.textContent = `Páginas: ${inputPaginas.value}`;
  card.dataset.code = libro.code;

  let cardBottom = document.createElement("div");
  cardBottom.setAttribute(
    "class",
    "bottom-card d-flex justify-content-between"
  );

  let cardBtn = document.createElement("button");
  cardBtn.setAttribute("id", "btnLeido");
  cardBtn.setAttribute("type", "button");
  cardBtn.setAttribute("class", "btn w-25 text-start px-0");
  cardBtn.textContent = "Leído";
  cardBtn.style = "color: green";
  cardBtn.addEventListener("click", changeStatus);
  function changeStatus() {
    libro.leido = !libro.leido;
    console.log(libro.leido);
    if (libro.leido == true) {
      cardBtn.textContent = "Leído";
      cardBtn.style = "color: green";
    } else {
      cardBtn.textContent = "No leído";
      cardBtn.style = "color: red";
    }
  }

  let cardBtnTrash = document.createElement("button");
  cardBtnTrash.setAttribute("id", "trash");
  cardBtnTrash.setAttribute("type", "button");
  cardBtnTrash.setAttribute("class", "btn w-25 text-end m-0 p-0");
  cardBtnTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';

  cardBtnTrash.dataset.code = libro.code;
  cardBottom.appendChild(cardBtn);
  cardBottom.appendChild(cardBtnTrash);
  card.appendChild(h1);
  card.appendChild(p);
  card.appendChild(p2);
  card.appendChild(cardBottom);

  cardContainer.appendChild(card);

  cardBtnTrash.addEventListener("click", () => {
    eliminarLibro(cardBtnTrash.dataset.code);
  });
}

btnAgregar.addEventListener("click", () => {
  let titulo = inputTitulo.value;
  let autor = inputAutor.value;
  let paginas = inputPaginas.value;
  let libro = new Libro(titulo, autor, paginas, true, code);
  code = code + 1;
  agregarLibro(libro);
  modal.classList.toggle("d-none");
});

function eliminarLibro(libroCode) {
  const libroEliminado = document.querySelector(`[data-code="${libroCode}"]`);

  libroEliminado.parentElement.removeChild(libroEliminado);
  libreria = libreria.filter((libro) => libro.code != libroCode);
}

function resetForm() {
  document.querySelector("form").reset();
}
function Libro(titulo, autor, paginas, leido, code) {
  this.titulo = titulo;
  this.autor = autor;
  this.paginas = paginas;
  this.leido = leido;
  this.code = code;
}
