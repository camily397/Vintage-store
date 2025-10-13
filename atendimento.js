// atendimento.js

document.addEventListener("DOMContentLoaded", function () {
  // Pega os botões
  const btnPedido = document.getElementById("btn-pedido");
  const btnTermos = document.getElementById("btn-termos");
  const btnAvaliacao = document.getElementById("btn-avaliacao");
  const btnFale = document.getElementById("btn-fale");

  // Adiciona os redirecionamentos
  btnPedido.addEventListener("click", () => {
    window.location.href = "pedido.html";
  });

  btnTermos.addEventListener("click", () => {
    window.location.href = "termos.html";
  });

  btnAvaliacao.addEventListener("click", () => {
    window.location.href = "avaliacao.html";
  });

  btnFale.addEventListener("click", () => {
    window.location.href = "fale.html";
  });
});
