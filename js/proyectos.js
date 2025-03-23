document.addEventListener('DOMContentLoaded', function() {
    const proyectosGrid = document.querySelector('.proyectos-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const scrollAmount = 370; // Ancho del proyecto + gap

    function scrollProyectos(direction) {
        proyectosGrid.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    prevBtn.addEventListener('click', () => scrollProyectos(-1));
    nextBtn.addEventListener('click', () => scrollProyectos(1));

    // Ocultar/mostrar botones según la posición del scroll
    proyectosGrid.addEventListener('scroll', () => {
        const isAtStart = proyectosGrid.scrollLeft === 0;
        const isAtEnd = proyectosGrid.scrollLeft + proyectosGrid.clientWidth >= proyectosGrid.scrollWidth - 1;

        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });

    // Nuevo código para la navegación activa
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset para mejor detección

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Actualizar enlaces activos al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    // Actualizar enlaces activos al cargar la página
    window.addEventListener('load', updateActiveLink);
}); 