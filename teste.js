document.addEventListener("DOMContentLoaded", () => {
  // === Elementos ===
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");
  const btnBuy = document.getElementById("finalizarCompra");

  const productImg = document.getElementById("productImg");
  const productName = document.getElementById("productName");
  const productFormat = document.getElementById("productFormat");
  const productPrice = document.getElementById("productPrice");
  const resProduct = document.getElementById("resProduct");
  const resFormat = document.getElementById("resFormat");

  // === Carregar produto do localStorage ===
  const produtoData = localStorage.getItem("produtoSelecionado");
  if (!produtoData) {
    alert("Nenhum produto selecionado! Redirecionando à loja.");
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

  // === Formas de pagamento ===
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

  // === Finalizar compra com pop-up ===
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
        Um e-mail de confirmação será enviado com os detalhes do seu pedido. 📦✉️
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
      setTimeout(() => {
        localStorage.removeItem("produtoSelecionado");
        window.location.href = "index.html";
      }, 300);
    });
  });
});
