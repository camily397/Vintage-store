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
.cart-btn {
  background-color: #d4af37;
  color: #222;
  border: none;
  padding: 10px 18px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  background-color: #b68c2a;
  transform: scale(1.05);
}

/* Efeito de "adicionado" */
.cart-btn.added {
  background-color: #2ecc71; /* verde */
  color: #fff;
}
