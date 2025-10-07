  <script>
    document.getElementById("cadastroForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      alert(`Conta criada com sucesso!\nBem-vindo(a), ${nome}!`);
      window.location.href = "login.html";
    });
  </script>
