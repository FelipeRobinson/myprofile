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

menuToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// HEADER COM SOMBRA AO ROLAR
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// EFEITO DE DIGITAÇÃO
const words = ['Full Stack', 'Web', 'de Sistemas', 'IoT & IA'];
const typed = document.getElementById('typed-word');
let w = 0, c = words[0].length, deleting = true;
function type() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (deleting) {
        c--;
        if (c < 0) { deleting = false; w = (w + 1) % words.length; c = 0; }
    } else {
        c++;
        if (c > words[w].length) { deleting = true; setTimeout(type, 1800); return; }
    }
    setTimeout(type, deleting ? 50 : 100);
}
setTimeout(type, 2000);

// REVELAR AO ROLAR + CONTADORES
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        const num = entry.target.querySelector('[data-count]');
        if (num) {
            const target = +num.dataset.count;
            let n = 0;
            const step = () => { num.textContent = ++n; if (n < target) setTimeout(step, 60); };
            step();
        }
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// LINK ATIVO NO MENU
const links = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(l => l.classList.toggle('current', l.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

// FILTRO DE PROJETOS
document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.toggle('hidden', f !== 'all' && !card.dataset.cat.split(' ').includes(f));
        });
    });
});

// FORMULÁRIO (abre o app de email com a mensagem preenchida)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const body = `${d.get('mensagem')}\n\n— ${d.get('nome')} (${d.get('email')})`;
    window.location.href = `mailto:feliperobinsonprofissional@gmail.com?subject=${encodeURIComponent('Contato pelo portfólio')}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
