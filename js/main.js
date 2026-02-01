
const pages = document.querySelector('.pages');
const newsletterLink = document.querySelector('.site-header a');

newsletterLink.addEventListener('click', (e) => {
    e.preventDefault();
    pages.style.transform = 'translateX(-100vw)';
});

const posts = [
    {
        date: '02 fev 2026',
        title: 'Construindo fundamentos antes do framework',
        excerpt: 'Por que aprender HTML, CSS e JavaScript puro ainda é o melhor caminho para construir sistemas sólidos.',
        tags: ['fundamentos', 'javascript', 'carreira']
    },
    {
        date: '03 fev 2026',
        title: 'Minimalismo não é simplicidade burra',
        excerpt: 'Pensar menos elementos não significa pensar menos. Significa pensar melhor.',
        tags: ['design', 'pensamento']
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

    postList.appendChild(li);
})