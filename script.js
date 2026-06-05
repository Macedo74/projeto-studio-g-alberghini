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

// --- LÓGICA DA GALERIA (LIGHTBOX COM NAVEGAÇÃO) ---
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Seleciona os novos botões de navegação
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Convertemos o NodeList em um Array comum para podermos usar o indexOf()
const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));

let currentIndex = 0; // Armazena o índice da imagem que está aberta no momento

// Função auxiliar para atualizar o conteúdo do Lightbox (Imagem e Legenda)
const updateLightbox = (index) => {
    currentIndex = index;
    const currentImg = galleryImages[currentIndex];
    
    lightboxImg.src = currentImg.src;
    // Se você tiver o elemento .lightbox-caption no seu HTML, ele atualiza a legenda
    if (lightboxCaption) {
        lightboxCaption.innerHTML = currentImg.alt;
    }
};

// Abre a imagem ao clicar
galleryImages.forEach((image, index) => {
    image.onclick = () => {
        lightbox.classList.add('active'); // Abre o modal com o efeito fade do seu CSS [cite: 39]
        updateLightbox(index); // Carrega a imagem correspondente ao clique
        document.body.style.overflow = "hidden"; // Opcional: trava o scroll da página ao fundo [cite: 26]
    };
});

// Função para avançar a foto (Navegação em loop)
const nextImage = () => {
    // Se for a última foto, volta para a primeira (índice 0)
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox(nextIndex);
};

// Função para voltar a foto
const prevImage = () => {
    // Se estiver na primeira e voltar, vai para a última foto
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox(prevIndex);
};

// Vincula os eventos de clique nas setas do seu CSS 
if (lightboxNext) lightboxNext.onclick = nextImage;
if (lightboxPrev) lightboxPrev.onclick = prevImage;

// Fecha o lightbox ao clicar no botão 'X'
lightboxClose.onclick = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = "auto"; // Devolve o scroll para a página
};

// Fecha o lightbox ao clicar fora da imagem (no fundo escuro)
lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = "auto";
    }
};

// EXTRA: Navegação super confortável usando o teclado do computador! 
document.addEventListener("keydown", (e) => {
    // Só executa se o Lightbox estiver visível/aberto [cite: 43]
    if (lightbox.classList.contains('active')) {
        if (e.key === "ArrowRight") nextImage(); // Seta para a Direita avança 
        if (e.key === "ArrowLeft") prevImage();  // Seta para a Esquerda volta 
        if (e.key === "Escape") {                 // Tecla Esc fecha o modal 
            lightbox.classList.remove('active');
            document.body.style.overflow = "auto";
        }
    }
});
