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
        window.ScrollTrigger?.refresh();
    });
})();
