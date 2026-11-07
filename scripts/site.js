/* Preserve the original anchor navigation and reveal animations without jQuery. */
(() => {
    const navigation = document.querySelector('#mainNav');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame;
    let previousScrollBehavior;

    const stopScrolling = () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = undefined;
        if (previousScrollBehavior !== undefined) {
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
            previousScrollBehavior = undefined;
        }
    };

    document.querySelectorAll('#mainNav a[href^="#"], footer a[href="#myPage"]').forEach(link => {
        link.addEventListener('click', event => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const target = document.getElementById(link.hash.slice(1));
            if (!target) return;
            event.preventDefault();
            stopScrolling();

            const openMenu = navigation?.querySelector('.navbar-collapse.show');
            if (openMenu && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(openMenu, { toggle: false }).hide();
            }

            const startY = window.scrollY;
            const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
            const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const endY = Math.min(maxY, Math.max(0, startY + target.getBoundingClientRect().top - offset));
            if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);

            // Disable native smoothing while driving the original 900ms animation.
            previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            if (motionPreference.matches) {
                window.scrollTo(0, endY);
                stopScrolling();
                return;
            }
            const startedAt = performance.now();
            const step = now => {
                const progress = Math.min((now - startedAt) / 900, 1);
                const eased = (1 - Math.cos(Math.PI * progress)) / 2;
                window.scrollTo(0, startY + (endY - startY) * eased);
                if (progress < 1) scrollFrame = window.requestAnimationFrame(step);
                else stopScrolling();
            };
            scrollFrame = window.requestAnimationFrame(step);
        });
    });
    ['wheel', 'touchstart', 'pointerdown'].forEach(type => {
        window.addEventListener(type, stopScrolling, { passive: true });
    });
    window.addEventListener('keydown', event => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'].includes(event.key)) stopScrolling();
    });
    window.addEventListener('popstate', stopScrolling);
    let scrollSpy;
    let resizeFrame;

    const updateScrollSpy = () => {
        if (!navigation || !window.bootstrap || document.body.classList.contains('modal-open')) return;
        // Pixel margins keep the tracking band valid on wide, short viewports.
        const top = 60;
        const bottom = Math.max(0, window.innerHeight - top - 100);
        if (scrollSpy) scrollSpy.dispose();
        scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: navigation,
            rootMargin: `-${top}px 0px -${bottom}px`,
            threshold: [0]
        });
    };
    updateScrollSpy();
    // A modal temporarily locks body scrolling; rebuild only after it unlocks.
    document.addEventListener('hidden.bs.modal', updateScrollSpy);
    window.addEventListener('resize', () => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(updateScrollSpy);
    });

    const elements = document.querySelectorAll('.slideanim');
    const reducedMotion = motionPreference.matches;
    if (!('IntersectionObserver' in window) || reducedMotion) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px 100px 0px' });

    elements.forEach(element => {
        element.classList.add('reveal-pending');
        observer.observe(element);
    });
})();
