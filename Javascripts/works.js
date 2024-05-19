gsap.registerPlugin(ScrollTrigger);
let lenis;

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

const goToTop = document.querySelector('.work-header')

const addEventListeners = () => {
    goToTop.addEventListener('click', (e) => {
        e.preventDefault();

        lenis.scrollTo(0, { lerp: 0.05 });
    });
};

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
//             square.classList.add('intro');
//             squareContainer.appendChild(square);
//             squares.push(square);
//         }
//     }

//     function animateSquares() {
//         gsap.fromTo(
//             squares, 
//             {
//                 opacity: 1
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
            zIndex: overlayVisible ? -1 : 0,
            delay: overlayVisible ? 1 : 1,
        });

        overlayVisible = !overlayVisible;
    })
})

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
            zIndex: overlayVisible ? -1 : 0,
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

// Img-Hover
const blocks = document.querySelectorAll('.block');
const resetDuration = 300;

blocks.forEach((block) => {
    let timeoutId;

    block.addEventListener('mouseover', () => {
        clearTimeout(timeoutId);
        block.classList.add('active');
        timeoutId = setTimeout(() => {
            block.classList.remove('active');
        }, resetDuration);
    })
})

window.onload = () => {
    initLenis();
    addEventListeners();
}