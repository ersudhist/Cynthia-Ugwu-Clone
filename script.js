var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
// Function to animate elements related to product designer
function productDesigner() {
    var t1 = gsap.timeline();
    // Animating navigation bar and text elements
    t1.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
}

// Function to skew the circle based on mouse movement
function circleskew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    // Event listener for mouse movement
    window.addEventListener("mousemove", function(details) {
        clearTimeout(timeout);
        // Calculating differences in mouse movement
        xdiff = details.clientX - xprev;
        ydiff = details.clientY - yprev;
        // console.log(xdiff, ydiff);
        
        // Scaling the circle based on mouse movement
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
        // console.log(xscale, yscale);

        xprev = details.clientX;
        yprev = details.clientY;
        
        // Updating the circle position and scale
        circleMouseFollower(xscale, yscale)
         
        // Set timeout to reset circle position if mouse movement stops
        timeout = this.setTimeout(function () {
           document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(details) {
        this.document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Function to handle mouse interaction with image elements
function handleImageHover() {
    const element = document.querySelectorAll(".elem");
    // console.log(document.querySelectorAll(".elem"))
    element.forEach(function(elem) {
        var rotate = 0;
        var difference = 0;
      
        // Mouse leave event to hide image
        elem.addEventListener("mouseleave", function (details) {
          gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
          });
        });
        
        // Mouse move event to show and move image
        elem.addEventListener("mousemove", function(details) {
           var diff = details.clientY - elem.getBoundingClientRect().top;
           difference = details.clientX - rotate;
           rotate = details.clientX;
           gsap.to(elem.querySelector("img"), {
             opacity: 1,
             ease: Power3,
             top: diff,
             left: details.clientX,
             rotate: gsap.utils.clamp(-20, 20, difference * 0.5),
            });
        });
    });
}
// Calling functions to initialize interactions
circleskew()
circleMouseFollower();
productDesigner();
handleImageHover();


