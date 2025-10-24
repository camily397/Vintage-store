import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* ====== CONFIG SUPABASE - TROQUE AQUI ====== */
const SUPABASE_URL = "https://xxxxxxxxxxxxxxxxxxx.supabase.co"; // troque
const SUPABASE_ANON_KEY = "coloque-aqui-sua-anon-key";         // troque
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

/* ===== Helper: upsert perfil =====
   tenta inserir o perfil; se já existir, faz update.
   usa id = supabase user id (uuid).
*/
async function upsertProfile(userId, profileData) {
  if (!userId) return;
  // Remover campos undefined
  const payload = {
    id: userId,
    full_name: profileData.full_name || null,
    dob: profileData.dob || null,
    phone: profileData.phone || null,
    username: profileData.username || null,
    updated_at: new Date().toISOString()
  };

  // Usamos upsert para criar ou atualizar
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
      options: {
        // você pode especificar redirectTo se quiser forçar um retorno
        // redirectTo: 'http://localhost:3000'
      }
    });
    if (error) showMsg("Erro ao iniciar login com Google: " + error.message, "error");
    else showMsg("Redirecionando para o Google...", "success");
  } catch (err) {
    showMsg("Erro inesperado no login com Google.", "error");
    console.error(err);
  }
});

/* ===== Cadastro (email + senha) ===== */
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
    // signUp retorna data com user (se confirmado automaticamente)
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

    // Se o user já for retornado (depende das configurações do projeto),
    // tentamos criar o perfil agora.
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

    showMsg("Conta criada! Verifique seu e-mail (se solicitado).", "success");
    registerForm.reset();
    // volta para aba login
    document.querySelector('.tab[data-tab="login-pane"]').click();

  } catch (err) {
    console.error(err);
    showMsg("Erro inesperado ao cadastrar.", "error");
  }
});

/* ===== Login (email + senha) ===== */
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg();

  const userOrEmail = document.getElementById('loginUser').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;

  if (!userOrEmail || !pass) {
    return showMsg("Por favor, preencha o e-mail/usuário e a senha.", "error");
  }

  try {
    // Este código assume que o campo é e-mail. Se você quer aceitar username também,
    // precisaria consultar a tabela profiles para resolver username->email.
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

    // opcional: garantir que exista profile para esse usuário
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

/* ===== Auth state change - mostra área privada e cria profile se necessário ===== */
supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    privateArea.classList.remove('hidden');
    const user = session.user;
    welcomeUser.textContent = `Bem-vindo, ${user.user_metadata?.full_name || user.email}!`;

    // Verifica se já existe um profile; se não, cria (upsert)
    try {
      const { data: existing, error: selErr } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .limit(1)
        .maybeSingle();

      if (selErr) console.warn("Erro ao checar profile:", selErr);

      if (!existing) {
        // insere profile com os dados disponíveis em user_metadata
        const profileErr = await upsertProfile(user.id, {
          full_name: user.user_metadata?.full_name || null,
          dob: user.user_metadata?.dob || null,
          phone: user.user_metadata?.phone || null,
          username: user.user_metadata?.username || null
        });
        if (profileErr) console.warn("Erro ao inserir profile via onAuthStateChange:", profileErr);
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
    if (error) return showMsg("Erro ao sair: " + error.message, "error");
    showMsg("Você saiu da conta.", "success");
  } catch (err) {
    console.error(err);
    showMsg("Erro ao sair.", "error");
  }
});


