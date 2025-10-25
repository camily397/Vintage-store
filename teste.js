document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const qtyElement = document.getElementById("qty");
  const resQty = document.getElementById("resQty");
  const resTotal = document.getElementById("resTotal");

  // Quantidade
  plusBtn.addEventListener("click", () => {
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
    resQty.textContent = qtyElement.textContent;
    resTotal.textContent = (139.90 * qtyElement.textContent).toFixed(2);
  });

  minusBtn.addEventListener("click", () => {
    let current = parseInt(qtyElement.textContent);
    if (current > 1) {
      qtyElement.textContent = current - 1;
      resQty.textContent = qtyElement.textContent;
      resTotal.textContent = (139.90 * qtyElement.textContent).toFixed(2);
    }
  });

  // Mostrar forma de pagamento
  const btnPix = document.getElementById("btnPix");
  const btnCartao = document.getElementById("btnCartao");
  const btnBoleto = document.getElementById("btnBoleto");
  const formPix = document.getElementById("formPix");
  const formCartao = document.getElementById("formCartao");
  const formBoleto = document.getElementById("formBoleto");

  btnPix.addEventListener("click", () => {
    formPix.style.display = "block";
    formCartao.style.display = "none";
    formBoleto.style.display = "none";
  });

  btnCartao.addEventListener("click", () => {
    formPix.style.display = "none";
    formCartao.style.display = "block";
    formBoleto.style.display = "none";
  });

  btnBoleto.addEventListener("click", () => {
    formPix.style.display = "none";
    formCartao.style.display = "none";
    formBoleto.style.display = "block";
  });
});
