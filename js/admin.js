const app = document.getElementById('adminApp');

const AUTH_USER = 'ademirfolster';
const AUTH_PASS = 'administrador123';

/* =========================
   AUTENTICAÇÃO
========================= */

function isAuthenticated() {
  return localStorage.getItem('auth') === 'true';
}

function login(user, pass) {
  if (user === AUTH_USER && pass === AUTH_PASS) {
    localStorage.setItem('auth', 'true');
    renderDashboard();
  } else {
    alert('Credenciais inválidas');
  }
}

function logout() {
  localStorage.removeItem('auth');
  renderLogin();
}

/* =========================
   TELAS
========================= */

function renderLogin() {
  app.innerHTML = `
    <section class="login-box">
      <h1>Admin</h1>

      <form id="loginForm">
        <input type="text" placeholder="Usuário" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </section>
  `;

  const form = document.getElementById('loginForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [user, pass] = e.target.elements;
    login(user.value, pass.value);
  });
}

function renderDashboard() {
  app.innerHTML = `
    <section class="dashboard">
      <header class="admin-header">
        <strong>Painel Admin</strong>
        <button id="logoutBtn">Sair</button>
      </header>

      <div class="admin-content">
        <p>Bem-vindo. Painel em construção.</p>
      </div>
    </section>
  `;

  document.getElementById('logoutBtn')
    .addEventListener('click', logout);
}

/* =========================
   BOOT
========================= */

isAuthenticated() ? renderDashboard() : renderLogin();
