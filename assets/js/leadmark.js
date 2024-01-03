/*!
=========================================================
* LeadMark Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    })
})

(function () {
    'use strict';
  
    // A class for building sliders from it
    class Slider {
      constructor(id, mediaQueries) {
        // Get HTML elements
        this.slider = document.querySelector(`#${id}`);
        this.sliderList = this.slider.querySelector('.slider-list');
        this.sliderItems = this.slider.querySelectorAll('.slider-item');
        this.sliderNext = this.slider.querySelector('.slider-arrow-next');
        this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');
  
        // Get media queries
        this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
        mediaQueries.forEach((mediaQuery) => {
          this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
        });
  
        // Define global variables
        this.numberOfVisibleItems = null;
        this.currentItemIndex = null;
        this.sliderItemsLength = this.sliderItems.length;
        this.mediaQueryLength = this.mediaQueryList.length;
  
        // Add event listener: to call the run function again when screen resized
        this.mediaQueryList.forEach((mediaQuery) => {
          mediaQuery.addEventListener('change', () => {
            this.run();
          });
        });
  
        // Add event listener: to go to next slide
        this.sliderNext.addEventListener('click', () => {
          if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
            this.currentItemIndex++;
            this.shiftSlides();
          }
        });
  
        // Add event listener: to go to previous slide
        this.sliderPrev.addEventListener('click', () => {
          if (this.currentItemIndex > 0) {
            this.currentItemIndex--;
            this.shiftSlides();
          }
        });
  
        // Disable focus on all slides links
        this.sliderItems.forEach((item) => {
          const elements = item.querySelectorAll('a');
          elements.forEach((element) => {
            element.tabIndex = '-1';
          });
        });
  
        // Add event listener: to scroll down to slider when previous arrow focused
        this.sliderPrev.addEventListener('focusin', () => {
          this.slider.scrollIntoView();
        });
  
        // Add event listener: to scroll down to slider when next arrow focused
        this.sliderNext.addEventListener('focusin', () => {
          this.slider.scrollIntoView();
        });
      }
  
      // Run the slider
      run() {
        let index = this.mediaQueryLength - 1;
        while (index >= 0) {
          if (this.mediaQueryList[index].matches) {
            // Set number of visible slides
            this.numberOfVisibleItems = index + 1;
  
            // Reset the slider
            this.currentItemIndex = 0;
            this.sliderList.style.transform = 'translateX(0%)';
  
            // Set slider list width
            this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;
  
            // Set slides width
            this.sliderItems.forEach((item) => {
              item.style.width = `${100 / this.numberOfVisibleItems}%`;
            });
  
            // Exit the loop
            break;
          }
          index--;
        }
      }
  
      // A function to shift slides left and right
      shiftSlides() {
        this.sliderList.style.transform = `translateX(-${(100 / this.sliderItemsLength) * this.currentItemIndex}%)`;
      }
    }
  
    /* 
    Note about creating new slider:
    First parameter is the id of the HTML slider-container element of each slider.
    Second parameter is an array of the media queries (breaking points) where the number of slides increases.
    */
  
    // Create a new slider and run it
    new Slider('new-products', [576, 992]).run();
  
    // Create a new slider and run it
    new Slider('featured-products', [576, 768, 992]).run();
  })();