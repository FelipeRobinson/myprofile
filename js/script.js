// MENU HAMBÚRGUER
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function setMenu(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('active'));
});

// Fecha o menu ao clicar em um link da página
navMenu.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Fecha o menu com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// Abre o menu com a tecla Enter ou Espaço
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') setMenu(true);
});