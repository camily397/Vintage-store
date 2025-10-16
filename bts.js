/* ======= Seleção de forma de pagamento ======= */
const buttons = document.querySelectorAll(".payment-options button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

/* ======= Controle de quantidade ======= */
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyDisplay = document.getElementById("qty");
const totalDisplay = document.getElementById("total");

let quantity = 1;
const price = 119.90; // preço unitário para Beatopia

function updateTotal() {
  totalDisplay.textContent = (price * quantity).toFixed(2).replace(".", ",");
}

minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
    updateTotal();
  }
});

plusBtn.addEventListener("click", () => {
  if (quantity < 5) {
    quantity++;
    qtyDisplay.textContent = quantity;
    updateTotal();
  }
});

/* ======= Troca da imagem principal ======= */
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});
// ======= Adicionar ao carrinho =======
const cartBtn = document.getElementById("addToCart");

cartBtn.addEventListener("click", () => {
  // muda o texto e a cor
  cartBtn.textContent = "✔️ Adicionado!";
  cartBtn.classList.add("added");

  // volta ao normal depois de 2 segundos
  setTimeout(() => {
    cartBtn.textContent = "🛒 Adicionar ao carrinho";
    cartBtn.classList.remove("added");
  }, 2000);
});

