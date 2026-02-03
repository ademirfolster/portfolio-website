const LOGIN = {
  user: 'ademirfolster',
  pass: 'administrador123'
};

const loginBox = document.getElementById('login');
const adminBox = document.getElementById('admin');

document.getElementById('loginBtn').onclick = () => {
  const u = user.value;
  const p = pass.value;

  if (u === LOGIN.user && p === LOGIN.pass) {
    loginBox.classList.add('hidden');
    adminBox.classList.remove('hidden');
    loadDashboard();
  } else {
    alert('Credenciais inválidas');
  }
};

/* ======================
   DASHBOARD
====================== */

function loadDashboard(days = 7) {
  const dashboard = document.getElementById('dashboard');

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const events = JSON.parse(localStorage.getItem('analytics_events')) || [];
  const filtered = events.filter(e => {
    const d = new Date(e.date);
    return d >= start && d <= end;
  });

  const visits = filtered.filter(e => e.type === 'visit').length;
  const scrolls = filtered.filter(e => e.type === 'scroll').length;
  const clicks = filtered.filter(e => e.type === 'click');

  const byDay = {};
  filtered.forEach(e => {
    const day = e.date.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
  });

  const max = Math.max(...Object.values(byDay), 1);

  dashboard.innerHTML = `
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="filters">
        <button onclick="loadDashboard(3)">3 dias</button>
        <button onclick="loadDashboard(7)">7 dias</button>
        <button onclick="loadDashboard(30)">30 dias</button>
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <span>Visitas</span>
        <strong>${visits}</strong>
      </div>
      <div class="card">
        <span>Scrolls</span>
        <strong>${scrolls}</strong>
      </div>
      <div class="card">
        <span>Cliques</span>
        <strong>${clicks.length}</strong>
      </div>
    </div>

    <div class="chart">
      <strong>Eventos por dia</strong>
      <div class="bars">
        ${Object.values(byDay).map(v =>
          `<div class="bar" style="height:${(v / max) * 100}%"></div>`
        ).join('')}
      </div>
    </div>

    <div class="list">
      <strong>Cliques por canal</strong>
      <ul>
        ${['github','linkedin','instagram','whatsapp'].map(t =>
          `<li>${t}: ${clicks.filter(c => c.meta.target.includes(t)).length}</li>`
        ).join('')}
      </ul>
    </div>
  `;
}

/* ======================
   POSTS (CMS)
====================== */

let posts = JSON.parse(localStorage.getItem('admin_posts')) || [];
let editingId = null;

const postsSection = document.getElementById('posts');

function loadPostsView() {
  postsSection.innerHTML = `
    <div class="posts-header">
      <h1>Posts</h1>
      <button id="newPostBtn">Novo post</button>
    </div>

    <ul class="post-admin-list" id="postAdminList"></ul>

    <div class="editor hidden" id="editor">
      <input id="postTitle" placeholder="Título">
      <input id="postSlug" placeholder="Slug">
      <input id="postTags" placeholder="Tags (separadas por vírgula)">

      <select id="postStatus">
        <option value="draft">Rascunho</option>
        <option value="published">Publicado</option>
      </select>

      <textarea id="postContent" placeholder="Conteúdo (markdown)"></textarea>

      <div class="editor-actions">
        <button id="savePostBtn">Salvar</button>
        <button id="deletePostBtn">Excluir</button>
      </div>
    </div>
  `;

  bindPostEvents();
  renderAdminPosts();
}

function bindPostEvents() {
  const editor = document.getElementById('editor');

  document.getElementById('newPostBtn').onclick = () => {
    editingId = null;
    editor.classList.remove('hidden');

    postTitle.value = '';
    postSlug.value = '';
    postTags.value = '';
    postContent.value = '';
    postStatus.value = 'draft';
  };

  document.getElementById('savePostBtn').onclick = () => {
    const post = {
      id: editingId || Date.now(),
      title: postTitle.value,
      slug: postSlug.value,
      tags: postTags.value.split(',').map(t => t.trim()),
      status: postStatus.value,
      content: postContent.value,
      dateUpdated: new Date().toISOString(),
      datePublished: postStatus.value === 'published'
        ? new Date().toISOString()
        : null
    };

    if (editingId) {
      posts = posts.map(p => p.id === editingId ? post : p);
    } else {
      posts.push(post);
    }

    localStorage.setItem('admin_posts', JSON.stringify(posts));
    editor.classList.add('hidden');
    renderAdminPosts();
  };

  document.getElementById('deletePostBtn').onclick = () => {
    if (!editingId) return;
    posts = posts.filter(p => p.id !== editingId);
    localStorage.setItem('admin_posts', JSON.stringify(posts));
    editor.classList.add('hidden');
    renderAdminPosts();
  };
}

function renderAdminPosts() {
  const list = document.getElementById('postAdminList');
  list.innerHTML = '';

  posts.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${post.title || '(sem título)'}</strong><br>
      <small>${post.status}</small>
    `;

    li.onclick = () => {
      editingId = post.id;
      document.getElementById('editor').classList.remove('hidden');

      postTitle.value = post.title;
      postSlug.value = post.slug;
      postTags.value = post.tags.join(', ');
      postStatus.value = post.status;
      postContent.value = post.content;
    };

    list.appendChild(li);
  });
}

/* ======================
   NAVEGAÇÃO
====================== */

document.querySelector('[data-view="posts"]').onclick = () => {
  dashboard.classList.add('hidden');
  postsSection.classList.remove('hidden');
  loadPostsView();
};

document.querySelector('[data-view="dashboard"]').onclick = () => {
  postsSection.classList.add('hidden');
  dashboard.classList.remove('hidden');
};
