// Controle de quantidade
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyDisplay = document.getElementById("qty");
let quantity = 1;
const maxQty = 5;

minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
  }
});

plusBtn.addEventListener("click", () => {
  if (quantity < maxQty) {
    quantity++;
    qtyDisplay.textContent = quantity;
  } else {
    alert("Limite máximo de 5 unidades por produto.");
  }
});

// Função para adicionar ao carrinho sem sair da página
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
  const product = {
    name: "MITSKI - LUSH",
    price: 139.9,
    quantity: quantity,
    image: "mit.jfif"
  };

  // Pega o carrinho existente (ou cria um novo)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se o produto já está no carrinho
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    if (existing.quantity + product.quantity <= maxQty) {
      existing.quantity += product.quantity;
    } else {
      existing.quantity = maxQty;
      alert("Você atingiu o limite máximo de 5 unidades desse produto.");
    }
  } else {
    cart.push(product);
  }

  // Salva de volta no localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Efeito visual rápido de confirmação
  addToCartBtn.textContent = "✅ Adicionado!";
  addToCartBtn.classList.add("added");
  setTimeout(() => {
    addToCartBtn.textContent = "🛒 Adicionar ao carrinho";
    addToCartBtn.classList.remove("added");
  }, 1500);
});

// Troca da imagem principal ao clicar nas miniaturas
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImg.src = thumb.src;
  });
});
