import supabase from './supabaseClient.js';

async function buscarDados() {
  const { data, error } = await supabase
    .from('usuarios')  // Troca pelo nome da sua tabela no Supabase
    .select('*');  // Seleciona todas as colunas

  if (error) {
    console.log('Erro:', error);
  } else {
    console.log('Dados:', data);
  }
}

buscarDados();
