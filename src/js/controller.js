import 'core-js/stable';
import 'regenerator-runtime/runtime';

import view from './view.js';

(function () {

    //Links animation
    view.addLinkboxesListener();

    //Links eventlistener
    view.addLinksContainerListener();

    //Sticky nav
    view.addStickyNav();

    const projectContainers = document.querySelectorAll('.project-container');

    const revealProject = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.remove('project-container--hidden');
        observer.unobserve(entry.target);
    }

    const projectObserver = new IntersectionObserver(revealProject, {
        root: null,
        threshold: 0.15
    });

    projectContainers.forEach(project => {
        projectObserver.observe(project);
        project.classList.add('project-container--hidden');
    })

})();


