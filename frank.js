/* ======= Seleção de forma de pagamento ======= */
const buttons = document.querySelectorAll(".payment-options button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

/* ======= Controle de quantidade ======= */
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyDisplay = document.getElementById("qty");
const totalDisplay = document.getElementById("total");

let quantity = 1;
const price = 119.90; // preço unitário (exemplo: Beatopia)

function updateTotal() {
  totalDisplay.textContent = (price * quantity).toFixed(2).replace(".", ",");
}

minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
    updateTotal();
  }
});

plusBtn.addEventListener("click", () => {
  if (quantity < 5) {
    quantity++;
    qtyDisplay.textContent = quantity;
    updateTotal();
  }
});

/* ======= Troca da imagem principal ======= */
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});

/* ======= Adicionar ao carrinho ======= */
const cartBtn = document.getElementById("addToCart");

cartBtn.addEventListener("click", () => {
  cartBtn.textContent = "✔️ Adicionado!";
  cartBtn.classList.add("added");

  setTimeout(() => {
    cartBtn.textContent = "🛒 Adicionar ao carrinho";
    cartBtn.classList.remove("added");
  }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  const qtyElement = document.getElementById("qty");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const buyNowBtn = document.getElementById("buyNow"); // <— botão “Comprar”

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
      id: "frank ocean-blond",
      name: "Frank Ocean - Blond",
      price: 129.90,
      quantity: parseInt(qtyElement.textContent),
      image: "frank.jfif",
      formato: "CD + Pôster + Vinil"
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

  // ======= NOVO: Salvar informações e ir para página de pagamento =======
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const product = {
        id: "bts-love-yourself",
        name: "BTS - Love Yourself",
        price: 129.90,
        quantity: parseInt(qtyElement.textContent),
        image: "bts.jfif",
        formato: "CD + Pôster + Vinil"
      };

      localStorage.setItem("produtoSelecionado", JSON.stringify(product));
      window.location.href = "teste.html"; // redireciona para a página de pagamento
    });
  }
});
