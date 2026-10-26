
(function () {
    var root = document.documentElement;          // the <html> element
    var menuBtn = document.getElementById('menu-btn');
    var themeBtn = document.getElementById('theme-btn');
    var backdrop = document.getElementById('backdrop');

    function save(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
    }

    function isMobile() {
        return window.innerWidth <= 800;
    }

    /* ---------- Sidebar ---------- */
    function setSidebar(open) {
        root.classList.toggle('sidebar-closed', !open);
        menuBtn.setAttribute('aria-expanded', String(open));

        if (!isMobile()) save('sidebar', open ? 'open' : 'closed');
    }

    menuBtn.setAttribute('aria-expanded', String(!root.classList.contains('sidebar-closed')));

    menuBtn.addEventListener('click', function () {
        setSidebar(root.classList.contains('sidebar-closed')); // closed -> open, open -> closed
    });

    backdrop.addEventListener('click', function () { setSidebar(false); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMobile()) setSidebar(false);
    });

    /* Dark mode */
    themeBtn.addEventListener('click', function () {
        var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;              
        save('theme', next);
        window.dispatchEvent(new Event('themechange')); 
    });

    window.addEventListener('load', function () {
        root.classList.add('ready');
    });
})();
