function verificarPedido() {
  const numero = document.getElementById("pedido").value.trim();
  const resultado = document.getElementById("resultado");

  if (numero === "") {
    resultado.textContent = "Por favor, digite o número do pedido.";
    resultado.style.color = "red";
    return;
  }

  // Simulação de acompanhamento (você pode trocar pelos seus dados reais depois)
  const pedidos = {
    VS12345: "Pedido sendo preparado.",
    VS98765: "Pedido enviado — em transporte!",
    VS00001: "Pedido entregue com sucesso!.",
  };

  if (pedidos[numero]) {
    resultado.textContent = `Status do pedido: ${pedidos[numero]}`;
    resultado.style.color = "green";
  } else {
    resultado.textContent = "Número de pedido não encontrado.";
    resultado.style.color = "red";
  }
}
