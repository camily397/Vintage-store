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
const price = 265.90; // preço unitário para Beatopia

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
// ======= Adicionar ao carrinho =======
const cartBtn = document.getElementById("addToCart");

cartBtn.addEventListener("click", () => {
  // muda o texto e a cor
  cartBtn.textContent = "✔️ Adicionado!";
  cartBtn.classList.add("added");

  // volta ao normal depois de 2 segundos
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
      id: "tyler the creator-flower boy",
      name: "Tyler the Creator - Flower Boy",
      price: 265.90,
      quantity: parseInt(qtyElement.textContent),
      image: "tyler.jfif"
    };

    // Recupera o carrinho existente ou cria um novo
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verifica se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    // Salva no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Alerta de confirmação
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
});
