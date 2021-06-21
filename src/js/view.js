class View {
    linkBoxes = document.querySelectorAll('.links-container__link');
    linksContainer = document.querySelector('.links-container');
    intro = document.querySelector('.intro');
    nav = document.querySelector('.nav');
    projectContainers = document.querySelectorAll('.project-container');

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
}

export default new View();