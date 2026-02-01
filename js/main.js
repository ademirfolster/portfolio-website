const pages = document.querySelector('.pages');
const newsletterLink = document.querySelector('.site-header a');
const logo = document.querySelector('.logo');

const overlay = document.getElementById('postOverlay');
const overlayBody = overlay.querySelector('.overlay-body');
const closeBtn = overlay.querySelector('.overlay-close');
const backdrop = overlay.querySelector('.overlay-backdrop');

newsletterLink.addEventListener('click', (e) => {
  e.preventDefault();
  pages.style.transform = 'translateX(-100vw)';
});

logo.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
});

const posts = [
  {
    date: '02 fev 2026',
    title: 'Construindo fundamentos antes do framework',
    excerpt: 'Por que aprender HTML, CSS e JavaScript puro ainda é o melhor caminho para construir sistemas sólidos.',
    tags: ['fundamentos', 'javascript', 'carreira'],
    content: `
      <header style="margin-bottom:32px">
        <h2 style="margin-bottom:8px">Construindo fundamentos antes do framework</h2>
        <span style="font-size:12px;color:#666;letter-spacing:.04em">02 fev 2026</span>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">fundamentos</span>
          <span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">javascript</span>
          <span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">carreira</span>
        </div>
      </header>

      <div style="line-height:1.7">
        <p>
          Frameworks aceleram. Fundamentos sustentam.
          Aprender HTML, CSS e JavaScript puro não é perda de tempo —
          é o que permite entender o que realmente está acontecendo.
        </p>
        <p>
          Quem domina a base troca de stack sem medo.
          Quem pula etapas depende de abstrações que não entende.
        </p>
      </div>
    `
  },
  {
    date: '03 fev 2026',
    title: 'Minimalismo não é simplicidade burra',
    excerpt: 'Pensar menos elementos não significa pensar menos. Significa pensar melhor.',
    tags: ['design', 'pensamento'],
    content: `
      <header style="margin-bottom:32px">
        <h2 style="margin-bottom:8px">Minimalismo não é simplicidade burra</h2>
        <span style="font-size:12px;color:#666;letter-spacing:.04em">03 fev 2026</span>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">design</span>
          <span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">pensamento</span>
        </div>
      </header>

      <div style="line-height:1.7">
        <p>
          Remover é uma decisão mais difícil do que adicionar.
          Minimalismo exige clareza, intenção e responsabilidade.
        </p>
        <p>
          Menos elementos, mais pensamento.
        </p>
      </div>
    `
  }
];

const postList = document.getElementById('postList');

posts.forEach(post => {
  const li = document.createElement('li');
  li.className = 'post-item';

  li.innerHTML = `
    <span class="post-date">${post.date}</span>
    <h2 class="post-title">${post.title}</h2>
    <p class="post-excerpt">${post.excerpt}</p>
    <div class="post-tags">
      ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
    </div>
  `;

  li.addEventListener('click', () => {
    overlayBody.innerHTML = post.content;
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  });

  postList.appendChild(li);
});

function closeOverlay() {
  overlay.classList.remove('is-active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

closeBtn.addEventListener('click', closeOverlay);
backdrop.addEventListener('click', closeOverlay);
