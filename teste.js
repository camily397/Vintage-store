document.addEventListener("DOMContentLoaded", () => {
  // Elementos do produto
  const productImage = document.getElementById("productImage");
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const productQty = document.getElementById("productQty");
  const productTotal = document.getElementById("productTotal");

  // Resumo da compra
  const summaryName = document.getElementById("summaryName");
  const summaryQty = document.getElementById("summaryQty");
  const summaryPrice = document.getElementById("summaryPrice");
  const summarySubtotal = document.getElementById("summarySubtotal");
  const summaryFrete = document.getElementById("summaryFrete");
  const summaryTotal = document.getElementById("summaryTotal");

  // Botões de quantidade
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");

  // Pega o último produto adicionado no carrinho
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return; // Nenhum produto adicionado
  const produtoAtual = cart[cart.length - 1];

  // Preenche os dados do produto
  productImage.src = produtoAtual.image;
  productName.textContent = produtoAtual.name;
  productPrice.textContent = produtoAtual.price.toFixed(2);
  productTotal.textContent = (produtoAtual.price * produtoAtual.quantity).toFixed(2);

  // Resumo da compra
  summaryName.textContent = produtoAtual.name;
  summaryQty.textContent = produtoAtual.quantity;
  summaryPrice.textContent = produtoAtual.price.toFixed(2);
  summarySubtotal.textContent = (produtoAtual.price * produtoAtual.quantity).toFixed(2);
  summaryTotal.textContent = ((produtoAtual.price * produtoAtual.quantity) + parseFloat(summaryFrete.textContent)).toFixed(2);

  // Função para atualizar valores quando quantidade muda
  function atualizarTotais() {
    const qtd = parseInt(productQty.textContent);
    const subtotal = produtoAtual.price * qtd;
    productTotal.textContent = subtotal.toFixed(2);
    summaryQty.textContent = qtd;
    summarySubtotal.textContent = subtotal.toFixed(2);
    summaryTotal.textContent = (subtotal + parseFloat(summaryFrete.textContent)).toFixed(2);
  }

  // Incrementa quantidade
  plusBtn.addEventListener("click", () => {
    productQty.textContent = parseInt(productQty.textContent) + 1;
    atualizarTotais();
  });

  // Decrementa quantidade
  minusBtn.addEventListener("click", () => {
    let qtd = parseInt(productQty.textContent);
    if (qtd > 1) {
      productQty.textContent = qtd - 1;
      atualizarTotais();
    }
  });

  // Atualiza o total se o estado mudar (opcional para frete diferente)
  const estadoSelect = document.getElementById("customerState");
  estadoSelect.addEventListener("change", () => {
    // Aqui você pode colocar lógica de frete por estado
    // Por enquanto mantém fixo
    atualizarTotais();
  });

  // Finalizar compra
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem("cart"); // Limpa carrinho
    window.location.href = "index.html"; // Redireciona para página inicial
  });
});
