document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");
  const btnBuy = document.querySelector(".btn-buy");

  const productImg = document.getElementById("productImg");
  const productName = document.getElementById("productName");
  const productFormat = document.getElementById("productFormat");
  const productPrice = document.getElementById("productPrice");
  const resProduct = document.getElementById("resProduct");
  const resFormat = document.getElementById("resFormat");

  // === Carregar informações do produto salvo ===
  const produtoData = localStorage.getItem("produtoSelecionado");
  if (!produtoData) {
    alert("Nenhum produto foi selecionado. Retornando à loja.");
    window.location.href = "index.html";
    return;
  }

  const produto = JSON.parse(produtoData);

  productName.textContent = produto.nome;
  productFormat.textContent = "Formato: " + produto.formato;
  productPrice.textContent = produto.preco.toFixed(2).replace(".", ",");
  productImg.src = produto.imagem;
  resProduct.textContent = produto.nome;
  resFormat.textContent = produto.formato;
  resTotal.textContent = produto.preco.toFixed(2).replace(".", ",");

  // === Quantidade ===
  let quantidade = 1;
  function atualizarResumo() {
    resQty.textContent = quantidade;
    resTotal.textContent = (produto.preco * quantidade).toFixed(2).replace(".", ",");
  }

  plusBtn.addEventListener("click", () => {
    quantidade++;
    qtyElement.textContent = quantidade;
    atualizarResumo();
  });

  minusBtn.addEventListener("click", () => {
    if (quantidade > 1) quantidade--;
    qtyElement.textContent = quantidade;
    atualizarResumo();
  });

  // === Pagamentos ===
  const paymentForms = {
    pix: document.getElementById("formPix"),
    cartao: document.getElementById("formCartao"),
    boleto: document.getElementById("formBoleto"),
  };

  function showForm(type) {
    Object.values(paymentForms).forEach(f => f.style.display = "none");
    paymentForms[type].style.display = "block";
  }

  document.getElementById("btnPix").addEventListener("click", () => showForm("pix"));
  document.getElementById("btnCartao").addEventListener("click", () => showForm("cartao"));
  document.getElementById("btnBoleto").addEventListener("click", () => showForm("boleto"));

  // === Finalizar compra ===
  btnBuy.addEventListener("click", () => {
    alert("🎉 Obrigado pela sua compra!\nSeu pedido está a caminho.\nVocê receberá um e-mail com os detalhes em breve!");
    localStorage.removeItem("produtoSelecionado");
    window.location.href = "index.html";
  });
});
