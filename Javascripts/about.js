import data from './data.js';

gsap.registerPlugin(ScrollTrigger);
let lenis;

const body = document.querySelector('body');
const intro = document.querySelector('.intro'),
    introCard = intro.querySelectorAll('.intro-card'),
    introMedia = intro.querySelector('.intro-media');

const stickyNav = document.querySelector('.about-header')

const isMobile = window.matchMedia('(max-width: 769px)');

const init = () => {
    gsap.set(body, { overflow: 'hidden' });
    gsap.set(introCard[0], { scale: 0.6 });

    initLenis();
    initScrollHero();
    initScrollMedia();
    addEventListeners();
    initScrollSticky();
}

const initLenis = () => {
    lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.scrollTo(0, { immediate: true });
}

const initScrollHero = () => {
    const tlHero = gsap.timeline({
        defaults: { stagger: 0.08, ease: 'power1.inOut' },
        scrollTrigger: {
            trigger: '.intro-one',
            start: 'top top',
            end: 'center',
            scrub: true,
            pin: true,
            pinSpacing: true,
        },
    });
    tlHero.add('start').to(introCard[0], {
        scale: 1,
    });
};

const initScrollMedia = () => {
    const tlMedia = gsap.timeline({
        scrollTrigger: {
            trigger: intro,
            start: 'center top',
            end: 'bottom bottom',
            scrub: true,
        },
    });
    gsap.set(introMedia, { autoAlpha: 1 });
    tlMedia.to(introMedia, {
        autoAlpha: 0,
    });
}

const initScrollSticky = () => {
    const tlNav = gsap.timeline({
        scrollTrigger: {
            trigger: intro,
            start: 'center top',
            end: 'bottom bottom',
            scrub: true,
        },
    });
    gsap.set(stickyNav, { autoAlpha: 0 });
    tlNav.to(stickyNav, {
        autoAlpha: 1,
    });
}

const goToTop = document.querySelector('.about-header')

const addEventListeners = () => {
    goToTop.addEventListener('click', (e) => {
        e.preventDefault();

        lenis.scrollTo(0, { lerp: 0.05 });
    });
};

function aboutScroll() {
    window.addEventListener('DOMContentLoaded', () => {
        if (!isMobile.matches) {
            init();
        } else {
            initLenis();
            initScrollMedia();
            addEventListeners();
            initScrollSticky();
        }
    });
}

// const view = document.querySelector('.view'),
//     viewWrapper = view.querySelector('.view-wrapper');

// const createHTML = () => {
//     data.forEach((value) => {
//         const getImages = () => {
//             const imageSrc = value.images
//                 .map((image) => `<img class="view-info-media-image" src="${image}" alt="" />`)
//                 .join('');
//             return imageSrc;
//         };

//         const html = `
//             <div class="view-item" data-field="${value.field}">
//                 <div class="view-info">
//                     <div class="view-info-text">
//                         <span>${value.title}</span>
//                         <span>${value.catalog}</span>
//                     </div>
//                     <div class="view-info-media">
//                         ${getImages()}
//                     </div>
//                 </div>
//                 <div class="view-text">
//                     <p class="view-text-brand">${value.brand}</p>
//                     <p class="view-text-title">${value.title}</p>
//                 </div>
//             </div>`
        
//         viewWrapper.insertAdjacentHTML('beforeend', html);

//         if (isMobile.matches) return;
//         getItems();
//     });
// };

// const getItems = () => {
//     const viewItems = viewWrapper.querySelectorAll('.view-item');

//     viewItems.forEach((item) => {
//         const text = item.querySelectorAll('.view-info-text > span'),
//             media = item.querySelectorAll('.view-info-media > img');

//         gsap.set([text, media], { display: 'none' });
//         gsap.defaults({ duration: 0.32, ease: 'none', stagger: 0.048 });

//         item.addEventListener('mouseenter', () => {
//             gsap.to([text, media], { display: 'block', overwrite: true });
//         });
//         item.addEventListener('mouseleave', () => {
//             gsap.to([text, media], { display: 'none' });
//         });
//     });
// };

// Intro
function transition() {
    var tl = gsap.timeline()

    tl.to('.transition', {
        top: '-100%',
        delay: .5,
        duration: 1.4,
        ease: 'expo.out',
    })
    tl.to('.transition', {
        delay: 1.9,
        display: 'none',
        opacity: 0
    },)
}

transition();
// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.content-overlay');
//     gsap.set(menu, { opacity: 0 })

//     const squareContainer = document.getElementById('intro-container');
//     const squareSize = 100;
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;
//     const numCols = Math.ceil(screenWidth / squareSize);
//     const numRows = Math.ceil(screenHeight / squareSize);

//     const numSquares = numCols * numRows;

//     squareContainer.style.width = `${numCols * squareSize}px`;
//     squareContainer.style.height = `${numRows * squareSize}px`;

//     let squares = [];

//     function createSquares() {
//         for (let i = 0; i < numSquares; i++) {
//             const square = document.createElement('div');
//             square.classList.add('intro-square');
//             squareContainer.appendChild(square);
//             squares.push(square);
//         }
//     }

//     function animateSquares() {
//         gsap.fromTo(
//             squares, 
//             {
//                 opacity: 1,
//             }, 
//             {
//                 opacity: 1,
//                 delay: 0.5,
//                 duration: 0.0005,
//                 stagger: {
//                     each: 0.004,
//                     from: 'random',
//                 },
//             }
//         );

//         gsap.to(squares, {
//             opacity: 0,
//             delay: 1.5,
//             duration: 0.0005,
//             stagger: {
//                 each: 0.004,
//                 from: 'random'
//             },
//         });
//     }

//     let overlayVisible = false;
//     createSquares();
//     animateSquares();
// })

// Contact
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.contact-overlay');
    const navLinks = document.querySelectorAll('.nav-pages a')
    gsap.set(menu, { opacity: 0 })

    const squareContainer = document.getElementById('contact-square');
    const squareSize = 100;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / squareSize);
    const numRows = Math.ceil(screenHeight / squareSize);

    const numSquares = numCols * numRows;

    squareContainer.style.width = `${numCols * squareSize}px`;
    squareContainer.style.height = `${numRows * squareSize}px`;

    let squares = [];

    function createSquares() {
        for (let i = 0; i < numSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('c-square');
            squareContainer.appendChild(square);
            squares.push(square);
        }
    }

    function animateSquares() {
        gsap.fromTo(
            squares, 
            {
                opacity: 0
            }, 
            {
                opacity: 1,
                delay: 0.5,
                duration: 0.0005,
                stagger: {
                    each: 0.004,
                    from: 'random',
                },
            }
        );

        gsap.to(squares, {
            opacity: 0,
            delay: 1.5,
            duration: 0.0005,
            stagger: {
                each: 0.004,
                from: 'random'
            },
        });
    }

    let overlayVisible = false;

    document.getElementById('contact').addEventListener('click', () => {
        squareContainer.innerHTML = "";
        squares = [];
        createSquares();
        animateSquares();

        gsap.to(menu, 0.025, {
            opacity: overlayVisible ? 0 : 1,
            visibility: overlayVisible ? 'hidden' : 'visible',
            delay: 1.15,
        })

        gsap.to(menu, {
            zIndex: overlayVisible ? -1 : 30,
            delay: overlayVisible ? 1 : 1,
        });

        gsap.to(navLinks, {
            display: overlayVisible ? 'block' : 'none',
            delay: 1,
        })

        gsap.to('.contact', {
            opacity: overlayVisible ? 1 : 0,
            delay: 1,
        })

        gsap.to('.close', {
            opacity: overlayVisible ? 0 : 1,
            delay: 1,
        })

        overlayVisible = !overlayVisible;
    })
})

// Menu
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.content-overlay');
    gsap.set(menu, { opacity: 0 })

    const squareContainer = document.getElementById('square-container');
    const squareSize = 100;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / squareSize);
    const numRows = Math.ceil(screenHeight / squareSize);

    const numSquares = numCols * numRows;

    squareContainer.style.width = `${numCols * squareSize}px`;
    squareContainer.style.height = `${numRows * squareSize}px`;

    let squares = [];

    function createSquares() {
        for (let i = 0; i < numSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            squareContainer.appendChild(square);
            squares.push(square);
        }
    }

    function animateSquares() {
        gsap.fromTo(
            squares, 
            {
                opacity: 0
            }, 
            {
                opacity: 1,
                delay: 0.5,
                duration: 0.0005,
                stagger: {
                    each: 0.004,
                    from: 'random',
                },
            }
        );

        gsap.to(squares, {
            opacity: 0,
            delay: 1.5,
            duration: 0.0005,
            stagger: {
                each: 0.004,
                from: 'random'
            },
        });
    }

    let overlayVisible = false;

    document.getElementById('toggle').addEventListener('click', () => {
        squareContainer.innerHTML = "";
        squares = [];
        createSquares();
        animateSquares();

        gsap.to(menu, 0.025, {
            opacity: overlayVisible ? 0 : 1,
            visibility: overlayVisible ? 'hidden' : 'visible',
            delay: 1.15,
        })

        gsap.to(menu, {
            zIndex: overlayVisible ? -1 : 30,
            delay: overlayVisible ? 1 : 1,
        });

        overlayVisible = !overlayVisible;
    })
})

aboutScroll();