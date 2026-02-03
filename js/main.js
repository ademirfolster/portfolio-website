const pages = document.querySelector('.pages');
const newsletterLink = document.querySelector('.site-header a');
const logo = document.querySelector('.logo');

const overlay = document.getElementById('postOverlay');
const overlayBody = overlay.querySelector('.overlay-body');
const closeBtn = overlay.querySelector('.overlay-close');
const backdrop = overlay.querySelector('.overlay-backdrop');

/* =========================
   NAVEGAÇÃO
========================= */

newsletterLink.addEventListener('click', e => {
  e.preventDefault();
  pages.style.transform = 'translateX(-100vw)';
});

logo.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
});

/* =========================
   CMS (DADOS)
========================= */

const posts = [
  {
    id: 1,
    slug: 'construindo-fundamentos-antes-do-framework',
    title: 'Construindo fundamentos antes do framework',
    datePublished: '2026-02-02',
    dateUpdated: '2026-02-02',
    tags: ['fundamentos', 'javascript', 'carreira'],
    status: 'published',
    content: `
Frameworks aceleram. Fundamentos sustentam.

Aprender HTML, CSS e JavaScript puro não é perda de tempo.
É o que permite entender o que realmente está acontecendo.

- Dominar a base
- Trocar de stack sem medo
- Pensar sistemas, não ferramentas
`
  },
  {
    id: 2,
    slug: 'minimalismo-nao-e-simplicidade-burra',
    title: 'Minimalismo não é simplicidade burra',
    datePublished: '2026-02-03',
    dateUpdated: '2026-02-03',
    tags: ['design', 'pensamento'],
    status: 'published',
    content: `
Remover é mais difícil do que adicionar.

Menos elementos não significa menos pensamento.
Significa mais responsabilidade.

- Clareza
- Intenção
- Coerência
`
  },
  {
    id: 3,
    slug: 'rascunho-nao-publicado',
    title: 'Post em rascunho',
    datePublished: null,
    dateUpdated: null,
    tags: ['draft'],
    status: 'draft',
    content: `
Este conteúdo ainda não deveria aparecer.
`
  }
];

/* =========================
   LÓGICA
========================= */

function getPublishedPosts() {
  return posts.filter(p => p.status === 'published');
}

function getPostById(id) {
  return posts.find(p => p.id === id);
}

/* =========================
   MARKDOWN SIMPLES (SEM TÍTULO)
========================= */

function parseMarkdown(text) {
  return text
    .trim()
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>');
}

/* =========================
   RENDERIZAÇÃO
========================= */

const postList = document.getElementById('postList');

function renderPostList() {
  postList.innerHTML = '';

  getPublishedPosts().forEach(post => {
    const li = document.createElement('li');
    li.className = 'post-item';

    li.innerHTML = `
      <span class="post-date">${formatDate(post.datePublished)}</span>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${createExcerpt(post.content)}</p>
      <div class="post-tags">
        ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
      </div>
    `;

    li.addEventListener('click', () => openPost(post.id));
    postList.appendChild(li);
  });
}

function openPost(id) {
  const post = getPostById(id);
  if (!post) return;

  overlayBody.innerHTML = `
    <header style="margin-bottom:32px">
      <h2 style="margin-bottom:8px">${post.title}</h2>
      <span style="font-size:12px;color:#666;letter-spacing:.04em">
        ${formatDate(post.datePublished)}
      </span>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        ${post.tags.map(tag =>
          `<span style="font-size:11px;padding:4px 10px;border:1px solid #eaeaea;border-radius:999px;color:#666">${tag}</span>`
        ).join('')}
      </div>
    </header>

    <div style="line-height:1.7">
      ${parseMarkdown(post.content)}
    </div>
  `;

  overlay.classList.add('is-active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

/* =========================
   UTILITÁRIOS
========================= */

function closeOverlay() {
  overlay.classList.remove('is-active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function createExcerpt(content) {
  return content
    .replace(/[\n\-]/g, ' ')
    .trim()
    .slice(0, 140) + '…';
}

closeBtn.addEventListener('click', closeOverlay);
backdrop.addEventListener('click', closeOverlay);

renderPostList();
