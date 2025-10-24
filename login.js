import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* ====== CONFIG SUPABASE - TROQUE AQUI ====== */
const SUPABASE_URL = "https://awuhwgmueyaxerfqtbdh.supabase.co"; // troque
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dWh3Z211ZXlheGVyZnF0YmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTM0ODYsImV4cCI6MjA3NjYyOTQ4Nn0.nNFyl87x8rPSKnXAbObj88LOCYYJWCTdUv8Wpu33VYk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
/* ========================================== */

/* ====== ELEMENTOS ====== */
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMsg = document.getElementById('authMsg');
const privateArea = document.getElementById('privateArea');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');
const googleLoginBtn = document.getElementById("googleLoginBtn");

/* ===== Mensagens simples ===== */
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

/* ===== Login com Google (OAuth) ===== */
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
    console.error(err);
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
        data: {
          full_name: nome,
          dob: dataNascimento,
          phone: telefone,
          username: usuario
        }
      }
    });

    if (error) {
      console.error("signUp error:", error);
      return showMsg("Erro ao cadastrar: " + error.message, "error");
    }

    const user = data?.user;
    if (user) {
      const profileErr = await upsertProfile(user.id, {
        full_name: nome,
        dob: dataNascimento,
        phone: telefone,
        username: usuario
      });
      if (profileErr) console.warn("Erro ao criar profile:", profileErr);
    }

    showMsg("Conta criada! Verifique seu e-mail (se necessário).", "success");
    registerForm.reset();
    document.querySelector('.tab[data-tab="login-pane"]').click();

  } catch (err) {
    console.error(err);
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

    if (error) {
      console.error("signIn error:", error);
      return showMsg("Erro ao entrar: " + error.message, "error");
    }

    showMsg("Login realizado com sucesso!", "success");
    loginForm.reset();

    const user = data?.user;
    if (user) {
      const profileErr = await upsertProfile(user.id, {
        full_name: user.user_metadata?.full_name || null,
        dob: user.user_metadata?.dob || null,
        phone: user.user_metadata?.phone || null,
        username: user.user_metadata?.username || null
      });
      if (profileErr) console.warn("Erro ao upsert profile depois do login:", profileErr);
    }
  } catch (err) {
    console.error(err);
    showMsg("Erro inesperado no login.", "error");
  }
});

/* ===== Auth State ===== */
supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    privateArea.classList.remove('hidden');
    const user = session.user;
    welcomeUser.textContent = `Bem-vindo, ${user.user_metadata?.full_name || user.email}!`;

    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .limit(1)
        .maybeSingle();

      if (!existing) {
        await upsertProfile(user.id, {
          full_name: user.user_metadata?.full_name || null,
          dob: user.user_metadata?.dob || null,
          phone: user.user_metadata?.phone || null,
          username: user.user_metadata?.username || null
        });
      }
    } catch (err) {
      console.error("Erro no onAuthStateChange:", err);
    }
  } else {
    privateArea.classList.add('hidden');
    welcomeUser.textContent = "";
  }
});

/* ===== Logout ===== */
logoutBtn?.addEventListener('click', async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showMsg("Erro ao sair: " + error.message, "error");
      return;
    }

    localStorage.clear();
    sessionStorage.clear();

    showMsg("Você saiu da conta.", "success");

    privateArea.classList.add('hidden');
    welcomeUser.textContent = "";

    setTimeout(() => {
      location.reload();
    }, 800);

  } catch (err) {
    console.error(err);
    showMsg("Erro ao sair.", "error");
  }
});
