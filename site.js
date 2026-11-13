(() => {
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    const en = new URLSearchParams(location.search).get('lang') === 'en';
    document.querySelectorAll('a[data-localized]').forEach(link => {
        const url = new URL(link.href);
        if (en && url.origin === location.origin) url.searchParams.set('lang', 'en');
        link.href = url.href;
    });

    // Keep existing deep links usable after grouping related material in disclosures.
    const reveal = hash => {
        let id;
        try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
        const target = document.getElementById(id);
        if (!target) return null;
        let container = target.closest('details');
        while (container) {
            container.open = true;
            container = container.parentElement.closest('details');
        }
        return target;
    };
    const initialTarget = reveal(location.hash);
    if (initialTarget) requestAnimationFrame(() => initialTarget.scrollIntoView({ behavior: 'instant' }));
    window.addEventListener('hashchange', () => {
        const target = reveal(location.hash);
        if (target) target.scrollIntoView();
    });
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (link) reveal(link.hash);
    });
    const group = document.querySelector('.project-filters');
    if (!group) return;
    group.hidden = false;
    const cards = [...document.querySelectorAll('[data-project-category]')];
    const empty = document.getElementById('project-filter-empty');
    const status = document.getElementById('project-filter-status');
    group.addEventListener('click', event => {
        const button = event.target.closest('button[data-filter]');
        if (!button) return;
        group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        let count = 0;
        cards.forEach(card => {
            const visible = button.dataset.filter === 'all' || card.dataset.projectCategory.split(' ').includes(button.dataset.filter);
            card.hidden = !visible;
            if (visible) count++;
        });
        empty.hidden = count > 0;
        status.textContent = en ? count + ' projects shown' : count + ' projetos exibidos';
    });
})();
