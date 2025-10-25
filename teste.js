document.addEventListener("DOMContentLoaded", () => {
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (!produto) {
    alert("Nenhum produto selecionado.");
    window.location.href = "index.html";
    return;
  }

  // Preencher dados do produto
  document.getElementById("productImage").src = produto.image;
  document.getElementById("productName").textContent = produto.name;
  document.getElementById("productPrice").textContent = produto.price.toFixed(2);
  document.getElementById("productQty").textContent = produto.quantity;
  document.getElementById("productTotal").textContent = (produto.price * produto.quantity).toFixed(2);

  // Edição das informações do cliente
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      const fieldId = button.getAttribute("data-field");
      const span = document.getElementById(fieldId);

      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.style.width = "80%";
      input.style.fontSize = "16px";
      input.style.padding = "2px 5px";

      span.replaceWith(input);
      input.focus();

      const save = () => {
        span.textContent = input.value;
        input.replaceWith(span);
      };

      input.addEventListener("blur", save);
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") save();
      });
    });
  });

  // Finalizar compra
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    alert("Compra finalizada com sucesso!\nObrigado por comprar na Vintage Store.");
    localStorage.removeItem("produtoSelecionado");
    window.location.href = "index.html";
  });
});
