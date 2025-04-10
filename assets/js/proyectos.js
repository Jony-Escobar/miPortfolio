document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos del carrusel existen
    const proyectosGrid = document.querySelector('.proyectos-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Si existe el carrusel, configurar su funcionalidad
    if (proyectosGrid && prevBtn && nextBtn) {
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
    }

    // Configurar la navegación del sitio - siempre ejecutar esta parte
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarHeight = navbar ? navbar.offsetHeight : 80; // Valor predeterminado por si no existe el navbar
    
    // Verificar que hay enlaces de navegación para configurar
    if (navLinks.length > 0) {
        // Manejar clicks en los enlaces de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Solo procesar enlaces de anclaje internos
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - navbarHeight - 20; // 20px de espacio adicional
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Obtener todas las secciones con ID para navegación
        const sections = document.querySelectorAll('section[id]');

        function updateActiveLink() {
            const scrollPosition = window.scrollY + navbarHeight + 50; // Offset para mejor detección
            
            // Comprobar si estamos cerca del final de la página para activar el último enlace (contacto)
            const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            
            // Obtener la sección de contacto
            const contactoSection = document.getElementById('contacto');
            const contactoTop = contactoSection ? contactoSection.offsetTop : 0;
            
            // Comprobar si estamos en la sección de contacto
            const isInContacto = contactoSection && 
                (scrollPosition >= contactoTop - 50 || isNearBottom);
            
            if (isInContacto) {
                // Si estamos en la sección de contacto, activar su enlace
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#contacto') {
                        link.classList.add('active');
                    }
                });
                return;
            }

            // Detección normal para otras secciones
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                
                // Saltamos la sección de contacto ya que la tratamos de forma especial
                if (sectionId === 'contacto') return;
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

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
    }
}); 