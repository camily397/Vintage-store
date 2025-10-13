// Manipulando os botões de quantidade
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const quantityInput = document.getElementById('quantity');

// Aumentar a quantidade
incrementButton.addEventListener('click', () => {
  let quantity = parseInt(quantityInput.value);
  quantityInput.value = quantity + 1;
});

// Diminuir a quantidade
decrementButton.addEventListener('click', () => {
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
  }
});

// Ação de compra
const purchaseButton = document.getElementById('purchaseBtn');
purchaseButton.addEventListener('click', () => {
  const quantity = quantityInput.value;
  alert(`Você comprou ${quantity} unidade(s) deste produto!`);
});
