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
const googleLoginBtn = document.getElementById("googleLoginBtn");
const petImg = document.getElementById("petImg");
const speech = document.getElementById("speechBubble");

/* ===== Funções auxiliares ===== */
const showMsg = (text, type = "success") => {
  if (!authMsg) return;
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};

const clearMsg = () => {
  if (!authMsg) return;
  authMsg.textContent = "";
  authMsg.className = "msg";
};

const petSpeak = (text) => {
  speech.textContent = text;
  speech.classList.remove("hidden");
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

/* ===== Helper: upsert perfil ===== */
async function upsertProfile(userId, profileData) {
  if (!userId) return;

  const payload = {
    id: userId,
    full_name: profileData.full_name || null,
    dob: profileData.dob || null,
    phone: profileData.phone || null,
    username: profileData.username || null,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id', returning: 'minimal' });

  return error;
}

/* ===== Login com Google ===== */
googleLoginBtn?.addEventListener("click", async () => {
  clearMsg();
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) showMsg("Erro ao iniciar login com Google: " + error.message, "error");
    else showMsg("Redirecionando para o Google...", "success");
  } catch (err) {
    showMsg("Erro inesperado no login com Google.", "error");
  }
});

/* ===== Cadastro ===== */
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg();

  const nome = document.getElementById('regNome').value.trim();
  const dataNascimento = document.getElementById('regNascimento').value || null;
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const telefone = document.getElementById('regTelefone').value.trim() || null;
  const usuario = document.getElementById('regUsuario').value.trim().toLowerCase();
  const senha = document.getElementById('regSenha').value;

  if (!nome || !email || !senha || !usuario) {
    return showMsg("Por favor, preencha todos os campos obrigatórios.", "error");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { full_name: nome, dob: dataNascimento, phone: telefone, username: usuario }
      }
    });

    if (error) return showMsg("Erro ao cadastrar: " + error.message, "error");

    const user = data?.user;
    if (user) await upsertProfile(user.id, { full_name: nome, dob: dataNascimento, phone: telefone, username: usuario });

    showMsg("Conta criada com sucesso!", "success");
    petImg.classList.add("happy");
    petSpeak(`Bem-vindo, ${usuario}!`);
    setTimeout(() => location.href = "inicio.html", 2000);
  } catch (err) {
    showMsg("Erro inesperado ao cadastrar.", "error");
  }
});

/* ===== Login ===== */
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg();

  const userOrEmail = document.getElementById('loginUser').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;

  if (!userOrEmail || !pass) {
    return showMsg("Por favor, preencha o e-mail/usuário e a senha.", "error");
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userOrEmail,
      password: pass
    });

    if (error) return showMsg("Erro ao entrar: " + error.message, "error");

    const user = data?.user;
    const username = user?.user_metadata?.username || user?.email?.split('@')[0];

    showMsg("Login realizado com sucesso!", "success");
    petImg.classList.add("happy");
    petSpeak(`Bem-vindo, ${username}!`);
    setTimeout(() => location.href = "inicio.html", 2000);
  } catch (err) {
    showMsg("Erro inesperado no login.", "error");
  }
});
