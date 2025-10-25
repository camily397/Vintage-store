const btnEnviar = document.getElementById('btnEnviar');
const thankyou = document.getElementById('thankyou');
const comentario = document.getElementById('comentario');
const stars = document.querySelectorAll('.stars input');
const balloon = document.getElementById('balloon');
const tags = document.querySelectorAll('.tag');

const cores = {
  1: '#ffcccc',
  2: '#ffd9b3',
  3: '#fff3b3',
  4: '#d4f5b3',
  5: '#b3f0ff'
};

// Mudança de cor do balão conforme estrela selecionada
stars.forEach(star => {
  star.addEventListener('change', () => {
    const val = star.value;
    balloon.style.backgroundColor = cores[val];
    balloon.style.transition = 'background-color 0.3s';
  });
});

// Seleção de tags rápidas
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('selected');
  });
});

// Botão enviar
btnEnviar.addEventListener('click', () => {
  const comentarioVal = comentario.value.trim();
  const estrelaSelecionada = document.querySelector('input[name="rating"]:checked');
  const selectedTags = Array.from(tags).filter(t => t.classList.contains('selected')).map(t => t.textContent);

  if (!comentarioVal || !estrelaSelecionada) {
    alert('Por favor, preencha o comentário e selecione a avaliação em estrelas.');
    return;
  }

  console.log('Estrelas:', estrelaSelecionada.value);
  console.log('Tags selecionadas:', selectedTags);
  console.log('Comentário:', comentarioVal);

  thankyou.style.display = 'block';
  comentario.value = '';
  stars.forEach(r => r.checked = false);
  tags.forEach(t => t.classList.remove('selected'));
  balloon.style.backgroundColor = '#e0f7fa';
});
