// Carrega produtos do localStorage
const orderContainer = document.getElementById("order-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total-final");
const freteEl = document.getElementById("frete");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (carrinho.length === 0) {
  orderContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
  subtotalEl.textContent = "0,00";
  totalEl.textContent = "0,00";
} else {
  let subtotal = 0;

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="details">
        <h3>${item.nome}</h3>
        <p>CD + Vinil + Pôster</p>
        <p>Quantidade: <strong>${item.quantidade}</strong></p>
        <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
        <p><strong>Total: R$ ${(item.preco * item.quantidade).toFixed(2)}</strong></p>
      </div>
    `;
    orderContainer.appendChild(div);
    subtotal += item.preco * item.quantidade;
  });

  subtotalEl.textContent = subtotal.toFixed(2);
  const frete = 19.90;
  freteEl.textContent = frete.toFixed(2);
  totalEl.textContent = (subtotal + frete).toFixed(2);
}

// Redireciona para página de pagamento
document.getElementById("finalizar-compra").addEventListener("click", () => {
  window.location.href = "paga.html";
});
