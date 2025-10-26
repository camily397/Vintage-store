document.addEventListener("DOMContentLoaded", () => {
  /* ========= 1. CARREGAR PRODUTO DO LOCALSTORAGE ========= */
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const produtoSelecionado = JSON.parse(localStorage.getItem("produtoSelecionado")) || cart[cart.length - 1];

  // Preenche automaticamente as infos se houver produto salvo
  if (produtoSelecionado) {
    const img = document.querySelector(".product-image img");
    const nome = document.querySelector(".product-info h2");
    const preco = document.querySelector(".product-info .price");
    const resumoNome = document.querySelector(".summary-section p:nth-child(2)");
    const resumoFormato = document.querySelector(".summary-section p:nth-child(3)");
    const resQty = document.getElementById("resQty");
    const resTotal = document.getElementById("resTotal");

    if (img) img.src = produtoSelecionado.image;
    if (nome) nome.textContent = produtoSelecionado.name;
    if (preco) preco.textContent = `Preço unitário: R$ ${produtoSelecionado.price.toFixed(2).replace(".", ",")}`;
    if (resumoNome) resumoNome.textContent = `Produto: ${produtoSelecionado.name}`;
    if (resumoFormato) resumoFormato.textContent = "Formato: CD + Pôster + Vinil";
    if (resQty) resQty.textContent = produtoSelecionado.quantity;
    if (resTotal) resTotal.textContent = (produtoSelecionado.price * produtoSelecionado.quantity).toFixed(2).replace(".", ",");
  }

  /* ========= 2. CONTROLE DE QUANTIDADE ========= */
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");
  let quantity = produtoSelecionado?.quantity || 1;
  const price = produtoSelecionado?.price || 0;

  function updateQuantityDisplay() {
    qtyElement.textContent = quantity;
    resQty.textContent = quantity;
    resTotal.textContent = (quantity * price).toFixed(2).replace(".", ",");
  }

  plusBtn.addEventListener("click", () => {
    quantity++;
    updateQuantityDisplay();
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantityDisplay();
    }
  });

  /* ========= 3. MÉTODOS DE PAGAMENTO ========= */
  const btnPix = document.getElementById("btnPix");
  const btnCartao = document.getElementById("btnCartao");
  const btnBoleto = document.getElementById("btnBoleto");
  const formPix = document.getElementById("formPix");
  const formCartao = document.getElementById("formCartao");
  const formBoleto = document.getElementById("formBoleto");

  function mostrarForma(forma) {
    formPix.style.display = "none";
    formCartao.style.display = "none";
    formBoleto.style.display = "none";
    forma.style.display = "block";
  }

  btnPix.addEventListener("click", () => mostrarForma(formPix));
  btnCartao.addEventListener("click", () => mostrarForma(formCartao));
  btnBoleto.addEventListener("click", () => mostrarForma(formBoleto));

  /* ========= 4. FINALIZAR COMPRA ========= */
  const finalizarBtn = document.querySelector(".btn-buy");

  finalizarBtn.addEventListener("click", () => {
    // Mensagem de agradecimento (popup bonito)
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
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
        Um e-mail de confirmação foi enviado com os detalhes do seu pedido. 📦✉️
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

    // Animação
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      modal.style.transform = "scale(1)";
    });

    // Botão de retorno
    document.getElementById("voltarHome").addEventListener("click", () => {
      overlay.style.opacity = "0";
      modal.style.transform = "scale(0.9)";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 300);
    });
  });
});
