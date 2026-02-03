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
   POSTS (placeholder)
====================== */

document.querySelector('[data-view="posts"]').onclick = () => {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('posts').classList.remove('hidden');

  document.getElementById('posts').innerHTML = `
    <p>Painel de posts vem na próxima etapa.</p>
  `;
};

document.querySelector('[data-view="dashboard"]').onclick = () => {
  document.getElementById('posts').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
};
