document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  const qtyElement = document.getElementById("qty");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");

  // Atualiza quantidade
  plusBtn.addEventListener("click", () => {
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
  });

  minusBtn.addEventListener("click", () => {
    const current = parseInt(qtyElement.textContent);
    if (current > 1) qtyElement.textContent = current - 1;
  });

 document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  const qtyElement = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  // controle de quantidade
  increaseBtn.addEventListener("click", () => {
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
  });

  decreaseBtn.addEventListener("click", () => {
    let currentQty = parseInt(qtyElement.textContent);
    if (currentQty > 1) {
      qtyElement.textContent = currentQty - 1;
    }
  });

  // adicionar ao carrinho
  addToCartBtn.addEventListener("click", () => {
    const product = {
      id: "beabadoobee-beatopia",
      name: "Beabadoobee - Beatopia",
      price: 139.9,
      quantity: parseInt(qtyElement.textContent),
      image: "beatopia.jpg" // troque pelo caminho da sua imagem
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // alerta visual
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

    // efeito visual no botão
    addToCartBtn.classList.add("added");
    setTimeout(() => addToCartBtn.classList.remove("added"), 1500);
  });
});

// Botão de comprar → redireciona para a página de pagamento
const buyBtn = document.querySelector(".buy-btn");

if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    const product = {
      name: "Beabadoobee - Beatopia", // 🩷 coloque o nome do álbum aqui
      price: 119.9,                   // 💰 coloque o preço do álbum aqui
      quantity: parseInt(document.getElementById("qty")?.textContent || 1),
      image: "bea.jfif"               // 🖼️ coloque o nome da imagem principal do álbum
    };

    // Salva as informações do produto no localStorage
    localStorage.setItem("produtoCompra", JSON.stringify(product));

    // Redireciona para a página de pagamento
    window.location.href = "pagamentos.html";
  });
}
