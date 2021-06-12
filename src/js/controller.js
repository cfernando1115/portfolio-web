import 'core-js/stable';
import 'regenerator-runtime/runtime';

(function () {
    //Links animation
    const linkBoxes = document.querySelectorAll('.links-container__link');

    linkBoxes.forEach(linkBox => {
        linkBox.addEventListener('mouseenter', displayLink);
    });

    function displayLink(e) {
        const link = e.target.querySelector('p');
        link.classList.remove('hidden');
        e.target.removeEventListener('mouseenter', displayLink);
    }

    //Links eventlistener
    const linksContainer = document.querySelector('.links-container');
    linksContainer.addEventListener('click', (e) => {
        const clicked = e.target.closest('.links-container__link a');

        if (!clicked) {
            return;
        }

        document.querySelector(clicked.getAttribute('href'))
            .scrollIntoView({ behavior: "smooth" });
    })
})();


