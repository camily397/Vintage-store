// app.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm&quot;;

// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://qgacdbbfpkvunlkofckt.supabase.co&quot;;   // troque
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYWNkYmJmcGt2dW5sa29mY2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjI1NDMsImV4cCI6MjA3NDE5ODU0M30.8Sj3XFkd49olF6997K9iciuVboYdKIBjDWzzo7w5xp8";             // troque
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);// ===== ELEMENTOS =====
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMsg = document.getElementById('authMsg');
const privateArea = document.getElementById('privateArea');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');

const showMsg = (text, type = "success") => {
  if (!authMsg) return;
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};
const clearMsg = () => showMsg("");

// ===== TROCA DE ABAS =====
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ===== CADASTRO =====
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();

    const nome = document.getElementById('regNome').value.trim();
    const dataNascimento = document.getElementById('regNascimento').value || null;
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const telefone = document.getElementById('regTelefone').value.trim();
    const usuario = document.getElementById('regUsuario').value.trim().toLowerCase();
    const senha = document.getElementById('regSenha').value;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { full_name: nome, dob: dataNascimento, phone: telefone, username: usuario }
        }
      });

      if (error) {
        showMsg("Erro ao cadastrar: " + error.message, "error");
        return;
      }

      showMsg("Conta criada! Verifique seu e-mail se precisar confirmar.", "success");
      registerForm.reset();
      document.querySelector('.tab[data-tab="login-pane"]').click();
    } catch (err) {
      console.error(err);
      showMsg("Erro inesperado ao cadastrar.", "error");
    }
  });
}

// ===== LOGIN =====
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();

    let userOrEmail = document.getElementById('loginUser').value.trim().toLowerCase();
    const pass = document.getElementById('loginPass').value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userOrEmail,
        password: pass
      });

      if (error) {
        showMsg("Erro ao entrar: " + error.message, "error");
        return;
      }

      showMsg("Login realizado com sucesso!", "success");
      loginForm.reset();
    } catch (err) {
      console.error(err);
      showMsg("Erro inesperado no login.", "error");
    }
  });
}

// ===== ESTADO DE AUTENTICAÇÃO =====
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    privateArea.classList.remove('hidden');
    welcomeUser.textContent = `Bem-vindo, ${session.user.user_metadata?.full_name || session.user.email}!`;
  } else {
    privateArea.classList.add('hidden');
  }
});

// ===== LOGOUT =====
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showMsg("Você saiu da conta.", "success");
  });
}
