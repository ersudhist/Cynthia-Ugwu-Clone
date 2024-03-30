// smooth scrolling
// attach loco scroll CSS
// attach Locomotive scroll min JS
// some code from locomotive github for js
// gsap
// attach gsap cdn script tag


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

// jab mouse move ho to hum log skew kar paye aur maximum skew
// and minimum skew define kar paye, jab mouse move ho to chapta
// ki value badhe, aur jab mouse chalna band ho jaye to chapta hata lo

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

// teeno element ko select karo, uske baad teeno par ek mousemove lagao, 
// jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai 
// mouse ki x and y position pata karo, ab mouse ki x y position ke badle us 
// image ko show karo and us image ko move karo, move karte waqt rotate karo, 
// and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

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
            //console.log(details.clientX, details.clientY);
           // console.log(elem.getBoundingClientRect()); => Top se mouse ka distance
           //console.log(details.clientY - elem.getBoundingClientRect().top); => elem se mouse ka distance
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


