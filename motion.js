(() => {
    const hero = document.querySelector('.home-hero');
    const mark = hero?.querySelector('.home-mark');
    if (!hero || !mark) return;

    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    const desktop = matchMedia('(min-width: 850px)');
    const ease = 'cubic-bezier(.22,1,.36,1)';
    const seen = new WeakSet();
    const reveals = new Map();
    let cleanup = () => {};

    function configure() {
        cleanup();
        if (!motion.matches) return;
        const controller = new AbortController();
        const listen = { signal: controller.signal, passive: true };
        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;
        let heroHeight = hero.offsetHeight;
        let lastProgress = -1;

        const draw = () => {
            frame = 0;
            const progress = Math.min(1, Math.max(0, window.scrollY) / Math.max(heroHeight, 1));
            lastProgress = progress;
            mark.style.setProperty('--star-x', pointerX + 'px');
            mark.style.setProperty('--star-y', pointerY + 'px');
            mark.style.setProperty('--star-scroll', progress * 24 + 'px');
            mark.style.setProperty('--star-angle', progress * 10 + pointerX * .32 + 'deg');
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(draw);
        };
        if (desktop.matches) {
            window.addEventListener('scroll', () => {
                if (lastProgress !== 1 || window.scrollY < heroHeight) schedule();
            }, listen);
            window.addEventListener('resize', () => {
                heroHeight = hero.offsetHeight;
                schedule();
            }, listen);
            if (pointer.matches) {
                hero.addEventListener('pointermove', event => {
                    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
                    pointerX = (event.clientX / innerWidth - .5) * 30;
                    pointerY = (event.clientY / innerHeight - .5) * 22;
                    schedule();
                }, listen);
                hero.addEventListener('pointerleave', () => {
                    pointerX = pointerY = 0;
                    schedule();
                }, listen);
            }
            schedule();
        }

        const observer = 'IntersectionObserver' in window && 'animate' in Element.prototype
            ? new IntersectionObserver(entries => {
                if (controller.signal.aborted) return;
                let stagger = 0;
                for (const { target, isIntersecting } of entries) {
                    if (!isIntersecting || seen.has(target)) continue;
                    seen.add(target);
                    observer.unobserve(target);
                    if (target.contains(document.activeElement)) continue;
                    const animation = target.animate([
                        { opacity: .3, translate: '0 16px' },
                        { opacity: 1, translate: '0 0' },
                    ], { duration: 540, delay: Math.min(stagger++, 3) * (desktop.matches ? 65 : 30), easing: ease, fill: 'backwards' });
                    reveals.set(target, animation);
                    animation.onfinish = animation.oncancel = () => reveals.delete(target);
                }
            }, { threshold: .08, rootMargin: '0px 0px -6% 0px' })
            : null;
        document.querySelectorAll('.home-intro, .work-card, .practice-grid article, .home-results, .arch-gallery-stage').forEach(el => {
            if (!seen.has(el)) observer?.observe(el);
        });
        document.addEventListener('focusin', event => {
            for (const [element, animation] of reveals) {
                if (element.contains(event.target)) animation.cancel();
            }
        }, listen);
        cleanup = () => {
            controller.abort();
            observer?.disconnect();
            cancelAnimationFrame(frame);
            for (const animation of reveals.values()) animation.cancel();
            reveals.clear();
            for (const name of ['--star-x', '--star-y', '--star-scroll', '--star-angle']) mark.style.removeProperty(name);
        };
    }
    for (const query of [motion, pointer, desktop]) query.addEventListener('change', configure);
    configure();
})();
