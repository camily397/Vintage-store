document.getElementById('btn-acompanhar').addEventListener('click', function() {
    const pedido = document.getElementById('pedido').value.trim();
    const resultado = document.getElementById('resultado');

    if (pedido === "") {
        resultado.textContent = "Por favor, digite o número do seu pedido.";
        resultado.style.color = "red";
        return;
    }

    const statusPedidos = [
        "Pedido recebido",
        "Preparando para envio",
        "Em transporte",
        "Entregue"
    ];

    const status = statusPedidos[Math.floor(Math.random() * statusPedidos.length)];
    resultado.style.color = "#6a4c93";
    resultado.textContent = `Status do pedido ${pedido}: ${status}`;
});
