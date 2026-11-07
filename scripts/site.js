/* Preserve the original anchor navigation and reveal animations without jQuery. */
(() => {
    const navigation = document.querySelector('#mainNav');
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
