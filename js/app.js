const shopContent = document.getElementById ("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});

// Función asincrónica para cargar el formulario y productos
async function cargarInformacion() {
  // Cargar productos
  await cargarProductos();

  function obtenerProductos() {
    fetch(URL)
      .then(response => response.json())
      .then(json => console.log(json))
  }

  // Lógica del formulario
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", validarFormulario);

  async function validarFormulario(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const consulta = document.querySelector("#consulta").value;

    console.log("Correo electrónico:", email);
    console.log("Consulta:", consulta);

    // Mostrar mensaje de éxito de forma asíncrona
    await mostrarMensajeExito();

    resetForm();
  }

  function resetForm() {
    formulario.reset();
  }

  function mostrarMensajeExito() {
    return new Promise((resolve) => {
      // Simulamos una operación asíncrona utilizando setTimeout
      setTimeout(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estaremos en contacto',
          showConfirmButton: true,
          timer: 5000
        });

        // Resolvemos la promesa después de 5 segundos
        resolve();
      }, 5000);
    });
  }
}

// Llamar a la función asincrónica para cargar la información al inicio
cargarInformacion();

//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item
let servicios = [];
fetch("./js/servicios.json")
     .then(response => response.json())
      .then(data => {
      servicios = data;
      cargarServicios(servicios);
      })