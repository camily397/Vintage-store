document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");
  const productPrice = document.getElementById("productPrice");
  const btnBuy = document.querySelector(".btn-buy");

  // === Carregar informações do produto salvo ===
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
  if (produto) {
    document.getElementById("productName").textContent = produto.nome;
    document.getElementById("productFormat").textContent = produto.formato;
    document.getElementById("productPrice").textContent = produto.preco.toFixed(2).replace('.', ',');
    document.getElementById("resProduct").textContent = produto.nome;
    document.getElementById("resFormat").textContent = produto.formato;
    document.getElementById("productImg").src = produto.imagem;
    resTotal.textContent = produto.preco.toFixed(2).replace('.', ',');
  }

  // === Atualizar quantidade ===
  plusBtn.addEventListener("click", () => {
    let qty = parseInt(qtyElement.textContent);
    qty++;
    qtyElement.textContent = qty;
    resQty.textContent = qty;
    resTotal.textContent = (produto.preco * qty).toFixed(2).replace('.', ',');
  });

  minusBtn.addEventListener("click", () => {
    let qty = parseInt(qtyElement.textContent);
    if (qty > 1) qty--;
    qtyElement.textContent = qty;
    resQty.textContent = qty;
    resTotal.textContent = (produto.preco * qty).toFixed(2).replace('.', ',');
  });

  // === Alternar forma de pagamento ===
  const paymentForms = {
    PIX: document.getElementById("formPix"),
    Cartão: document.getElementById("formCartao"),
    Boleto: document.getElementById("formBoleto"),
  };

  document.getElementById("btnPix").addEventListener("click", () => showForm("PIX"));
  document.getElementById("btnCartao").addEventListener("click", () => showForm("Cartão"));
  document.getElementById("btnBoleto").addEventListener("click", () => showForm("Boleto"));

  function showForm(type) {
    for (const key in paymentForms) paymentForms[key].style.display = "none";
    paymentForms[type].style.display = "block";
  }

  // === Finalizar compra ===
  btnBuy.addEventListener("click", () => {
    alert("🎉 Obrigado pela sua compra! Seu pedido está a caminho.\nVocê receberá um e-mail com os detalhes em breve!");
    window.location.href = "index.html";
  });
});
