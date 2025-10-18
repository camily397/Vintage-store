// Lista de produtos do carrinho (exemplo)
let cart = [
  { id: 1, nome: "Vinil Clássico", preco: 120.00, quantidade: 1, imagem: "https://via.placeholder.com/60" },
  { id: 2, nome: "CD Retro", preco: 45.50, quantidade: 2, imagem: "https://via.placeholder.com/60" }
];

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Função para atualizar tabela
function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><img src="${item.imagem}" alt="${item.nome}"> ${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantidade}" onchange="updateQuantity(${item.id}, this.value)">
      </td>
      <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeItem(${item.id})">Remover</button></td>
    `;
    cartItems.appendChild(row);
  });

  updateTotal();
}

// Atualiza quantidade
function updateQuantity(id, qty) {
  const item = cart.find(p => p.id === id);
  if(item){
    item.quantidade = parseInt(qty);
    renderCart();
  }
}

// Remove item do carrinho
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  renderCart();
}

// Calcula total
function updateTotal() {
  const total = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar compra
document.getElementById('btnFinalizar').addEventListener('click', () => {
  if(cart.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada! Obrigado pelo pedido. 😊");
  cart = [];
  renderCart();
});

// Inicializa carrinho
renderCart();
