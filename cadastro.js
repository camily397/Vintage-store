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

