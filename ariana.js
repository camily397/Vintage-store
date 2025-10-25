document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  const qtyElement = document.getElementById("qty");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const buyBtn = document.querySelector(".buy-btn"); // Novo botão comprar

  // Atualiza quantidade
  plusBtn.addEventListener("click", () => {
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
  });

  minusBtn.addEventListener("click", () => {
    const current = parseInt(qtyElement.textContent);
    if (current > 1) qtyElement.textContent = current - 1;
  });

  // Adicionar produto ao carrinho
  addToCartBtn.addEventListener("click", () => {
    const product = {
      id: "ariana-grande-positions",
      name: "Ariana Grande - Positions",
      price: 139.9,
      quantity: parseInt(qtyElement.textContent),
      image: "ariana.jfif"
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const alertBox = document.createElement("div");
    alertBox.textContent = "✅ Produto adicionado ao carrinho!";
    alertBox.style.position = "fixed";
    alertBox.style.bottom = "30px";
    alertBox.style.right = "30px";
    alertBox.style.background = "#3B5D4F";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "12px 20px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.fontSize = "16px";
    alertBox.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    alertBox.style.zIndex = "9999";
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.remove(), 2000);
  });
