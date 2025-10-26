// cadastro.js
import { supabase } from './supabaseClient.js';

async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se o email já existe
    const { data: existente, error: errCheck } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

    if (existente) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Insere no Supabase
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }]);

    if (error) {
        alert('Erro ao cadastrar. Tente novamente.');
        console.log(error);
    } else {
        alert('Cadastro realizado com sucesso! Agora faça login.');
        window.location.href = 'login.html';
    }
}

// conecta o botão com a função
document.querySelector('button').addEventListener('click', cadastrar);
// Após cadastro bem-sucedido
showWelcomeModal(data.nome);

function showWelcomeModal(nome) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.5);
            display:flex; justify-content:center; align-items:center;
        ">
            <div style="
                background:white;
                padding: 30px;
                border-radius: 15px;
                text-align:center;
                max-width: 300px;
            ">
                <h2>Bem-vinda, ${nome}!</h2>
                <p>Cadastro realizado com sucesso 💖</p>
                <button id="closeModal">Fechar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closeModal').onclick = () => modal.remove();
}
// Guarda o usuário logado
localStorage.setItem('usuarioLogado', JSON.stringify(data));

// Redireciona para minhaConta.html ou mostra pop-up de boas-vindas
window.location.href = 'minhaconta.html';
