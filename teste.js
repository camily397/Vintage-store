document.addEventListener("DOMContentLoaded", () => {
  // ====== Carregar produto selecionado ======
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (produto) {
    document.getElementById("checkoutImage").src = produto.image;
    document.getElementById("checkoutName").textContent = produto.name;
    document.getElementById("checkoutFormat").textContent = produto.formato || "Formato padrão";
    document.getElementById("checkoutPrice").textContent = `R$ ${produto.price.toFixed(2)}`;
    document.getElementById("checkoutQty").textContent = produto.quantity || 1;
    document.getElementById("checkoutTotal").textContent = (produto.price * (produto.quantity || 1)).toFixed(2);
  } else {
    document.querySelector(".product-info").innerHTML = "<p>Nenhum produto selecionado.</p>";
  }

  // ====== Editar informações do cliente ======
  const editBtn = document.getElementById("editClient");
  const editForm = document.getElementById("editForm");
  const saveBtn = document.getElementById("saveClient");

  editBtn.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
  });

  saveBtn.addEventListener("click", () => {
    const name = document.getElementById("editName").value || "Cliente";
    const email = document.getElementById("editEmail").value || "email@exemplo.com";
    const address = document.getElementById("editAddress").value || "Endereço não informado";

    document.getElementById("clientName").textContent = name;
    document.getElementById("clientEmail").textContent = email;
    document.getElementById("clientAddress").textContent = address;

    editForm.classList.add("hidden");
  });

  // ====== Seleção de pagamento ======
  const paymentButtons = document.querySelectorAll(".payment-btn");

  paymentButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      paymentButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  // ====== Finalizar compra ======
  document.querySelector(".finalize-btn").addEventListener("click", () => {
    const selectedPayment = document.querySelector(".payment-btn.selected");

    if (!selectedPayment) {
      alert("Selecione uma forma de pagamento!");
      return;
    }

    alert(`✅ Compra finalizada com sucesso via ${selectedPayment.dataset.method.toUpperCase()}!`);
    localStorage.removeItem("produtoSelecionado");
  });
});
