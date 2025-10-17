document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Flags para validar
    let valido = true;

    // Limpa mensagens de erro anteriores
    limparErros();

    // Função para mostrar erros
    function mostrarErro(id, mensagem) {
      const elementoErro = document.getElementById(id);
      if (elementoErro) {
        elementoErro.textContent = mensagem;
      }
    }

    // Validações

    // Nome obrigatório
    if (!nome) {
      mostrarErro('nomeError', 'Nome é obrigatório.');
      valido = false;
    }

    // Email obrigatório e formato válido
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      mostrarErro('emailError', 'E-mail é obrigatório.');
      valido = false;
    } else if (!emailRegex.test(email)) {
      mostrarErro('emailError', 'E-mail inválido.');
      valido = false;
    }

    // Senha obrigatória
    if (!senha) {
      mostrarErro('senhaError', 'Senha é obrigatória.');
      valido = false;
    }

    // Confirmação de senha igual à senha
    if (confirmarSenha !== senha) {
      mostrarErro('confirmarSenhaError', 'As senhas não coincidem.');
      valido = false;
    }

    if (valido) {
      alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nE-mail: ${email}`);
      // Aqui você pode enviar o form via AJAX ou form.submit()
      // form.submit();
    }

    // Função para limpar erros
    function limparErros() {
      ['nomeError', 'emailError', 'senhaError', 'confirmarSenhaError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
      });
    }
  });
});

