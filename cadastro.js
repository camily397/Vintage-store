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
    const { data: existente } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

    if (existente) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Insere no banco
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }])
        .select()
        .single();

    if (error) {
        alert('Erro ao cadastrar. Tente novamente.');
        console.log(error);
    } else {
        showWelcomeModal(data.nome);

        localStorage.setItem('usuarioLogado', JSON.stringify(data));

        setTimeout(() => {
            window.location.href = 'minhaconta.html';
        }, 2000);
    }
}

document.querySelector('button').addEventListener('click', cadastrar);

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
