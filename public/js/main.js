$(document).ready(function ($) {
    "use strict";
    

    // Filter functionality
    jQuery(".filters .filter").on("click", function () {
        
        // Remove 'active-filter' class from all filters
        jQuery(".filter").removeClass("active-filter");
        
        // Add 'active-filter' class to the clicked filter
        jQuery(this).addClass("active-filter");

        
        $("#menu-dish").mixItUp({
            selectors: {
                target: ".dish-box-wp",
                filter: ".filter",
            },
            animation: {
                effects: "fade",
                easing: "ease-in-out",
            },
            load: {
                filter: ".all",
            },
        });
    });

    // $(function () {
    //     var filterList = {
    //         init: function () {
    //             $("#menu-dish").mixItUp({
    //                 selectors: {
    //                     target: ".dish-box-wp",
    //                     filter: ".filter",
    //                 },
    //                 animation: {
    //                     effects: "fade",
    //                     easing: "ease-in-out",
    //                 },
    //                 load: {
    //                     filter: ".all, .breakfast, .lunch, .dinner",
    //                 },
    //             });
    //         },
    //     };
    //     filterList.init();
    // });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {

    // default recipes .all
    $("#menu-dish").mixItUp({
        selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
        },
        animation: {
            effects: "fade",
            easing: "ease-in-out",
        },
        load: {
            filter: ".all",
        },
    });

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: dur
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth -2
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }
    }
    
});

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.opacity = "1";
  } else {
    scrollToTopBtn.style.opacity = "0";
  }
};

scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});