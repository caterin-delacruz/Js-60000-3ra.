import { getCartItems } from "./cart.js";

const products = [
  {
    id: 1,
    title: "Nagaraku pelo por pelo 5mm-14mm",
    price: 5000,
    image:
      "./assets/pesnaga.jpg",
  },
  {
    id: 2,
    title: "Adhesivo cherimoya 1s",
    price: 27000,
    image:
     "./assets/adhesivocheri.jpg",
  },
  {
    id: 3,
    title: "Pinza Curva",
    price: 19500,
    image:
     "./assets/pincur.jpg",
  },
  {
    id: 4,
    title: "Pinza Recta",
    price: 16200,
    image:
      "./assets/pinrec.jpg",
  },
  {
    id: 5,
    title: "Cepillitos Glitter",
    price: 2650,
    image:
     "./assets/cepilash.jpg",
  },
  {
    id: 6,
    title: "Lash Shampoo",
    price: 2500,
    image:
     "./assets/lashshampoo.jpg",
  },
  {
    id: 7,
    title: "Parches Hidrogel x1un.",
    price: 180,
    image:
     "./assets/parhidro.jpg",
  },
  {
    id: 8,
    title: "Anillos para armar abanicos",
    price: 80,
    image:
     "./assets/aniaba.jpg",
  },
  {
    id: 9,
    title: "Cinta hopoalergenica",
    price: 1500,
    image:
     "./assets/cintahipo.jpg",
  },
];

export const renderProducts = () => {
  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id);

    productCard.innerHTML = `
      <div>
        <img class="product__image" src="${product.image}" alt="${
      product.title
    }" />
      </div>
      <div>
        <h5 class="product__title">${product.title}</h5>
        <p class="product__price">$${product.price}</p>
      </div>
      <button class="product__add">Agregar</button>
    `;

    /*  Opcion 1
    productCard.addEventListener("click", () => {
      console.log("hiciste clicck");
    }); */

    productList.append(productCard);
  });
};

export const updateCartUi = () => {
    const cartContainer = document.querySelector(".cart__container");
    const cartTotalPrice = document.querySelector(".cart__totalPrice");
  
    cartContainer.innerHTML = ""; // Limpiar el carrito actual
  
    const cartItemsList = getCartItems(); // Obtener los productos en el carrito
  
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
    const total = cartItemsList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
  };