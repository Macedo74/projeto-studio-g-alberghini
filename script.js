// --- BOTÃO VOLTAR AO TOPO ---
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    // Verifica se o usuário desceu mais de 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "flex"; // Usamos flex para alinhar o ícone interno
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// --- LÓGICA DA GALERIA (LIGHTBOX) ---
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-grid img');

// Abre a imagem ao clicar
galleryImages.forEach(image => {
    image.onclick = () => {
        lightbox.classList.add('active');
        lightboxImg.src = image.src; // Pega o caminho da imagem clicada
        lightboxCaption.innerHTML = image.alt; // Pega o texto alternativo como legenda
    };
});

// Fecha o lightbox ao clicar no botão 'X'
lightboxClose.onclick = () => {
    lightbox.classList.remove('active');
};

// Fecha o lightbox ao clicar fora da imagem (no fundo escuro)
lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
};