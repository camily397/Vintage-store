document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // 🔹 Tela de carregamento inicial
  const loader = document.createElement("div");
  loader.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      color: #0a0f2c;
      font-family: 'Poppins', sans-serif;
    ">
      <div class="spinner" style="
        width: 55px;
        height: 55px;
        border: 5px solid #ccc;
        border-top: 5px solid #0a0f2c;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      "></div>
      <p style="font-size: 18px;">Carregando seu pedido...</p>
    </div>
  `;
  container.innerHTML = "";
  container.appendChild(loader);

  // 🔸 Adiciona estilos do spinner e do fade
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
      animation: fadeIn 0.7s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // ⏳ Simula carregamento antes de mostrar conteúdo
  setTimeout(() => {
    const produto = JSON.parse(localStorage.getItem("produtoCompra"));

    if (!produto) {
      container.innerHTML = "<p style='text-align:center; font-size:18px;'>Nenhum produto selecionado.</p>";
      return;
    }

    // 💜 Conteúdo principal do checkout
    container.innerHTML = `
      <div class="fade-in">
        <h2>Finalizar Compra</h2>

        <section class="produto">
          <h3>Resumo do Pedido</h3>
          <div class="info-produto" style="
            display: flex;
            align-items: center;
            gap: 20px;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
          ">
            <img id="produto-imagem" src="${produto.image}" alt="Imagem do álbum"
              style="width: 120px; height: 120px; object-fit: cover; border-radius: 10px;">
            <div>
              <h4 style="margin: 0;">${produto.name}</h4>
              <p><strong>Quantidade:</strong> ${produto.quantity}</p>
              <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
              <p class="total" style="font-weight:bold;">Total: R$ ${(produto.price * produto.quantity).toFixed(2)}</p>
            </div>
          </div>
        </section>

        <section class="pagamento">
          <h3>Método de Pagamento</h3>
          <div class="opcoes" style="display:flex; flex-direction:column; gap:12px;">
            <label><input type="radio" name="pagamento" value="cartao" checked> 💳 Cartão de Crédito</label>
            <label><input type="radio" name="pagamento" value="pix"> ⚡ PIX</label>
            <label><input type="radio" name="pagamento" value="boleto"> 🧾 Boleto Bancário</label>
          </div>
        </section>

        <button class="confirmar" id="confirmar-compra" style="
          margin-top: 25px;
          width: 100%;
          background-color: #0a0f2c;
          color: #fff;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        ">Confirmar Compra</button>
      </div>
    `;

    // 🟢 Botão de confirmação
    document.getElementById("confirmar-compra").addEventListener("click", () => {
      alert("✅ Compra finalizada com sucesso! Obrigado por escolher a Vintage Store 💜");
      localStorage.removeItem("produtoCompra");
      window.location.href = "index.html";
    });
  }, 1500); // tempo do carregamento (1.5s)
});
