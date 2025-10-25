// Recupera produto do localStorage
const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

const produtoDiv = document.getElementById("produtoSelecionado");
const confirmacao = document.getElementById("confirmacao");

if (produto) {
  produtoDiv.innerHTML = `
    <h3>${produto.name}</h3>
    <p>Preço: R$ ${produto.price.toFixed(2)}</p>
    <p>Quantidade: ${produto.quantity}</p>
    <p>Total: R$ ${(produto.price * produto.quantity).toFixed(2)}</p>
  `;
} else {
  produtoDiv.innerHTML = "<p>Nenhum produto selecionado.</p>";
}

// Botão de pagamento
document.getElementById("btnPagar").addEventListener("click", () => {
  const nome = document.getElementById("nomeCartao").value.trim();
  const numero = document.getElementById("numeroCartao").value.trim();
  const validade = document.getElementById("validadeCartao").value.trim();
  const cvv = document.getElementById("cvvCartao").value.trim();

  if (!nome || !numero || !validade || !cvv) {
    alert("Por favor, preencha todas as informações de pagamento.");
    return;
  }

  confirmacao.innerHTML = `<p>Pagamento realizado com sucesso! 🎉</p>`;
  localStorage.removeItem("produtoSelecionado");
});
