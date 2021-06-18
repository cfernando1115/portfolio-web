import 'core-js/stable';
import 'regenerator-runtime/runtime';

(function () {
    const linkBoxes = document.querySelectorAll('.links-container__link');
    const linksContainer = document.querySelector('.links-container');
    const intro = document.querySelector('.intro');
    const nav = document.querySelector('.nav');

    //Links animation
    linkBoxes.forEach(linkBox => {
        linkBox.addEventListener('mouseenter', displayLink);
    });

    function displayLink(e) {
        const link = e.target.querySelector('p');
        link.classList.remove('hidden');
        e.target.removeEventListener('mouseenter', displayLink);
    }

    //Links eventlistener
    linksContainer.addEventListener('click', (e) => {
        const clicked = e.target.closest('.links-container__link a');

        if (!clicked) {
            return;
        }

        document.querySelector(clicked.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    })

    //Sticky nav
    const stickyNav = function (entries) {
        const [entry] = entries;

        entry.isIntersecting
            ? nav.classList.remove('sticky')
            : nav.classList.add('sticky');
    }

    const navHeight = (nav.getBoundingClientRect().height);
    const introObserver = new IntersectionObserver(stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    });

    introObserver.observe(intro);
})();


