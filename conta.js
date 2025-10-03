// app.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm&quot;;

// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://qgacdbbfpkvunlkofckt.supabase.co&quot;;   // troque
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYWNkYmJmcGt2dW5sa29mY2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjI1NDMsImV4cCI6MjA3NDE5ODU0M30.8Sj3XFkd49olF6997K9iciuVboYdKIBjDWzzo7w5xp8";             // troque
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Vintage Store</title>
  <link rel="stylesheet" href="conta.css">
</head>
<body>
  <!-- Header -->
  <header>
    <div class="logo">Vintage Store</div>
    <a href="login.html" class="menu">Minha Conta</a>
  </header>

  <main>
    <div class="conta-container">
      <div class="login-card">
        <h2>Entrar na sua Conta</h2>
        <form action="#" method="post">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>

          <label for="senha">Senha</label>
          <input type="password" id="senha" name="senha" placeholder="********" required>

          <button type="submit">Entrar</button>
        </form>
        <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
      </div>
    </div>
  </main>

  <a href="index.html" class="voltar">← Voltar</a>
</body>
</html>
