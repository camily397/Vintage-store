// elementos
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

const inputs = {
  name: document.getElementById('in-name'),
  dob: document.getElementById('in-dob'),
  email: document.getElementById('in-email'),
  phone: document.getElementById('in-phone'),
  username: document.getElementById('in-username')
};

const avatar = document.getElementById('avatar');
const fileInput = document.getElementById('fileInput');
const changePhotoBtn = document.getElementById('change-photo');

// salvar estado original para cancelar
let original = {};
function snapshot(){
  original = {
    name: inputs.name.value,
    dob: inputs.dob.value,
    email: inputs.email.value,
    phone: inputs.phone.value,
    username: inputs.username.value
  };
}
snapshot();

// alterna para modo edição
function enterEditMode(){
  for(const k in inputs){
    inputs[k].readOnly = false;
    inputs[k].classList.add('editing');
  }
  editBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
  cancelBtn.classList.remove('hidden');
  // habilitar ações (se existirem)
}

// salvar dados
function saveChanges(){
  for(const k in inputs) inputs[k].readOnly = true;
  snapshot();
  editBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
  cancelBtn.classList.add('hidden');
  alert('perfil atualizado com sucesso 💙');
}

// cancelar edição
function cancelEdit(){
  // restaurar valores
  inputs.name.value = original.name;
  inputs.dob.value = original.dob;
  inputs.email.value = original.email;
  inputs.phone.value = original.phone;
  inputs.username.value = original.username;

  for(const k in inputs) inputs[k].readOnly = true;
  editBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
  cancelBtn.classList.add('hidden');
}

// troca de foto: abre o file input
changePhotoBtn && changePhotoBtn.addEventListener('click', () => {
  fileInput.click();
});

// quando o usuário seleciona imagem, mostra as iniciais ou thumb
fileInput.addEventListener('change', (e) => {
  const f = e.target.files?.[0];
  if(!f) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    // transforma a avatar box num background
    avatar.style.background = url(${ev.target.result}) center/cover no-repeat;
    avatar.textContent = '';
  };
  reader.readAsDataURL(f);
});

// eventos botões
editBtn.addEventListener('click', enterEditMode);
saveBtn.addEventListener('click', saveChanges);
cancelBtn.addEventListener('click', cancelEdit);

// deixa campos em readonly por padrão
for(const k in inputs) inputs[k].readOnly = true;
