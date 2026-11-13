(() => {
    const stack = document.querySelector('[data-library-stack]');
    const motion = window.matchMedia('(min-width: 820px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    if (!stack || !CSS.supports('overflow', 'clip')) return;

    const chapters = [...stack.querySelectorAll('.library-anchor')].map(anchor => ({
        anchor,
        section: anchor.nextElementSibling,
        panel: anchor.nextElementSibling.firstElementChild,
        angle: null
    }));
    let frame = 0;

    // Read natural anchor positions before writing transforms to the sticky panels.
    function draw() {
        frame = 0;
        const height = window.innerHeight;
        const remaining = chapters.slice(1).map(({ anchor }) => {
            const top = anchor.getBoundingClientRect().top;
            return Math.min(1, Math.max(0, (top - height * .12) / (height * .88)));
        });
        chapters.slice(1).forEach((chapter, index) => {
            const angle = Math.round(remaining[index] ** 1.35 * 2600) / 100;
            if (chapter.angle === angle) return;
            chapter.panel.style.setProperty('--page-angle', `${angle}deg`);
            chapter.angle = angle;
        });
    }

    function schedule() {
        if (!frame) frame = requestAnimationFrame(draw);
    }

    function configure() {
        stack.classList.toggle('has-page-turn', motion.matches);
        const fits = motion.matches && chapters.every(({ section }) => section.offsetHeight <= window.innerHeight + 1);
        stack.classList.toggle('has-page-turn', fits);
        window.removeEventListener('scroll', schedule);
        if (fits) {
            window.addEventListener('scroll', schedule, { passive: true });
            schedule();
        } else if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
        }
    }

    // A tab stop on a covered page must bring that page back into view.
    stack.addEventListener('focusin', event => {
        if (!stack.classList.contains('has-page-turn') || !event.target.matches('a:focus-visible')) return;
        const chapter = chapters.find(({ section }) => section.contains(event.target));
        if (!chapter) return;
        const { left, top, width, height } = event.target.getBoundingClientRect();
        const hit = document.elementFromPoint(left + width / 2, top + height / 2);
        if (!event.target.contains(hit) || chapter.angle > 0) {
            chapter.anchor.scrollIntoView({ behavior: 'instant' });
            schedule();
        }
    });

    motion.addEventListener('change', configure);
    window.addEventListener('resize', configure, { passive: true });
    configure();
})();
