const btnEnviar = document.getElementById('btnEnviar');
const thankyou = document.getElementById('thankyou');
const comentario = document.getElementById('comentario');
const stars = document.querySelectorAll('.stars input');
const balloon = document.getElementById('balloon');

const cores = {
  1: '#ffcccc', // vermelho claro
  2: '#ffd9b3', // laranja claro
  3: '#fff3b3', // amarelo claro
  4: '#d4f5b3', // verde claro
  5: '#b3f0ff'  // azul claro
};

// Mudança de cor do balão conforme estrela selecionada
stars.forEach(star => {
  star.addEventListener('change', () => {
    const val = star.value;
    balloon.style.backgroundColor = cores[val];
    balloon.style.transition = 'background-color 0.3s';
  });
});

btnEnviar.addEventListener('click', () => {
  const comentarioVal = comentario.value.trim();
  const estrelaSelecionada = document.querySelector('input[name="rating"]:checked');

  if (!comentarioVal || !estrelaSelecionada) {
    alert('Por favor, preencha o comentário e selecione a avaliação em estrelas.');
    return;
  }

  thankyou.style.display = 'block';
  comentario.value = '';
  stars.forEach(r => r.checked = false);
  balloon.style.backgroundColor = '#e0f7fa'; // resetar cor
});
