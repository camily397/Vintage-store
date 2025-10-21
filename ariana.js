const addToCart = document.getElementById("addToCart");
const qty = document.getElementById("qty");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let quantity = 1;

plus.addEventListener("click", () => {
  if (quantity < 5) { // limite de 5 produtos
    quantity++;
    qty.textContent = quantity;
  } else {
    alert("Limite máximo de 5 unidades por produto.");
  }
});

minus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qty.textContent = quantity;
  }
});

addToCart.addEventListener("click", () => {
  alert(`Adicionado ${quantity}x Ariana Grande - Positions ao carrinho!`);
});
