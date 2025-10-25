// Carrega produtos do localStorage (corrigido para "cart")
const orderContainer = document.getElementById("order-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total-final");
const freteEl = document.getElementById("frete");

const carrinho = JSON.parse(localStorage.getItem("cart")) || [];

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
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <h3>${item.name}</h3>
        <p>Quantidade: <strong>${item.quantity}</strong></p>
        <p>Preço unitário: R$ ${item.price.toFixed(2)}</p>
        <p><strong>Total: R$ ${(item.price * item.quantity).toFixed(2)}</strong></p>
      </div>
    `;
    orderContainer.appendChild(div);
    subtotal += item.price * item.quantity;
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

// ======== EDIÇÃO INLINE DO CLIENTE ========
document.querySelectorAll(".edit-btn").forEach(button => {
  button.addEventListener("click", () => {
    const fieldId = button.getAttribute("data-field");
    const span = document.getElementById(fieldId);

    // Cria input para editar
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.style.width = "80%";
    input.style.fontSize = "16px";
    input.style.padding = "2px 5px";

    // Substitui span pelo input
    span.replaceWith(input);
    input.focus();

    // Ao pressionar Enter ou perder foco, salva e volta ao span
    const save = () => {
      span.textContent = input.value;
      input.replaceWith(span);
    };

    input.addEventListener("blur", save);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        save();
      }
    });
  });
});
