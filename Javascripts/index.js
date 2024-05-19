gsap.registerPlugin(ScrollTrigger);
let lenis;

const galleryRows = document.querySelectorAll('.gallery-row');
const goToTop = document.querySelector('.ahim-header')

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
    initScrollTrigger();
}

const initScrollTrigger = () => {
    const hero = document.querySelector('.hero');
    const images = document.querySelectorAll('.gallery-row-media-image');

    gsap.utils.toArray(images).forEach((image) => {
        gsap.set(image, { scale: 1.2 });

        const imageRect = image.getBoundingClientRect();
        const heightDifference = imageRect.height - image.parentElement.offsetHeight;

        gsap.fromTo(
            image, 
            {
                y: -heightDifference,
            },
            {
                scrollTrigger: {
                    trigger: image,
                    start: 'top center+=30%',
                    end: 'bottom+=10% top',
                    scrub: true,
                },
                y: heightDifference,
                ease: 'none'
            }
        );

        // const tlHero = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: hero,
        //         start: 'top top',
        //         end: 'center top',
        //         scrub: true,
        //     },
        // });
        // tlHero.to(hero, {
        //     autoAlpha: 0,
        // })
    })
}

const addEventListeners = () => {
    // navAnchors.forEach((anchor, index) => {
    //     anchor.addEventListener('click', (e) => {
    //         e.preventDefault();

    //         lenis.scrollTo(galleryRows[index], {
    //             offset: -20,
    //             lerp: 0.1,
    //         });
    //     });
    // });

    goToTop.addEventListener('click', (e) => {
        e.preventDefault();

        lenis.scrollTo(0, { lerp: 0.05 });
    });
};

// Background
window.addEventListener('DOMContentLoaded', () => {
    const blockContainer = document.getElementById('blocks');
    const blockSize = 100;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / blockSize);
    const numRows = Math.ceil(screenHeight / blockSize);
    const numBlocks = numCols * numRows;

    function createBlocks() {
        for (let i = 0; i < numBlocks; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.index = i;
            block.addEventListener('mousemove', highlightRandomNeighbors);
            blockContainer.appendChild(block);
        }
    }

    function highlightRandomNeighbors() {
        const index = parseInt(this.dataset.index);
        const neighbors = [
            index - 1,
            index + 1,
            index - numCols,
            index + numCols,
            index - numCols - 1,
            index - numCols + 1,
            index + numCols - 1,
            index + numCols + 1,
        ].filter(
            (i) =>
                i >= 0 &&
                i < numBlocks &&
                Math.abs((i % numCols) - (index % numCols)) <= 1
        );

        this.classList.add('highlight');
        setTimeout(() => {
            this.classList.remove('highlight');
        }, 500);

        shuffleArray(neighbors)
        .slice(0, 1)
        .forEach((nIndex) => {
            const neighbor = blockContainer.children[nIndex];
            if (neighbor) {
                neighbor.classList.add('highlight');
                setTimeout(() => {
                    neighbor.classList.remove('highlight');
                }, 500)
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBlocks();
});



// Intro
function transition() {
    var tl = gsap.timeline()

    tl.to('.intro', {
        top: '-100%',
        delay: .5,
        duration: 1.4,
        ease: 'expo.out',
    })
    tl.to('.intro', {
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
//                 delay: 1,
//                 duration: 0.0005,
//                 stagger: {
//                     each: 0.004,
//                     from: 'random',
//                 },
//             }
//         );

//         gsap.to(squares, {
//             opacity: 0,
//             delay: 2,
//             duration: 0.0005,
//             stagger: {
//                 each: 0.004,
//                 from: 'random'
//             },
//         });

//         gsap.to('.intro-title', {
//             opacity: 0,
//             zIndex: 0,
//             duration: 1,
//             delay: 1.25,
//         })
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

// Img-Hover
const blocks = document.querySelectorAll('.block-img');
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
};