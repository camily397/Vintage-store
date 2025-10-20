// Exemplo inicial de produtos no carrinho (pode ser trocado por dados reais)
const produtos = JSON.parse(localStorage.getItem('carrinho')) || [
  { nome: "Vinil - Queen", preco: 89.90, imagem: "img/vinil-queen.jpg", quantidade: 1 },
  { nome: "CD - The Beatles", preco: 49.90, imagem: "img/cd-beatles.jpg", quantidade: 2 }
];

const lista = document.getElementById('listaProdutos');
const totalEl = document.getElementById('total');
const msgVazia = document.getElementById('mensagemVazia');
const tabela = document.getElementById('tabelaCarrinho');

function atualizarCarrinho() {
  lista.innerHTML = '';
  let total = 0;

  if (produtos.length === 0) {
    msgVazia.style.display = 'block';
    tabela.style.display = 'none';
  } else {
    msgVazia.style.display = 'none';
    tabela.style.display = 'table';

    produtos.forEach((p, i) => {
      const subtotal = p.preco * p.quantidade;
      total += subtotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="produto-info">
          <img src="${p.imagem}" alt="${p.nome}">
          <span>${p.nome}</span>
        </td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${p.quantidade}" class="quantidade-input" onchange="alterarQuantidade(${i}, this.value)">
        </td>
        <td>R$ ${(p.preco * p.quantidade).toFixed(2)}</td>
        <td><button class="remover" onclick="removerProduto(${i})">Remover</button></td>
      `;
      lista.appendChild(tr);
    });
  }

  totalEl.textContent = total.toFixed(2);
}

function alterarQuantidade(index, novaQtd) {
  produtos[index].quantidade = parseInt(novaQtd);
  localStorage.setItem('carrinho', JSON.stringify(produtos));
  atualizarCarrinho();
}

function removerProduto(index) {
  produtos.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(produtos));
  atualizarCarrinho();
}

document.getElementById('finalizarCompra').addEventListener('click', () => {
  if (produtos.length === 0) {
    alert('Seu carrinho está vazio.');
  } else {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    window.location.reload();
  }
});

atualizarCarrinho();
