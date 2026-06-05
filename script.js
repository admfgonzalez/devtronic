const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(l => l.style.animation = '');
            }
        });
    });
}

// Header background change on scroll
const headerScroll = () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.padding = '5px 0';
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.padding = '0';
        }
    });
}

// Form Submission handling (AJAX)
const handleForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que se abra una nueva página

        const formData = new FormData(form);
        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.innerText;

        try {
            // Cambio visual de estado
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Necesario para Google Apps Script si no configuramos CORS avanzado
            });

            // Con no-cors no podemos leer la respuesta, pero si no hay error asumimos éxito
            alert('¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.');
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Lo sentimos, hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

const app = () => {
    navSlide();
    headerScroll();
    handleForm();
}

app();
