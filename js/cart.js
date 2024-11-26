let cartItems = [];

export const createProduct = (id, title, price) => ({ id, title, price });

export const getCartItems = () => {
  return [...cartItems];
};

export const addToCart = (product, quantity) => {
  const existsInTheCart = cartItems.find((item) => item.id === product.id);

  if (existsInTheCart) {
    existsInTheCart.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  saveCartToLocalStorage(); // Guardar en localStorage

  // Libreria para mostrar notificacion cuando se agrega un producto al carrito
  Toastify({
    text: `${product.title} agregado al carrito`,
    duration: 3000, // Duración en ms (3 segundos)
    gravity: "top", // Posición (top/bottom)
    position: "right", // Posición horizontal (left/right/center)
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "#fff",
    },
    close: true, // Mostrar botón para cerrar la notificación
  }).showToast();
};


export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  saveCartToLocalStorage(); // Guardar en localStorage
};

const saveCartToLocalStorage = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = () => {
  cartItems = [];
  saveCartToLocalStorage(); // Guardar en localStorage
};

export const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  }
};