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

    //Scroll animation
    view.addScrollAnimation();

    //Sliders
    view.sliderInit();

})();


