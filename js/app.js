import { addToCart, createProduct, removeFromCart } from "./cart.js";
import { renderProducts, updateCartUi } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUi();
});

// BOTÓN Abrir y cerrar Sidebar
const cartOpenButton = document.querySelector(".cart__openButton");
const cartSidebar = document.querySelector(".cart__sidebar");
const cartCloseButton = document.querySelector(".cart__close");

cartOpenButton.addEventListener("click", () => {
  cartSidebar.classList.add("cart__sidebar--open");
});

cartCloseButton.addEventListener("click", () => {
  cartSidebar.classList.remove("cart__sidebar--open");
});

// Manejo de la adición de productos al carrito
document.getElementById("productList").addEventListener("click", (event) => {
  if (event.target.classList.contains("product__add")) {
    const card = event.target.closest(".product");
    const productTitle = card.querySelector(".product__title").innerText;
    const productPrice = card.querySelector(".product__price").innerText;
    const productId = card.getAttribute("data-id");

    const product = createProduct(productId, productTitle, productPrice);

    addToCart(product, 1);  // Agregar producto al carrito
    updateCartUi();  // Actualizar la UI
  }
});

document.querySelector(".cart__container").addEventListener("click", (event) => {
  if (event.target.classList.contains("cart__remove")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    removeFromCart(productId);  // Eliminar producto
    updateCartUi();  // Actualizar la UI
  }

  // Incrementar cantidad con el botón "+"
  if (event.target.classList.contains("cart__increase")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    const product = cartItems.find(item => item.id === productId);
    if (product) {
      // Incrementar la cantidad usando la función addToCart
      addToCart({ id: productId, title: product.title, price: product.price }, 1);  // Pasamos el id, título y precio
      updateCartUi();  // Actualizar UI
    }
  }

  // Disminuir cantidad con el botón "-"
  if (event.target.classList.contains("cart__decrease")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    const product = cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      // Disminuir la cantidad usando la función addToCart con cantidad negativa
      addToCart({ id: productId, title: product.title, price: product.price }, -1);  // Pasamos el id, título y precio
      updateCartUi();  // Actualizar UI
    }
  }
});