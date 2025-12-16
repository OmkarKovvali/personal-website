document.addEventListener("DOMContentLoaded", function() {
    // Function to load HTML components
    function loadComponent(selector, path) {
        const element = document.querySelector(selector);
        if (element) {
            fetch(path)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${path}`);
                    return response.text();
                })
                .then(html => {
                    element.innerHTML = html;
                    
                    // Highlight active link in nav
                    if (selector === '#header-container') {
                        const currentPath = window.location.pathname;
                        const links = element.querySelectorAll('nav a');
                        links.forEach(link => {
                            if (link.getAttribute('href') === currentPath || 
                                (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
                                (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
                                link.style.textDecoration = 'underline';
                            }
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }

    loadComponent("#header-container", "components/header.html");
    loadComponent("#footer-container", "components/footer.html");
});
