document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  const qtyElement = document.getElementById("qty");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const buyBtn = document.querySelector(".buy-btn");
  const paymentButtons = document.querySelectorAll(".payment-options button");
  const totalDisplay = document.getElementById("total");

  let selectedMethod = null;
  let quantity = 1;
  const unitPrice = 119.9;

  // Atualiza a quantidade
  plusBtn.addEventListener("click", () => {
    if (quantity < 5) {
      quantity++;
      qtyElement.textContent = quantity;
      updateTotal();
    }
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyElement.textContent = quantity;
      updateTotal();
    }
  });

  function updateTotal() {
    const total = (unitPrice * quantity).toFixed(2).replace(".", ",");
    totalDisplay.textContent = total;
  }

  // Seleciona método de pagamento
  paymentButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      paymentButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedMethod = btn.textContent.trim().toLowerCase();
    });
  });

  // Adiciona produto ao carrinho
  addToCartBtn.addEventListener("click", () => {
    const product = {
      id: "beabadoobee-beatopia",
      name: "Beabadoobee - Beatopia",
      price: unitPrice,
      quantity,
      image: "bea.jfif"
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

  // Função para redirecionar para o pagamento PIX
  buyBtn.addEventListener("click", () => {
    if (!selectedMethod) {
      alert("Por favor, selecione um método de pagamento.");
      return;
    }

    const albumInfo = {
      name: "Beabadoobee - Beatopia",
      total: (unitPrice * quantity).toFixed(2),
      quantity,
      image: "bea.jfif"
    };

    if (selectedMethod === "pix") {
      sessionStorage.setItem("pixPayment", JSON.stringify(albumInfo));
      window.location.href = "pix.html";
    } else {
      alert(
        `Compra simulada:\nÁlbum: ${albumInfo.name}\nQuantidade: ${albumInfo.quantity}\nTotal: R$ ${albumInfo.total.replace(".", ",")}\nMétodo: ${selectedMethod.toUpperCase()}`
      );
    }
  });

  updateTotal();
});
