
const pages = document.querySelector('.pages');
const newsletterLink = document.querySelector('.site-header a');

newsletterLink.addEventListener('click', (e) => {
    e.preventDefault();
    pages.style.transform = 'translateX(-100vw)';
});