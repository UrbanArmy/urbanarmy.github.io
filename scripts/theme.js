(function () {
    const STORAGE_KEY = 'ua-theme';

    function getPreferred() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        document.querySelectorAll('.theme-toggle').forEach(btn => {
            const icon = btn.querySelector('.theme-toggle-icon');
            const label = btn.querySelector('.theme-toggle-label');
            if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
        });
    }

    // Apply immediately (before DOM ready) to prevent flash
    apply(getPreferred());

    document.addEventListener('DOMContentLoaded', function () {
        // Re-apply to update button labels once DOM is ready
        apply(getPreferred());

        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('data-theme') || 'dark';
                apply(current === 'dark' ? 'light' : 'dark');
            });
        });

        // Fade-in observer
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
    });
})();
