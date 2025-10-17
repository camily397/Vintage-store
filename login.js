const users = [
  { id: 1, nome: 'João Silva', nascimento: '1990-05-25', email: 'joao@example.com', telefone: '1234567890', usuario: 'joaosilva' },
  { id: 2, nome: 'Maria Oliveira', nascimento: '1985-08-15', email: 'maria@example.com', telefone: '0987654321', usuario: 'mariaol' }
];

const usersTableBody = document.querySelector('#usersTable tbody');
const editFormContainer = document.getElementById('editFormContainer');
const editForm = document.getElementById('editForm');
const cancelEditBtn = document.getElementById('cancelEdit');
const msgDiv = document.getElementById('msg');

function carregarTabela() {
  usersTableBody.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.nascimento}</td>
      <td>${user.email}</td>
      <td>${user.telefone}</td>
      <td>${user.usuario}</td>
      <td>
        <button class="btn-edit" data-id="${user.id}">Editar</button>
        <button class="btn-remove" data-id="${user.id}">Remover</button>
      </td>
    `;

    usersTableBody.appendChild(tr);
  });

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.currentTarget.dataset.id);
      editarUsuario(id);
    });
  });

  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.currentTarget.dataset.id);
      removerUsuario(id);
    });
  });
}

function editarUsuario(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  document.getElementById('editId').value = user.id;
  document.getElementById('editNome').value = user.nome;
  document.getElementById('editNascimento').value = user.nascimento;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editTelefone').value = user.telefone;
  document.getElementById('editUsuario').value = user.usuario;

  editFormContainer.classList.remove('hidden');
  msgDiv.textContent = '';
}

cancelEditBtn.addEventListener('click', () => {
  editFormContainer.classList.add('hidden');
  msgDiv.textContent = '';
});

editForm.addEventListener('submit', e => {
  e.preventDefault();

  const id = parseInt(document.getElementById('editId').value);
  const nome = document.getElementById('editNome').value.trim();
  const nascimento = document.getElementById('editNascimento').value;
  const email = document.getElementById('editEmail').value.trim();
  const telefone = document.getElementById('editTelefone').value.trim();
  const usuario = document.getElementById('editUsuario').value.trim();

  if (!nome || !nascimento || !email || !usuario) {
    msgDiv.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    msgDiv.classList.remove('success');
    msgDiv.classList.add('error');
    return;
  }

  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, nome, nascimento, email, telefone, usuario };
    carregarTabela();
    editFormContainer.classList.add('hidden');

    msgDiv.textContent = 'Cadastro atualizado com sucesso!';
    msgDiv.classList.remove('error');
    msgDiv.classList.add('success');
  }
});

function removerUsuario(id) {
  if (!confirm('Tem certeza que deseja remover este usuário?')) return;

  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    carregarTabela();

    msgDiv.textContent = 'Usuário removido com sucesso!';
    msgDiv.classList.remove('error');
    msgDiv.classList.add('success');

    editFormContainer.classList.add('hidden');
  }
}

carregarTabela();


