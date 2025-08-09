/* JavaScript Document */
jQuery(document).ready(function() {
    'use strict';

	/* image-carousel function by = owl.carousel.js */
	jQuery('.trending-stories').owlCarousel({
		loop:true,
		center:true,
		margin:40,
		nav:true,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
				margin:20
			},			
			1024:{
				items:3
			},
			1200:{
				items:3
			},
			1400:{
				items:3
			}
		}
	})
	
	// service-silder-swiper
	if(jQuery('.main-swiper').length > 0){
		var swiper = new Swiper(".main-swiper-thumb", {
			loop: true,
			spaceBetween: 25,
			slidesPerView: "auto",
			freeMode: true,
			center:true,
			watchSlidesProgress: true,
			//autoplay: {
			//   delay: 1500,
			//},
			breakpoints: {
				0: {
					spaceBetween: 10,
				},
				768: {
					spaceBetween: 25,
				},
			},
		});
		var swiper2 = new Swiper(".main-swiper", {
			loop: true,
			effect: "fade",
			speed: 1000,
			parallax: true,
			//autoplay: {
			//   delay: 1500,
			//},
			pagination: {
				el: ".main-swiper1-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
				},
			},
			thumbs: {
			  swiper: swiper,
			},
		});
	}
	
	// service-silder-swiper
	if(jQuery('.main-swiper2').length > 0){
		var swiper = new Swiper(".main-swiper2-thumb", {
			loop: true,
			spaceBetween: 25,
			slidesPerView: "auto",
			freeMode: true,
			center:true,
			watchSlidesProgress: true,
			autoplay: {
			   delay: 1500,
			},
		});
		var swiper2 = new Swiper(".main-swiper2", {
			loop: true,
			effect: "fade",
			speed: 1000,
			parallax: true,
			//autoplay: {
			//   delay: 1500,
			//},
			pagination: {
				el: ".main-swiper2-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
				},
			},
			thumbs: {
			  swiper: swiper,
			},
		});
	}
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.project-carousel').owlCarousel({
		loop:true,
		center:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
				margin:20
			},			
			1024:{
				items:3
			},
			1200:{
				items:2
			},
			1400:{
				items:2
			}
		}
	})
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.header-blog-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
				margin:10,
				center: true,
				stagePadding: 30
			},
			480:{
				items:1,
				margin:10,
				center: true,
				stagePadding: 30
			},			
			1024:{
				items:3
			},
			1200:{
				items:4
			},
			1400:{
				items:4
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.blog-carousel').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			768:{
				items:2
			},			
			991:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.team-carousel').owlCarousel({
		loop:true,
		autoplay:true,
		margin:100,
		nav:true,
		stagePadding: 100,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i> <span>Prev</span>', '<span>Next</span><i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
				stagePadding: 0
			},
			480:{
				items:1
			},			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.post-slide1').owlCarousel({
		loop:true,
		autoplay:true,
		margin:40,
		center:true,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
				stagePadding: 15,
			},
			480:{
				items:1,
				stagePadding: 15
			},			
			991:{
				items:1
			},
			1000:{
				items:1.5,
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.post-slide2').owlCarousel({
		loop:true,
		autoplay:true,
		margin:40,
		center:true,
		stagePadding: 40,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
				stagePadding: 15
			},
			480:{
				items:1
			},			
			991:{
				items:2
			},
			1000:{
				items:3,
			}
		}
	})
	
	/* testimonial two function by = owl.carousel.js */
	jQuery('.testimonial-two-dots-bx').owlCarousel({
		loop:true,
		autoplay:false,
		margin:10,
		nav:true,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/* testimonial two function by = owl.carousel.js */
	jQuery('.testimonial-two').owlCarousel({
		loop:true,
		autoplay:false,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			991:{
				items:2
			},
			1000:{
				items:2
			}
		}
	})
	
	/* testimonial two function by = owl.carousel.js */
	jQuery('.project-carousel-2').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
				stagePadding: 60,
				margin:15
			},
			480:{
				items:1,
				margin:15,
				stagePadding: 60
			},	
			768:{
				items:1
			},
			1000:{
				items:1.5
			}
		}
	})
	/* testimonial two function by = owl.carousel.js */
	jQuery('.testimonial11').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:30,
		nav:true,
		autoplaySpeed: 1000,
		dots: true,
		navText: ['<i class="fa-light fa-chevron-left"></i>', '<i class="fa-light fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:1,
				margin:15
			},
			480:{
				items:1,
				margin:15,
			},	
			768:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	/* About 1 function by = owl.carousel.js */
	jQuery('.about-1').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:30,
		nav:false,
		autoplaySpeed: 1000,
		dots: true,
		navText: ['<i class="fa-light fa-chevron-left"></i>', '<i class="fa-light fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:1,
				margin:15
			},
			480:{
				items:1,
				margin:15,
			},	
			768:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/* bg-content  */
	if(jQuery('.processing-swiper').length > 0){
		var swiper = new Swiper(".processing-swiper", {
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			autoplay: {
			   delay: 2000,
			},
			pagination: {
				el: ".processing-swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
				},
			},
			breakpoints: {
				1280: {
					slidesPerView: 1,
				},
				360: {
					slidesPerView: 1,
				},
			}
			
		 });
	}
	/* bg-content2  */
	if(jQuery('.bg-content-2').length > 0){
		var swiper = new Swiper(".bg-content-2", {
			speed: 1500,
			slidesPerView: 3,
			spaceBetween: 30,
			loop:true,
			autoplay: {
			   delay: 1000,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
				},
			},
			breakpoints: {
				1200: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				591: {
					slidesPerView: 2,
				},
				320: {
					slidesPerView: 1,
				},
			}
			
		 });
	}
	/* testimonial12  */
	if(jQuery('.testimonial12').length > 0){
		var swiper = new Swiper(".testimonial12", {
			speed: 2000,
			slidesPerView: 2,
			spaceBetween: 30,
			loop: true,
			autoplay: {
			   delay: 1500,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
				},
			},
			breakpoints: {
				1680: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				},
				600: {
					slidesPerView: 1,
				},
				360: {
					slidesPerView: 1,
				},
			}
			
		 });
	}
	
	/* testimonial two function by = owl.carousel.js */
	jQuery('.exhibition-carousel').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:0,
		nav:true,
		dots: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/* testimonial two function by = owl.carousel.js */
	jQuery('.project-carousel-1').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:0,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: true,
		navText: ['<i class="la la-arrow-left"></i> Prev', 'Next <i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/* project three function by = owl.carousel.js */
	jQuery('.project-carousel-3').owlCarousel({
		loop:true,
		autoplay:true,
		right:true,
		margin:30,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		autoWidth:true,
		navText: ['<i class="fa-light fa-chevron-left"></i>', '<i class="fa-light fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			991:{
				items:2
			},
			1000:{
				items:2
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.client-logo').owlCarousel({
		loop:true,
		autoplay:true,
		margin:20,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:2
			},
			480:{
				items:4
			},			
			991:{
				items:5
			},
			1000:{
				items:6
			}
		}
	})
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.footer-gallery').owlCarousel({
		loop:false,
		margin:0,
		nav:true,
		dots: false,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
				center: true,
				stagePadding: 30
			},
			480:{
				items:2,
			},			
			1024:{
				items:3
			},
			1200:{
				items:4
			},
			1400:{
				items:4
			}
		}
	})
	/* image-carousel function by = owl.carousel.js */
	jQuery('.related-post').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
			},			
			1024:{
				items:2
			},
			1200:{
				items:2
			}
		}
	})
	/* image-carousel function by = owl.carousel.js */
	jQuery('.portfolio-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots: false,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: true,
		navText: ['<i class="la la-arrow-left"></i> Prev', 'Next <i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
			},			
			1024:{
				items:3
			},
			1200:{
				items:4
			}
		}
	})
	/* image-carousel function by = owl.carousel.js */
	jQuery('.portfolio-carousel-2').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		autoWidth:true,
		dots: false,
		navText: ['<i class="la la-arrow-left"></i> Prev', 'Next <i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
				autoWidth: false,
			},
			480:{
				items:2,
			},			
			1024:{
				items:3
			},
			1200:{
				items:4
			}
		}
	})
	jQuery('.portfolio-carousel-2').on('mousewheel', '.owl-stage', function (e) {
		if (e.deltaY>0) {
			jQuery('.portfolio-carousel-2').trigger('next.owl',[2000]);
		} else {
			jQuery('.portfolio-carousel-2').trigger('prev.owl',[2000]);
		}
		e.preventDefault();
	});
	
	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.team-slider').owlCarousel({
		loop:true,
		autoplay:false,
		margin:30,
		nav:false,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},			
			1024:{
				items:2
			},
			1200:{
				items:2
			}
		}
	})
	/* image-carousel function by = owl.carousel.js */
	jQuery('.project-area-info').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="la la-angle-left"></i>', '<i class="la la-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:1,
			},			
			1024:{
				items:1
			},
			1200:{
				items:1
			}
		}
	})
	/* image-carousel function by = owl.carousel.js */
	jQuery('.client-box-full').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:1,
			},			
			1024:{
				items:1
			},
			1200:{
				items:1
			}
		}
	})
});
