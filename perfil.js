const editarBtn = document.getElementById("editar-btn");
const salvarBtn = document.getElementById("salvar-btn");
const infoView = document.getElementById("info-view");
const infoEdit = document.getElementById("info-edit");

// elementos de texto
const dataSpan = document.getElementById("data");
const generoSpan = document.getElementById("genero");
const emailSpan = document.getElementById("email");
const estadoSpan = document.getElementById("estado");
const bioSpan = document.getElementById("bio");

// campos editáveis
const dataInput = document.getElementById("edit-data");
const generoInput = document.getElementById("edit-genero");
const emailInput = document.getElementById("edit-email");
const estadoInput = document.getElementById("edit-estado");
const bioInput = document.getElementById("edit-bio");

editarBtn.addEventListener("click", () => {
  infoView.classList.add("hidden");
  infoEdit.classList.remove("hidden");
  editarBtn.classList.add("hidden");
  salvarBtn.classList.remove("hidden");
});

salvarBtn.addEventListener("click", () => {
  dataSpan.textContent = dataInput.value;
  generoSpan.textContent = generoInput.value;
  emailSpan.textContent = emailInput.value;
  estadoSpan.textContent = estadoInput.value;
  bioSpan.textContent = bioInput.value;

  infoView.classList.remove("hidden");
  infoEdit.classList.add("hidden");
  editarBtn.classList.remove("hidden");
  salvarBtn.classList.add("hidden");

  alert("Perfil atualizado com sucesso! 💙");
});
