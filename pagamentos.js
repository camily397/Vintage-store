document.addEventListener("DOMContentLoaded", () => {
  const produtoDiv = document.getElementById("produto");
  const totalSpan = document.getElementById("total");
  const confirmarBtn = document.getElementById("confirmar");
  const gerarPixBtn = document.getElementById("gerarPix");
  const pixArea = document.getElementById("pixArea");
  const gerarBoletoBtn = document.getElementById("gerarBoleto");

  // Recupera informações do produto da compra direta
  const produto = JSON.parse(localStorage.getItem("produtoCompra"));

  if (!produto) {
    produtoDiv.innerHTML = "<p>Não há nenhum álbum selecionado para compra.</p>";
    totalSpan.textContent = "0,00";
  } else {
    produtoDiv.innerHTML = `
      <div class="produto-item">
        <img src="${produto.image}" alt="${produto.name}">
        <div>
          <p><strong>${produto.name}</strong></p>
          <p>Quantidade: ${produto.quantity}</p>
          <p>Preço unitário: R$ ${produto.price.toFixed(2)}</p>
          <p>Subtotal: R$ ${(produto.price * produto.quantity).toFixed(2)}</p>
        </div>
      </div>
    `;
    totalSpan.textContent = (produto.price * produto.quantity).toFixed(2);
  }

  // PIX — mostrar QR Code
  gerarPixBtn.addEventListener("click", () => {
    pixArea.style.display = "block";
  });

  // Boleto — mensagem de simulação
  gerarBoletoBtn.addEventListener("click", () => {
    alert("🧾 Boleto gerado com sucesso! Validade de 2 dias úteis.");
  });

  // Confirmar pagamento
  confirmarBtn.addEventListener("click", () => {
    if (!produto) {
      alert("Nenhum álbum selecionado para compra.");
      return;
    }

    alert(`✅ Pagamento confirmado!\n\nÁlbum: ${produto.name}\nValor: R$ ${(produto.price * produto.quantity).toFixed(2)}\n\nObrigado por comprar na Vintage Store 💜`);
    localStorage.removeItem("produtoCompra");
    window.location.href = "index.html";
  });
});
