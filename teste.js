document.addEventListener("DOMContentLoaded", () => {
  // ======== ELEMENTOS ========
  const paymentButtons = document.querySelectorAll(".payment-method button");
  const sections = document.querySelectorAll(".payment-section");
  const finalizarBtn = document.getElementById("finalizarCompra");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");

  // ======== QUANTIDADE ========
  plusBtn?.addEventListener("click", () => {
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
  });

  minusBtn?.addEventListener("click", () => {
    const current = parseInt(qtyElement.textContent);
    if (current > 1) qtyElement.textContent = current - 1;
  });

  // ======== MÉTODOS DE PAGAMENTO ========
  paymentButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // destacar botão selecionado
      paymentButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const metodo = btn.getAttribute("data-method");
      sections.forEach(sec => {
        sec.style.display = sec.id === metodo ? "block" : "none";
      });
    });
  });

  // ======== FINALIZAR COMPRA ========
  finalizarBtn?.addEventListener("click", () => {
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

    // fade-in
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      modal.style.transform = "scale(1)";
    });

    // botão voltar
    document.getElementById("voltarHome").addEventListener("click", () => {
      overlay.style.opacity = "0";
      modal.style.transform = "scale(0.9)";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 300);
    });
  });
});
