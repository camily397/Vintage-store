// mitski.js - versão robusta (seleção pagamento, qty 1..5, total dinâmico, thumbs, comprar)

// ---- utilidades ----
function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function parsePriceText(text) {
  // tenta extrair número de uma string tipo "R$ 139,90" ou "139.90"
  if (!text) return NaN;
  const cleaned = text.replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(cleaned);
}

// ---- localiza elementos (suporta variações de markup) ----
const payButtons = document.querySelectorAll('.payment-options .pay-btn');
const pagamentoSelect = document.getElementById('pagamento'); // alternativa: select
const payButtonsFallback = document.querySelectorAll('.payment-options button'); // fallback genérico

const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
// fallback: botão dentro da .quantidade (primeiro = minus, último = plus)
const quantidadeBtns = document.querySelectorAll('.quantidade button, .quantity button, .qty-btn, .quantidade .qty-btn');

let qtyDisplay = document.getElementById('qty') || document.getElementById('qtd') || document.querySelector('.qty-value') || document.querySelector('.qty-value') || null;
if (!qtyDisplay) {
  // tenta encontrar um input dentro da .quantidade
  const qtyInput = document.querySelector('.quantidade input, .quantity input, input#qtd');
  if (qtyInput) qtyDisplay = qtyInput;
}

let totalDisplay = document.getElementById('total') || document.querySelector('.price #total') || document.querySelector('.price span') || document.querySelector('.preco');
const precoElement = document.querySelector('.preco'); // usado para parse do preço inicial se necessário

const mainImg = document.getElementById('mainImg') || document.getElementById('imagem-principal') || document.querySelector('.main-image img');
const thumbs = document.querySelectorAll('.thumb') || document.querySelectorAll('.miniaturas img') || document.querySelectorAll('.thumbs img');

const buyBtn = document.getElementById('buyBtn') || document.querySelector('.buy-btn') || document.querySelector('.comprar');

// ---- preço unitário: tenta extrair do HTML, se não, usa fallback ----
let unitPrice = NaN;
if (totalDisplay && precoElement === totalDisplay) {
  // totalDisplay is the .preco element that shows unit price in your markup
  unitPrice = parsePriceText(totalDisplay.textContent);
}
if (precoElement && isNaN(unitPrice)) {
  unitPrice = parsePriceText(precoElement.textContent);
}
// fallback default
if (isNaN(unitPrice) || unitPrice <= 0) {
  unitPrice = 139.90; // valor padrão para Mitski (ajuste se quiser)
}

// ---- quantidade inicial e limites ----
let quantity = 1;
const MIN_QTY = 1;
const MAX_QTY = 5;

// helper para escrever qtyDisplay (se for input usa .value, se for span usa textContent)
function writeQty(n) {
  if (!qtyDisplay) return;
  if (qtyDisplay.tagName && qtyDisplay.tagName.toLowerCase() === 'input') {
    qtyDisplay.value = n;
  } else {
    qtyDisplay.textContent = n;
  }
}

// atualiza o elemento que mostra o total (procura id 'total' ou atualiza .preco)
function updateTotal() {
  const total = unitPrice * quantity;
  if (document.getElementById('total')) {
    document.getElementById('total').textContent = formatBRL(total);
  } else if (totalDisplay) {
    // se totalDisplay corresponde a .preco (texto "R$ 139,90"), substitui por total
    // se você preferir manter unitário e ter um span #total separado, coloque <span id="total">...</span> no HTML
    if (totalDisplay.classList.contains('preco') || totalDisplay.classList.contains('price') || totalDisplay.matches('.preco, .price')) {
      totalDisplay.textContent = formatBRL(total);
    } else {
      totalDisplay.textContent = formatBRL(total);
    }
  }
}

// ---- seleção de forma de pagamento (compatível com botões ou select) ----
function getSelectedPaymentMethod() {
  // prioriza botões .pay-btn
  const btn = document.querySelector('.payment-options .pay-btn.selected');
  if (btn) return btn.dataset.method || btn.textContent.trim().toLowerCase();
  // se há select#pagamento
  if (pagamentoSelect) return pagamentoSelect.value;
  // fallback: botão genérico com atributo aria-pressed
  const pressed = document.querySelector('.payment-options button[aria-pressed="true"]');
  if (pressed) return pressed.dataset.method || pressed.textContent.trim().toLowerCase();
  return null;
}

// ativa handlers para payButtons (se existirem)
if (payButtons && payButtons.length) {
  payButtons.forEach(b => {
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      payButtons.forEach(x => {
        x.classList.remove('selected');
        x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('selected');
      b.setAttribute('aria-pressed', 'true');
    });
  });
} else if (payButtonsFallback && payButtonsFallback.length) {
  // fallback: make generic buttons toggle (useful if markup used generic buttons)
  payButtonsFallback.forEach(b => {
    b.addEventListener('click', () => {
      payButtonsFallback.forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    });
  });
}

// ---- handlers de quantidade ----
// se existir minusBtn / plusBtn com ids use-os; senão, tenta usar os botões encontrados na .quantidade
if (minusBtn && plusBtn) {
  minusBtn.addEventListener('click', () => {
    if (quantity > MIN_QTY) { quantity--; writeQty(quantity); updateTotal(); }
  });
  plusBtn.addEventListener('click', () => {
    if (quantity < MAX_QTY) { quantity++; writeQty(quantity); updateTotal(); }
  });
} else if (quantidadeBtns && quantidadeBtns.length >= 2) {
  // assume ordem: [minus, ..., plus] -> pega primeiro e último
  const first = quantidadeBtns[0];
  const last = quantidadeBtns[quantidadeBtns.length - 1];
  first.addEventListener('click', () => {
    if (quantity > MIN_QTY) { quantity--; writeQty(quantity); updateTotal(); }
  });
  last.addEventListener('click', () => {
    if (quantity < MAX_QTY) { quantity++; writeQty(quantity); updateTotal(); }
  });
} else {
  // se os botões estão inline no HTML com onclick chamando aumentar/diminuir,
  // definimos globalmente essas funções para que os atributos onclick funcionem:
  window.aumentar = function() {
    if (quantity < MAX_QTY) { quantity++; writeQty(quantity); updateTotal(); }
  };
  window.diminuir = function() {
    if (quantity > MIN_QTY) { quantity--; writeQty(quantity); updateTotal(); }
  };
}

// inicializa exibição qty e total
writeQty(quantity);
updateTotal();

// ---- troca de thumbs ----
(function setupThumbs() {
  const thumbList = (thumbs && thumbs.length) ? thumbs : document.querySelectorAll('.miniaturas img, .thumbs img');
  if (!thumbList || !thumbList.length) return;
  const principal = mainImg || document.getElementById('mainImg') || document.getElementById('imagem-principal');
  thumbList.forEach(t => {
    t.addEventListener('click', () => {
      if (principal) principal.src = t.src;
      // atualiza classes ativas
      thumbList.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });
})();

// ---- comprar: valida seleção e mostra resumo ----
(function setupBuy() {
  const button = buyBtn || document.querySelector('.comprar') || document.querySelector('.buy-btn');
  if (!button) return;
  button.addEventListener('click', () => {
    const method = getSelectedPaymentMethod();
    if (!method) {
      alert('Por favor, selecione um método de pagamento.');
      return;
    }
    const total = unitPrice * quantity;
    alert(
      `Compra simulada:\nÁlbum: Mitski - The Land Is Inhospitable and So Are We\nQuantidade: ${quantity}\nTotal: ${formatBRL(total)}\nMétodo: ${method}`
    );
  });
})();
