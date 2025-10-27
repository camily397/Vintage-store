// Seletores
const fotoPerfil = document.getElementById("fotoPerfil");
const uploadFoto = document.getElementById("uploadFoto");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");
const salvar = document.getElementById("salvar");
const sair = document.getElementById("sair");

// 1️⃣ Mostrar preview da foto de perfil e salvar no Local Storage
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

// 2️⃣ Carregar dados do Local Storage ao abrir a página
window.addEventListener("DOMContentLoaded", () => {
  // Carrega nome e email do usuário (simula login)
  nome.value = localStorage.getItem("nomeUsuario") || nome.value;
  email.value = localStorage.getItem("emailUsuario") || email.value;

  // Carrega telefone e endereço se já houver alterações salvas
  telefone.value = localStorage.getItem("telefone") || telefone.value;
  endereco.value = localStorage.getItem("endereco") || endereco.value;

  // Carrega foto de perfil salva
  const fotoSalva = localStorage.getItem("fotoPerfil");
  if (fotoSalva) {
    fotoPerfil.src = fotoSalva;
  }
});

// 3️⃣ Salvar alterações
salvar.addEventListener("click", () => {
  localStorage.setItem("nomeUsuario", nome.value);
  localStorage.setItem("emailUsuario", email.value);
  localStorage.setItem("telefone", telefone.value);
  localStorage.setItem("endereco", endereco.value);

  alert("✅ Alterações salvas com sucesso!");
});

// 4️⃣ Confirmação antes de sair
sair.addEventListener("click", () => {
  const confirmar = confirm("Você realmente deseja sair da sua conta?");
  if (confirmar) {
    alert("Você saiu da conta.");
    window.location.href = "inicio.html"; // redireciona pro início
  }
});
