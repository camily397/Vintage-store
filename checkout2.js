// Pega parâmetros da URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name') || 'Álbum Desconhecido',
    price: parseFloat(params.get('price')) || 0,
    img: params.get('img') || ''
  };
}

// Atualiza os campos de cliente com edição inline
function enableInlineEditing() {
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
      const field = button.dataset.field;
      const span = document.getElementById(field);
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.innerText;
      input.style.padding = '4px';
      input.style.width = '70%';

      span.replaceWith(input);
      input.focus();

      input.addEventListener('blur', () => {
        span.innerText = input.value;
        input.replaceWith(span);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') input.blur();
      });
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const album = getQueryParams();

  // Renderiza item do pedido
  const orderItems = document.getElementById('order-items');
  orderItems.innerHTML = `
    <div class="order-item">
      <img src="${album.img}" alt="${album.name}" style="width:90px; height:90px; object-fit:cover; border-radius:8px; margin-right:15px;">
      <div class="details">
        <h3>${album.name}</h3>
        <p>R$ ${album.price.toFixed(2)}</p>
      </div>
    </div>
  `;

  // Atualiza subtotal e total
  const frete = parseFloat(document.getElementById('frete').innerText);
  document.getElementById('subtotal').innerText = album.price.toFixed(2);
  document.getElementById('total-final').innerText = (album.price + frete).toFixed(2);

  // Habilita edição inline
  enableInlineEditing();

  // Finalizar compra
 document.getElementById('finalizar-compra').addEventListener('click', () => {
  const cliente = {
    nome: document.getElementById('nome').innerText,
    endereco: document.getElementById('endereco').innerText,
    cep: document.getElementById('cep').innerText,
    telefone: document.getElementById('telefone').innerText,
    email: document.getElementById('email').innerText
  };

  // Redireciona para página de pagamento passando dados do álbum e opcionalmente do cliente
  const pagamentoURL = `pagamento.html?name=${encodeURIComponent(album.name)}&price=${album.price}&img=${encodeURIComponent(album.img)}&cliente=${encodeURIComponent(JSON.stringify(cliente))}`;
  window.location.href = pagamentoURL;
});

