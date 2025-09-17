// ======= Seleção de forma de pagamento =======
const payButtons = document.querySelectorAll(".payment-options .pay-btn");

payButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    payButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

// ======= Controle de quantidade (1 a 5) e atualização do total =======
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyDisplay = document.getElementById("qty");
const totalDisplay = document.getElementById("total");

let quantity = 1;
const unitPrice = 139.90; // preço unitário Mitski

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function updateTotal() {
  const total = unitPrice * quantity;
  totalDisplay.textContent = formatBRL(total);
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

updateTotal();

// ======= Troca da imagem principal =======
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});

// ======= Comprar =======
const buyBtn = document.getElementById("buyBtn");
buyBtn.addEventListener("click", () => {
  const selectedMethod = document.querySelector(".payment-options .pay-btn.selected");
  if (!selectedMethod) {
    alert("Por favor, selecione um método de pagamento.");
    return;
  }
  alert(`Compra simulada:\nÁlbum: Mitski - The Land Is Inhospitable and So Are We\nQuantidade: ${quantity}\nTotal: ${formatBRL(unitPrice * quantity)}\nMétodo: ${selectedMethod.dataset.method}`);
});
