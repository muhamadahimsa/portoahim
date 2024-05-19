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

const goToTop = document.querySelector('.--top')

const addEventListeners = () => {
    goToTop.addEventListener('click', (e) => {
        e.preventDefault();

        lenis.scrollTo(0, { lerp: 0.05 });
    });
};

const cubeContainers = document.querySelectorAll('.cube-container');
const items = document.querySelectorAll('.item');
const projectNames = ['serene', 'aksara', 'bac', 'bali-wedding'];

function updateCubes(scrollY) {
    const yRotation = (scrollY / 2) % 360;
    const scrollOffset = scrollY * 0.25;

    cubeContainers.forEach((container, containerIndex) => {
        const cubes = container.querySelectorAll('.cube');

        cubes.forEach((cube, cubeIndex) => {
            let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1;
            cube.style.transform = `translateZ(100px) rotateX(${yRotation * rotationDirection}deg)`;
        })
            const frontBackTextPosition = 50 + scrollOffset;
            const topBottomTextPosition = 50 - scrollOffset;

            container.querySelectorAll('.front p, .back p').forEach(p => {
                p.style.left = `${frontBackTextPosition}%`;
            });

            container.querySelectorAll('.top p, .bottom p').forEach(p => {
                p.style.left = `${topBottomTextPosition}%`;
            });
        })
}

function populateText() {
    items.forEach((item, itemIndex) => {
        const projectName = projectNames[itemIndex % projectNames.length];
        const sides = item.querySelectorAll('.side p');
        const textContent = Array(50).fill(projectName).join('&nbsp;&nbsp;&nbsp;&nbsp;');

        sides.forEach(side => {
            side.innerHTML = textContent;
        })
    })
}

window.onload = function() {
    populateText();
    updateCubes(window.scrollY);
}

let ticking = false;

document.addEventListener('scroll', function(e) {
    if(!ticking) {
        window.requestAnimationFrame(function() {
            updateCubes(window.scrollY);
            ticking = false;
        })

        ticking = true;
    }
})

// Background
window.addEventListener('DOMContentLoaded', () => {
    const blockContainer = document.getElementById('blocks');
    const blockSize = 50;
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

// Random Text
// const links = [...document.querySelectorAll('.nav-menu span')];

// const randomLetters = 'qwertyuiopasdfghjklzxcvbnm'.split('');

// class Link {
//     constructor(el, idx){
//         this.el = el;
//         this.idx = idx;
//         this.originalString = el.innerText;
//         this.randomString = this.el.innerText.split('');
//         this.frame = 0;
//         this.addHoverEvent();
//     }

//     addHoverEvent(){
//         this.el.addEventListener('mouseenter', () => {
//             this.animate()
//         })
//         this.el.addEventListener('mouseleave', () => {
//             this.frame = 0;
//         })
//     }

//     animate(){
//         if(this.frame < 30){
//             if(this.frame % 3 == 0){
//                 for(let i = 0; i < this.randomString.length; i++){
//                     this.randomString[i] = randomLetters[Math.floor(Math.random() * randomLetters.length)]
//                 }
//                 this.el.innerText = this.randomString.join('');
//             }
//             this.frame++
//             requestAnimationFrame(this.animate.bind(this));
//         }else{
//             this.el.innerText = this.originalString
//         }
//     }
// }

// links.forEach((link, idx) => {
//     new Link(link, idx)
// })

window.onload = () => {
    initLenis();
    addEventListeners();
};