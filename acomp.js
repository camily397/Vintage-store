document.addEventListener("DOMContentLoaded", function () {
  const botao = document.getElementById("verificarBtn");
  const input = document.getElementById("numeroPedido");
  const resultado = document.getElementById("resultado");

  botao.addEventListener("click", function () {
    const numero = input.value.trim();

    if (numero === "") {
      resultado.textContent = "Por favor, digite um número de pedido.";
      resultado.style.color = "#b30000";
      return;
    }

    // Simulação de pedidos (você pode ajustar depois)
    const pedidos = {
      "12345": "✅ Pedido entregue com sucesso!",
      "67890": "🚚 Pedido em transporte.",
      "11111": "🕓 Pedido em preparação.",
      "22222": "📦 Pedido separado e pronto para envio."
    };

    if (pedidos[numero]) {
      resultado.textContent = pedidos[numero];
      resultado.style.color = "#0b1a33";
    } else {
      resultado.textContent = "Pedido não encontrado. Verifique o número digitado.";
      resultado.style.color = "#b30000";
    }
  });
});
