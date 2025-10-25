document.addEventListener("DOMContentLoaded", () => {
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (!produto) {
    alert("Nenhum produto selecionado.");
    window.location.href = "index.html";
    return;
  }

  // Preencher dados do produto
  document.getElementById("productImage").src = produto.image;
  document.getElementById("productName").textContent = produto.name;
  document.getElementById("productPrice").textContent = produto.price.toFixed(2);
  document.getElementById("productQty").textContent = produto.quantity;
  document.getElementById("productTotal").textContent = (produto.price * produto.quantity).toFixed(2);

  // Finalizar compra
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    alert("Compra finalizada com sucesso! Obrigado por comprar na Vintage Store.");
    localStorage.removeItem("produtoSelecionado"); // Limpa produto selecionado
    window.location.href = "index.html";
  });
});
