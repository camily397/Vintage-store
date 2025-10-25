document.addEventListener("DOMContentLoaded", () => {
  // === Seletores ===
  const productImg = document.getElementById("productImg");
  const productName = document.getElementById("productName");
  const productFormat = document.getElementById("productFormat");
  const productPrice = document.getElementById("productPrice");
  const qtyElement = document.getElementById("qty");
  const resProduct = document.getElementById("resProduct");
  const resFormat = document.getElementById("resFormat");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const btnBuy = document.getElementById("finalizarCompra");

  // === Carregar produto do localStorage ===
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
  if (!produto) {
    alert("Nenhum produto selecionado! Volte para a loja.");
    window.location.href = "index.html";
  }

  productImg.src = produto.imagem;
  productName.textContent = produto.nome;
  productFormat.textContent = "Formato: " + produto.formato;
  productPrice.textContent = produto.preco.toFixed(2).replace(".", ",");
  qtyElement.textContent = produto.quantidade;
  resProduct.textContent = produto.nome;
  resFormat.textContent = produto.formato;
  resQty.textContent = produto.quantidade;
  resTotal.textContent = (produto.preco * produto.quantidade).toFixed(2).replace(".", ",");

  // === Quantidade ===
  let quantidade = produto.quantidade;

  function atualizarResumo() {
    resQty.textContent = quantidade;
    resTotal.textContent = (produto.preco * quantidade).toFixed(2).replace(".", ",");
    qtyElement.textContent = quantidade;
  }

  plusBtn.addEventListener("click", () => {
    quantidade++;
    atualizarResumo();
  });

  minusBtn.addEventListener("click", () => {
    if (quantidade > 1) quantidade--;
    atualizarResumo();
  });

  // === Pagamento ===
  const paymentForms = {
    pix: document.getElementById("formPix"),
    cartao: document.getElementById("formCartao"),
    boleto: document.getElementById("formBoleto")
  };

  function showForm(type) {
    Object.values(paymentForms).forEach(f => f.style.display = "none");
    paymentForms[type].style.display = "block";
  }

  document.getElementById("btnPix").addEventListener("click", () => showForm("pix"));
  document.getElementById("btnCartao").addEventListener("click", () => showForm("cartao"));
  document.getElementById("btnBoleto").addEventListener("click", () => showForm("boleto"));

  // === Finalizar Compra ===
  btnBuy.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.4s ease";

    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "40px 50px";
    modal.style.borderRadius = "14px";
    modal.style.textAlign = "center";
    modal.style.boxShadow = "0 5px 25px rgba(0,0,0,0.3)";
    modal.style.maxWidth = "420px";
    modal.style.width = "90%";
    modal.style.transform = "scale(0.9)";
    modal.style.transition = "transform 0.3s ease";
    modal.innerHTML = `
      <h2 style="color:#003366; margin-bottom:15px;">🎉 Obrigado pela sua compra!</h2>
      <p style="font-size:17px; line-height:1.6; color:#333;">
        Seu pedido foi recebido com sucesso e já está a caminho!<br>
        Um e-mail de confirmação será enviado com os detalhes do pedido. 📦✉️
      </p>
      <button id="voltarHome" style="
        margin-top:25px;
        padding:12px 25px;
        background:#003366;
        color:white;
        border:none;
        border-radius:8px;
        font-size:16px;
        cursor:pointer;
        transition:0.3s;">Voltar à página inicial</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      modal.style.transform = "scale(1)";
    });

    document.getElementById("voltarHome").addEventListener("click", () => {
      overlay.style.opacity = "0";
      modal.style.transform = "scale(0.9)";
      setTimeout(() => window.location.href = "index.html", 300);
    });
  });
});
