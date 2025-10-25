function verificarPedido() {
  const input = document.getElementById("pedido");
  const resultado = document.getElementById("resultado");
  const numero = input.value.trim();

  if (numero === "") {
    resultado.textContent = "Por favor, digite um número de pedido.";
    resultado.style.color = "#b30000";
    return;
  }

  // Simulação de pedidos (você pode ajustar depois)
  const pedidos = {
    "VS12345": "✅ Pedido entregue com sucesso!",
    "VS67890": "🚚 Pedido em transporte.",
    "VS11111": "🕓 Pedido em preparação.",
    "VS22222": "📦 Pedido separado e pronto para envio."
  };

  if (pedidos[numero]) {
    resultado.textContent = pedidos[numero];
    resultado.style.color = "#0b1a33";
  } else {
    resultado.textContent = "Pedido não encontrado. Verifique o número digitado.";
    resultado.style.color = "#b30000";
  }
}
