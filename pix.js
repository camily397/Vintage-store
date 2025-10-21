// Preenche automaticamente a data do pedido
document.getElementById("orderDate").textContent = new Date().toLocaleDateString("pt-BR");

// Copiar o código PIX
document.getElementById("copyBtn").addEventListener("click", () => {
  const code = document.getElementById("pixCode");
  code.select();
  document.execCommand("copy");
  alert("Código PIX copiado!");
});

// Confirmar pagamento (simulação)
document.getElementById("confirmBtn").addEventListener("click", () => {
  alert("✅ Pagamento confirmado com sucesso!\nSeu pedido está sendo processado.");
  window.location.href = "index.html"; // volta pra loja
});
