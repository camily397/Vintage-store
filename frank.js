const addToCart = document.getElementById("addToCart");
const qty = document.getElementById("qty");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let quantity = 1;

plus.addEventListener("click", () => {
  quantity++;
  qty.textContent = quantity;
});

minus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qty.textContent = quantity;
  }
});

addToCart.addEventListener("click", () => {
  alert(`Adicionado ${quantity}x Frank Ocean - Blond ao carrinho!`);
});
