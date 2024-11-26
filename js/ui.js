import { getCartItems, loadCartFromLocalStorage } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage(); // Cargar el carrito desde localStorage
  fetchProducts(); // Cargar y renderizar productos
  updateCartUi(); // Actualizar la interfaz del carrito
});


const fetchProducts = () => {
  fetch('./products.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      return response.json();
    })
    .then((products) => {
      if (!Array.isArray(products)) {
        throw new Error('El formato de los datos no es válido');
      }
      renderProducts(products); // Pasamos los productos a la función render
    })
    .catch((error) => {
      console.error('Hubo un problema con la carga de productos:', error);
    });
};


export const renderProducts = (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Limpiar antes de renderizar

  const cartItems = getCartItems(); // Productos en el carrito

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id);

    const isInCart = cartItems.some((item) => item.id === product.id);

    productCard.innerHTML = `
      <div>
        <img class="product__image" src="${product.image}" alt="${product.title}" />
      </div>
      <div>
        <h5 class="product__title">${product.title}</h5>
        <p class="product__price">$${product.price}</p>
      </div>
      <button class="product__add" ${
        isInCart ? "disabled" : ""
      }>${isInCart ? "En el carrito" : "Agregar"}</button>
    `;

    productList.append(productCard);
  });
};

export const updateCartUi = () => {
  const cartContainer = document.querySelector(".cart__items");
  const cartTotalPrice = document.querySelector(".cart__totalPrice");
  const productList = document.querySelectorAll(".product__add");

  const cartItemsList = getCartItems(); // Obtener productos en el carrito

  // Limpiar la interfaz del carrito
  cartContainer.innerHTML = "";

  // Mostrar los productos en el carrito
  cartItemsList.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", item.id);

    cartItem.innerHTML = `
      <div class="cart__item-title">${item.title}</div>
      <div>${item.price}</div>
      <div>
        <span>Cantidad: ${item.quantity}</span>
        <button class="cart__increase">+</button>
        <button class="cart__decrease">-</button>
        <button class="cart__remove">Eliminar</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  // Calcular el total
  const total = cartItemsList.reduce((sum, product) => {
    const price = parseFloat(product.price.replace("$", ""));
    return sum + price * product.quantity;
  }, 0);
  cartTotalPrice.innerHTML = `Total: $${total.toFixed(2)}`;

  // Actualizar el estado de los botones "Agregar"
  productList.forEach((button) => {
    const productId = button.closest(".product").getAttribute("data-id");
    const isInCart = cartItemsList.some((item) => item.id === productId);

    button.disabled = isInCart;
    button.textContent = isInCart ? "En el carrito" : "Agregar";
  });
};

// Manejar la eliminación de un producto del carrito
document.querySelector(".cart__items").addEventListener("click", (event) => {
  if (event.target.classList.contains("cart__remove")) {
    const productId = event.target.closest(".cart__item").getAttribute("data-id");
    removeFromCart(productId); // Eliminar producto del carrito
    updateCartUi(); // Actualizar UI del carrito
  }
});

