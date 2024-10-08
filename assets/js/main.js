(function ($) {
    "use strict";

    $(window).on('load', function(){
        //===== Prealoder
        $("#preloader").delay(400).fadeOut();

        if (window.matchMedia('(max-width: 991.98px)').matches) {
            $('.dropdown_wrap>a').click(function(e) {
                e.preventDefault();
                var $this = $(this);
                // $('.drop_box>a').removeClass('open');
                // $this.toggleClass('open');

                if ($this.next().hasClass('show')) {
                    $this.next().removeClass('show');
                    $this.next().slideUp(350);
                    $('.drop_box>a').removeClass('open');
                    
                } else {
                    $this.parent().parent().find('ul').removeClass('show');
                    $this.parent().parent().find('ul').slideUp(350);
                    $this.next().toggleClass('show');
                    $this.next().slideToggle(350);

                }
            }); 
        }
    });

    $(document).ready(function () {
        //05. sticky header
        function sticky_header(){
            var wind = $(window);
            var sticky = $('header');
            wind.on('scroll', function () {
                var scroll = wind.scrollTop();
                if (scroll < 100) {
                    sticky.removeClass('sticky');
                } else {
                    sticky.addClass('sticky');
                }
            });
        }
        sticky_header();
        //===== Back to top

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 600) {
                $('.back-to-top').fadeIn(200)
            } else {
                $('.back-to-top').fadeOut(200)
            }
        });

        //Animate the scroll to yop
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 900);
        });        

        // Hamburger-menu
        $('.hamburger-menu').on('click', function () {
            $('.hamburger-menu .line-top, .menu').toggleClass('current');
            $('.hamburger-menu .line-center').toggleClass('current');
            $('.hamburger-menu .line-bottom').toggleClass('current');
        });

        $('.dropdown-menu').on('click', function(event){
            event.stopPropagation();
        });

        $('.proje_img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },        
        }); 
        // Slider Initialize
        $('.owl-carousel.slider1').owlCarousel({
            loop: true,
            margin: 40,
            // autoplay: true,
            autoplayTimeout: 1500,
            autoplayHoverPause: true,
            dots: true,
            nav: true,
            responsive:{
                0:{
                    items: 1,
                    dots: true,
                },
                576:{
                    items: 2,
                    dots: true,
                },
                992:{
                    items: 3
                },
                1200:{
                    items: 3
                },
            }
        });  
       

        $(document).ready(function() {

            var sync1 = $("#sync1");
            var sync2 = $("#sync2");
            var slidesPerPage = 4;
            var syncedSecondary = true;

            sync1.owlCarousel({
                items: 1,
                slideSpeed: 2000,
                nav: false,
                autoplay: false, 
                dots: false,
                loop: true,
                responsiveRefreshRate: 200,
            }).on('changed.owl.carousel', syncPosition);

          sync2.on('initialized.owl.carousel', function() {
            sync2.find(".owl-item.center").eq(0).addClass("current");
          })
          
          /* centered items */
          sync2.find('.owl-item').each(function(index) {
            var item = $(this).attr('data-position', index);
          })
          
          sync2.owlCarousel({
            items: 7,
            dots: false,
            nav: true,
            loop: true,
            center: true,
            smartSpeed: 200,
            slideSpeed: 1000,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100,
            margin: 40,
            navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
            responsive:{
                0:{
                    items: 3,
                },
                576:{
                    items: 4,
                },
                992:{
                    items: 7
                },
            }

          }).on('click', '.owl-item', function(e) {
                var carouselSync1 = $('#sync1').data('owl.carousel');
                e.preventDefault();
            
                var current = $(this).index();
                carouselSync1.to(carouselSync1.relative(current));
                
                /* centered items */
                sync2.trigger('to.owl-carousel', $(this).data('position'));
              });

            function syncPosition(el) {
               
                var current = el.item.index;
              
                sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
                var onscreen = sync2.find('.owl-item.active').length - 1;
                var start = sync2.find('.owl-item.active').first().index();
                var end = sync2.find('.owl-item.active').last().index();
              
                console.log('currentSync1: ' + current)
              
                if (current > end) {
                  sync2.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                  sync2.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
              if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
              }
            }
        });       
    });

})(jQuery);