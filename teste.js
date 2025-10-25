document.addEventListener("DOMContentLoaded", () => {
  const productImage = document.getElementById("productImage");
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const productQty = document.getElementById("productQty");
  const productTotal = document.getElementById("productTotal");

  const summaryName = document.getElementById("summaryName");
  const summaryQty = document.getElementById("summaryQty");
  const summaryPrice = document.getElementById("summaryPrice");
  const summarySubtotal = document.getElementById("summarySubtotal");
  const summaryTotal = document.getElementById("summaryTotal");

  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");

  // Carrega produto do localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart[cart.length -1]; // Último produto adicionado

  if (product) {
    productImage.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = product.price.toFixed(2);
    productQty.textContent = product.quantity;
    productTotal.textContent = (product.price * product.quantity).toFixed(2);

    summaryName.textContent = product.name;
    summaryQty.textContent = product.quantity;
    summaryPrice.textContent = product.price.toFixed(2);
    summarySubtotal.textContent = (product.price * product.quantity).toFixed(2);
    summaryTotal.textContent = (product.price * product.quantity + 19.9).toFixed(2);
  }

  // Atualiza quantidade
  plusBtn.addEventListener("click", () => {
    productQty.textContent = parseInt(productQty.textContent) + 1;
    updateTotals();
  });

  minusBtn.addEventListener("click", () => {
    const current = parseInt(productQty.textContent);
    if (current > 1) {
      productQty.textContent = current - 1;
      updateTotals();
    }
  });

  function updateTotals() {
    const qty = parseInt(productQty.textContent);
    const total = (product.price * qty);
    productTotal.textContent = total.toFixed(2);
    summaryQty.textContent = qty;
    summarySubtotal.textContent = total.toFixed(2);
    summaryTotal.textContent = (total + 19.9).toFixed(2);
  }

  // Finalizar compra (alert apenas)
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    alert("Compra finalizada! Obrigado!");
  });
});
