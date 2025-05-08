// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del carrusel
    const certificacionesGrid = document.querySelector('.certificaciones-grid');
    const prevBtn = document.querySelector('.certificaciones-container .prev-btn');
    const nextBtn = document.querySelector('.certificaciones-container .next-btn');
    
    // Verificar que los elementos del carrusel existen antes de configurar la funcionalidad
    if (certificacionesGrid && prevBtn && nextBtn) {
        // Definir la cantidad de píxeles a desplazar (ancho de la certificación + gap)
        const scrollAmount = 370;

        // Función para desplazar el carrusel
        function scrollCertificaciones(direction) {
            certificacionesGrid.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth' // Hace que el scroll sea suave
            });
        }

        // Agregar event listeners a los botones de navegación
        prevBtn.addEventListener('click', () => scrollCertificaciones(-1));
        nextBtn.addEventListener('click', () => scrollCertificaciones(1));

        // Manejar la visibilidad de los botones según la posición del scroll
        certificacionesGrid.addEventListener('scroll', () => {
            // Verificar si estamos al inicio del scroll
            const isAtStart = certificacionesGrid.scrollLeft === 0;
            // Verificar si estamos al final del scroll
            const isAtEnd = certificacionesGrid.scrollLeft + certificacionesGrid.clientWidth >= certificacionesGrid.scrollWidth - 1;

            // Ocultar/mostrar botón anterior
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            // Ocultar/mostrar botón siguiente
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });

        // Inicializar el estado de los botones al cargar la página
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    }

    // Configuración del modal de video
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Verificar que el modal existe antes de configurar su funcionalidad
    if (videoModal && videoFrame) {
        // Cuando se abre el modal, cargar el video correspondiente
        videoModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const videoSrc = button.getAttribute('data-video');
            videoFrame.src = videoSrc;
        });
        
        // Cuando se cierra el modal, detener el video
        videoModal.addEventListener('hidden.bs.modal', function () {
            videoFrame.src = '';
        });
    }

    // Configuración de la navegación del sitio
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    
    // Verificar que hay enlaces de navegación para configurar
    if (navLinks.length > 0) {
        // Configurar el comportamiento de los enlaces de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Solo procesar enlaces de anclaje internos
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Calcular la posición de destino considerando la altura de la navbar
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - navbarHeight - 20; // 20px de espacio adicional
                        
                        // Scroll suave a la sección
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Obtener todas las secciones con ID para la navegación
        const sections = document.querySelectorAll('section[id]');

        // Función para actualizar el enlace activo según la posición del scroll
        function updateActiveLink() {
            const scrollPosition = window.scrollY + navbarHeight + 50; // Offset para mejor detección
            
            // Verificar si estamos cerca del final de la página
            const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            
            // Obtener la sección de contacto
            const contactoSection = document.getElementById('contacto');
            const contactoTop = contactoSection ? contactoSection.offsetTop : 0;
            
            // Verificar si estamos en la sección de contacto
            const isInContacto = contactoSection && 
                (scrollPosition >= contactoTop - 50 || isNearBottom);
            
            if (isInContacto) {
                // Activar el enlace de contacto si estamos en esa sección
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
                
                // Saltar la sección de contacto ya que la tratamos de forma especial
                if (sectionId === 'contacto') return;
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                // Activar el enlace correspondiente a la sección actual
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