document.addEventListener("DOMContentLoaded", function() {

    // --- Function to load HTML components ---
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
                // After loading header, re-attach mobile menu logic
                if (selector === '#header-placeholder') {
                    attachMobileMenuLogic();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // --- Load Header and Footer ---
    loadComponent('#header-placeholder', '_header.html');
    loadComponent('#footer-placeholder', '_footer.html');

    // --- Mobile menu logic ---
    const attachMobileMenuLogic = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            // Close mobile menu when a link is clicked
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    };

    // --- Intersection Observer for animations on the homepage ---
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });
    }
});
