// Seletores
const fotoPerfil = document.getElementById("fotoPerfil");
const uploadFoto = document.getElementById("uploadFoto");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");
const salvar = document.getElementById("salvar");
const sair = document.getElementById("sair");

// === Criar botão de remover foto dinamicamente ===
const btnRemoverFoto = document.createElement("button");
btnRemoverFoto.textContent = "🗑️ Remover foto";
btnRemoverFoto.id = "removerFoto";
btnRemoverFoto.style.display = "block";
btnRemoverFoto.style.margin = "10px auto";
btnRemoverFoto.style.padding = "8px 14px";
btnRemoverFoto.style.background = "#e63946";
btnRemoverFoto.style.color = "#fff";
btnRemoverFoto.style.border = "none";
btnRemoverFoto.style.borderRadius = "6px";
btnRemoverFoto.style.cursor = "pointer";
uploadFoto.insertAdjacentElement("afterend", btnRemoverFoto);

// === 1️⃣ Mostrar preview da foto de perfil e salvar no Local Storage ===
uploadFoto.addEventListener("change", (e) => {
  const arquivo = e.target.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function(event) {
      fotoPerfil.src = event.target.result;
      localStorage.setItem("fotoPerfil", event.target.result);
    };
    leitor.readAsDataURL(arquivo);
  }
});

// === 2️⃣ Remover foto de perfil ===
btnRemoverFoto.addEventListener("click", () => {
  fotoPerfil.src = "default-profile.png"; // volta pra imagem padrão
  localStorage.removeItem("fotoPerfil");
  uploadFoto.value = ""; // limpa o input file
  alert("📷 Foto removida!");
});

// === 3️⃣ Carregar dados do Local Storage ao abrir a página ===
window.addEventListener("DOMContentLoaded", () => {
  nome.value = localStorage.getItem("nomeUsuario") || nome.value;
  email.value = localStorage.getItem("emailUsuario") || email.value;
  telefone.value = localStorage.getItem("telefone") || telefone.value;
  endereco.value = localStorage.getItem("endereco") || endereco.value;

  const fotoSalva = localStorage.getItem("fotoPerfil");
  if (fotoSalva) {
    fotoPerfil.src = fotoSalva;
  }
});

// === 4️⃣ Salvar alterações ===
salvar.addEventListener("click", () => {
  localStorage.setItem("nomeUsuario", nome.value);
  localStorage.setItem("emailUsuario", email.value);
  localStorage.setItem("telefone", telefone.value);
  localStorage.setItem("endereco", endereco.value);

  alert("✅ Alterações salvas com sucesso!");
});

// === 5️⃣ Confirmação antes de sair ===
sair.addEventListener("click", () => {
  const confirmar = confirm("Você realmente deseja sair da sua conta?");
  if (confirmar) {
    // Limpa todas as informações salvas
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("telefone");
    localStorage.removeItem("endereco");
    localStorage.removeItem("fotoPerfil");

    alert("🚪 Você saiu da conta. Todas as informações foram apagadas.");
    window.location.href = "inicio.html"; // redireciona para o início
  }
});
