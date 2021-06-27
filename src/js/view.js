class View {
    nav = document.querySelector('.nav');
    linkBoxes = document.querySelectorAll('.links-container__link');
    linksContainer = document.querySelector('.links-container');
    intro = document.querySelector('.intro');
    nav = document.querySelector('.nav');
    projectContainers = document.querySelectorAll('.project-container');

    addNavLinksListener() {
        this.nav.addEventListener('click', (e) => {
            e.preventDefault();
            const clicked = e.target.closest('.nav__links-list a');
    
            if (!clicked) {
                return;
            }
    
            document.querySelector(clicked.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        })
    }

    addLinkboxesListener() {
        this.linkBoxes.forEach(linkBox => {
            linkBox.addEventListener('mouseenter', this.displayLink);
        });
    }

    addLinksContainerListener() {
        this.linksContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const clicked = e.target.closest('.links-container__link a');
    
            if (!clicked) {
                return;
            }
    
            document.querySelector(clicked.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        })
    }

    addStickyNav() {  
        const navHeight = (this.nav.getBoundingClientRect().height);
        const introObserver = new IntersectionObserver(this.stickyNav.bind(this), {
            root: null,
            threshold: 0,
            rootMargin: `-${navHeight}px`
        });

        introObserver.observe(this.intro);
    }

    addScrollAnimation() {    
        const projectObserver = new IntersectionObserver(this.revealProject.bind(this), {
            root: null,
            threshold: 0.15
        });

        this.projectContainers.forEach(project => {
            projectObserver.observe(project);
            project.classList.add('project-container--hidden');
        })
    }

    sliderInit() {
        const crumbSlider = document.querySelector('.slider__container--crumb');
        const salesSlider = document.querySelector('.slider__container--sales');
        const csharpSlider = document.querySelector('.slider__container--csharp');
        const booksmartSlider = document.querySelector('.slider__container--booksmart');
        const triviaSlider = document.querySelector('.slider__container--trivia');
    
        [crumbSlider, salesSlider, csharpSlider, booksmartSlider, triviaSlider].forEach((parentContainer) => this.slider(parentContainer));
    }
    
    displayLink(e) {
        const link = e.target.querySelector('.links-container__desc');
        link.classList.remove('hidden');
        e.target.removeEventListener('mouseenter', this.displayLink);
    }

    stickyNav(entries) {
        const [entry] = entries;

        entry.isIntersecting
            ? this.nav.classList.remove('sticky')
            : this.nav.classList.add('sticky');
    }
 
    revealProject(entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.remove('project-container--hidden');
        observer.unobserve(entry.target);
    }

    slider (parentContainer) {
        const slides = parentContainer.querySelectorAll('.slide');
        const btnLeft = parentContainer.querySelector('.arrow__btn--left');
        const btnRight = parentContainer.querySelector('.arrow__btn--right');

        let curSlide = 0;

        const goToSlide = function (slide = 0) {
            slides.forEach((s, i) => {
                s.style.transform = `translateX(${100 * (i - slide)}%)`;
            });
            setTimeout(() => {
                slides.forEach((s) => s.classList.remove('hidden'));
            }, 2000);
        }

        const nextSlide = function () {
            curSlide === slides.length - 1
                ? curSlide = 0
                : curSlide++;
            
            goToSlide(curSlide);
        }

        const prevSlide = function () {
            curSlide === 0
                ? curSlide = slides.length -1
                : curSlide--;
            
            goToSlide(curSlide);
        }

        const init = function () {
            goToSlide();
        }

        init();

        btnRight.addEventListener('click', nextSlide);
        btnLeft.addEventListener('click', prevSlide);
    }
}

export default new View();