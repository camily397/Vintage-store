import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* ===== CONFIG SUPABASE ===== */
const SUPABASE_URL = "https://awuhwgmueyaxerfqtbdh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dWh3Z211ZXlheGVyZnF0YmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTM0ODYsImV4cCI6MjA3NjYyOTQ4Nn0.nNFyl87x8rPSKnXAbObj88LOCYYJWCTdUv8Wpu33VYk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ===== ELEMENTOS ===== */
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMsg = document.getElementById('authMsg');
const petImg = document.getElementById('petImg');
const speech = document.getElementById('speechBubble');

/* ===== Funções auxiliares ===== */
const showMsg = (text, type = "success") => {
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};

const clearMsg = () => {
  authMsg.textContent = "";
  authMsg.className = "msg";
};

const petSpeak = (text) => {
  speech.textContent = text;
  speech.classList.remove("hidden");
  petImg.classList.add("happy");
};

/* ===== Troca de abas ===== */
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab)?.classList.add('active');
  });
});

/* ===== Cadastro ===== */
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg();

  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const senha = document.getElementById('regSenha').value;
  const usuario = document.getElementById('regUsuario').value.trim().toLowerCase();

  if (!email || !senha || !usuario) {
    return showMsg("Por favor, preencha todos os campos.", "error");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { username: usuario } }
    });

    if (error) return showMsg("Erro ao cadastrar: " + error.message, "error");

    showMsg("Conta criada com sucesso!", "success");
    petSpeak(`Conta criada com sucesso, ${usuario}! 🐾`);
    setTimeout(() => location.href = "inicio.html", 2000);
  } catch (err) {
    showMsg("Erro inesperado ao cadastrar.", "error");
  }
});

/* ===== Login ===== */
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const senha = document.getElementById('loginPass').value;

  if (!email || !senha) {
    return showMsg("Preencha todos os campos.", "error");
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) return showMsg("Erro ao entrar: " + error.message, "error");

    const usuario = data?.user?.user_metadata?.username || email.split('@')[0];
    showMsg("Login realizado com sucesso!", "success");
    petSpeak(`Bem-vindo de volta, ${usuario}! 💫`);
    setTimeout(() => location.href = "inicio.html", 2000);
  } catch (err) {
    showMsg("Erro inesperado no login.", "error");
  }
});
