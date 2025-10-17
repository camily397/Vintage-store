document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Impede o envio do formulário até a validação

        // Pegando os valores dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        let valid = true;

        // Limpando mensagens de erro anteriores
        document.getElementById('nomeError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('senhaError').textContent = '';
        document.getElementById('confirmarSenhaError').textContent = '';

        // Validação do nome
        if (nome === '') {
            document.getElementById('nomeError').textContent = 'Nome é obrigatório.';
            valid = false;
        }

        // Validação do email
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (email === '') {
            document.getElementById('emailError').textContent = 'E-mail é obrigatório.';
            valid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'E-mail inválido.';
            valid = false;
        }

        // Validação da senha
        if (senha === '') {
            document.getElementById('senhaError').textContent = 'Senha é obrigatória.';
            valid = false;
        }

        // Validação de confirmação de senha
        if (confirmarSenha !== senha) {
            document.getElementById('confirmarSenhaError').textContent = 'As senhas não coincidem.';
            valid = false;
        }

        // Se os dados estiverem corretos, mostramos uma mensagem de sucesso
        if (valid) {
            alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nE-mail: ${email}`);
            // Se necessário, você pode enviar o formulário aqui com form.submit()
        }
    });
});
