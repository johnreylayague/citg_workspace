/** 
	Core script to handle the entire theme and core functions
**/

var Archia = function(){
	'use strict';
	
	var screenWidth = $( window ).width();
	
	/* Search Bar ============ */
	var homeSearch = function() {
		/* top search in header on click function */
		var quikSearch = jQuery("#quik-search-btn");
		var quikSearchRemove = jQuery("#quik-search-remove");
		
		quikSearch.on('click',function() {	
			jQuery('.dlab-quik-search').fadeIn(500);
			jQuery('.dlab-quik-search').addClass('On');
		});
		
		quikSearchRemove.on('click',function() {
			jQuery('.dlab-quik-search').fadeOut(500);
			jQuery('.dlab-quik-search').removeClass('On');
			
		});	
		/* top search in header on click function End*/
	}
	
	/* One Page Layout ============ */
	var onePageLayout = function(){
		var headerHeight =   parseInt($('.onepage').css('height'), 10);
		
		$(".scroll").unbind().on('click',function(event){
			event.preventDefault();
			
			if (this.hash !== "") {
				var hash = this.hash;	
				var seactionPosition = $(hash).offset().top;
				var headerHeight =   parseInt($('.onepage').css('height'), 10);
				
				$('body').scrollspy({target: ".navbar", offset: headerHeight+2});
				var scrollTopPosition = seactionPosition - (headerHeight);
				
				$('html, body').animate({
					scrollTop: scrollTopPosition
					}, 800, function(){					
				});
			}   
		});
		
		if(jQuery(".scroll-bar").length > 0){
			$(".scroll-bar").unbind().on('click',function(event){
				event.preventDefault();
				
				if (this.hash !== "") {
					var hash = this.hash;	
					var seactionPosition = $(hash).offset().top;
					var headerHeight =   parseInt($('.onepage').css('height'), 10);
					
					$('body').scrollspy({target: ".navbar", offset: headerHeight+2}); 
					
					var scrollTopPosition = seactionPosition - (headerHeight) + 500;
					
					$('html, body').animate({
						scrollTop: scrollTopPosition
					}, 800, function(){
						
					});
				}   
			});
		}
		$('body').scrollspy({target: ".navbar", offset: headerHeight + 2});  
	}
	
	/* Header Height ============ */
	var handleResizeElement = function(){
		$('.header').css('height','');
		var headerHeight = $('.header').height();
		$('.header').css('height', headerHeight);
	}

	/* Load File ============ */
	var dzTheme = function(){
		if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
				if(jQuery(this).parent().hasClass('open')){
					jQuery(this).parent().removeClass('open');
				}else{
					jQuery(this).parent().parent().find('li').removeClass('open');
					jQuery(this).parent().addClass('open');
				}
			});
		}
		
		if(screenWidth > 991){
			jQuery('.full-sidenav .navbar-nav > li > a').next('.sub-menu,.mega-menu').slideUp();
			jQuery('.full-sidenav .sub-menu > li > a').next('.sub-menu').slideUp();
			
			jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a').unbind().on('click', function(e){
				
				if(jQuery(this).hasClass('open')){
					jQuery(this).removeClass('open');
					jQuery(this).parent('li').children('.sub-menu,.mega-menu').slideUp();
				}else{
					if (!window.event.ctrlKey) {
						jQuery(this).addClass('open');
					}
					
					if(jQuery(this).parent('li').children('.sub-menu,.mega-menu').length > 0){
						
						e.preventDefault();
						jQuery(this).next('.sub-menu,.mega-menu').slideDown();
						jQuery(this).parent('li').siblings('li').find('a:first').removeClass('open');
						jQuery(this).parent('li').siblings('li').children('.sub-menu,.mega-menu').slideUp();
					}else{
						jQuery(this).next('.sub-menu,.mega-menu').slideUp();
					}
				}
			});			
		}
		
		jQuery('.menu-icon').on('click',function(){
			jQuery('.menu-close,.full-sidenav').addClass('active');
		});
		jQuery('.menu-close').on('click',function(){
			jQuery('.menu-close,.full-sidenav').removeClass('active');
		});
	}

	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		jQuery('.mfp-gallery-with-owl').magnificPopup({
			delegate: '.owl-item:not(.cloned) .mfp-link',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		});
		
		/* magnificPopup function */
		if(jQuery('.mfp-gallery').length)
		{
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});	
		}	
		/* magnificPopup function end */
		
		/* magnificPopup for paly video function */		
		if(jQuery('.mfp-video').length)
		{
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
							 '<div class="mfp-close"></div>'+
							 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							 '<div class="mfp-title">Some caption</div>'+
							 '</div>'
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});	
		}
		
		/* magnificPopup for paly video function end*/
		if($('.popup-youtube, .popup-vimeo, .popup-gmaps').length){
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 200,
				preloader: false,
				fixedContentPos: true
			});	
		}
	}
	
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		var scrollTop = jQuery("button.scroltop");
		
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).on("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* handle Accordian ============ */
	var handleAccordian = function(){
		/* accodin open close icon change */	 	
		jQuery('#accordion').on('hidden.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		jQuery('#accordion').on('shown.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		/* accodin open close icon change end */
	}
	
	/* handle Placeholder ============ */
	var handlePlaceholder = function(){
		/* input placeholder for ie9 & ie8 & ie7 */
		jQuery.support.placeholder = ('placeholder' in document.createElement('input'));
		/* input placeholder for ie9 & ie8 & ie7 end*/
		
		/*fix for IE7 and IE8  */
		if (!jQuery.support.placeholder) {
			jQuery("[placeholder]").on('focus',function () {
				if (jQuery(this).val() == jQuery(this).attr("placeholder")) jQuery(this).val("");
			}).on('blur',function () {
				if (jQuery(this).val() == "") jQuery(this).val(jQuery(this).attr("placeholder"));
			}).blur();

			jQuery("[placeholder]").parents("form").on('submit',function () {
				jQuery(this).find('[placeholder]').each(function() {
					if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
						 jQuery(this).val("");
					}
				});
			});
		}
		/*fix for IE7 and IE8 end */
	}
	
	/* Equal Height ============ */
	var equalHeight = function(container) {
		
		if(jQuery(container).length == 0){
			return false
		}
		
		var currentTallest = 0, 
			currentRowStart = 0, 
			rowDivs = new Array(), 
			$el, topPosition = 0;
			
		$(container).each(function() {
			$el = $(this);
			$($el).height('auto')
			topPostion = $el.position().top;

			if (currentRowStart != topPostion) {
				for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
		
	}
	
	/* Footer Align ============ */
	var footerAlign = function() {
		jQuery('.site-footer').css('display', 'block');
		jQuery('.site-footer').css('height', 'auto');
		var footerHeight = jQuery('.site-footer').outerHeight();
		jQuery('.footer-fixed > .page-wraper').css('padding-bottom', footerHeight);
		jQuery('.site-footer').css('height', footerHeight);
	}
	
	/* File Input ============ */
	var fileInput = function(){
		/* Input type file jQuery */	 	 
		jQuery(document).on('change', '.btn-file :file', function() {
			var input = jQuery(this);
			var	numFiles = input.get(0).files ? input.get(0).files.length : 1;
			var	label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});
		
		jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
			input = jQuery(this).parents('.input-group').find(':text');
			var log = numFiles > 10 ? numFiles + ' files selected' : label;
		
			if (input.length) {
				input.val(log);
			} else {
				if (log) alert(log);
			}
		});
		/* Input type file jQuery end*/
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length){
			var self = $("#masonry, .masonry");
			if(jQuery('.card-container').length)
		    {
				var columnWidthValue = (self.attr('data-column-width') === undefined)?'':self.attr('data-column-width');
				if(columnWidthValue != ''){columnWidthValue = parseInt(columnWidthValue);}
				self.imagesLoaded(function () {
					self.masonry({
						columnWidth:columnWidthValue, 
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			}
		}
		if(jQuery('.filters').length){
			jQuery(".filters").on('click','li',function(e) {
				jQuery('.filters li').removeClass('active');
				jQuery(this).addClass('active');
				
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				self.masonryFilter({
					filter: function () {
						if (!filter) return true;
						//return $(this).attr("data-filter") == filter;
						return $(this).hasClass(filter);
					}
				});
			});
		}
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length){
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		} 
	}
	
	/* Video Popup ============ */
	var handleVideo = function(){
		/* Video responsive function */	
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');	
		/* Video responsive function end */
	}
	
	/* Gallery Filter ============ */
	var handleFilterMasonary = function(){
		/* gallery filter activation = jquery.mixitup.min.js */ 
		if (jQuery('#image-gallery-mix').length) {
			jQuery('.gallery-filter').find('li').each(function () {
				$(this).addClass('filter');
			});
			jQuery('#image-gallery-mix').mixItUp();
		};
		if(jQuery('.gallery-filter.masonary').length){
			jQuery('.gallery-filter.masonary').on('click','span', function(){
				var selector = $(this).parent().attr('data-filter');
				jQuery('.gallery-filter.masonary span').parent().removeClass('active');
				jQuery(this).parent().addClass('active');
				jQuery('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
		}
		/* gallery filter activation = jquery.mixitup.min.js */
	}
	
	/* handle Bootstrap Select ============ */
	var handleBootstrapSelect = function(){
		/* Bootstrap Select box function by  = bootstrap-select.min.js */ 
		if (jQuery('select').length) {
		    jQuery('select').selectpicker();
		}
		/* Bootstrap Select box function by  = bootstrap-select.min.js end*/
	}
	
	/* handle Bootstrap Touch Spin ============ */
	var handleBootstrapTouchSpin = function(){
		if(jQuery("input[name='demo_vertical2']").length){
			jQuery("input[name='demo_vertical2']").TouchSpin({
			  verticalbuttons: true,
			  verticalupclass: 'ti-plus',
			  verticaldownclass: 'ti-minus'
			});			
		}
	}
	
	/* Resizebanner ============ */
	var handleBannerResize = function(){
		$(".full-height").css("height", $(window).height());
	}
	
	/* Countdown ============ */
	var handleCountDown = function(WebsiteLaunchDate){
		/* Time Countr Down Js */
		if($(".countdown").length){
			$('.countdown').countdown({date: WebsiteLaunchDate+' 23:5'}, function() {
				$('.countdown').text('we are live');
			});
		}
		/* Time Countr Down Js End */
	}
	
	/* Content Scroll ============ */
	var handleCustomScroll = function(){
		/* all available option parameters with their default values */
		if($(".content-scroll").length > 0){ 
			 $(".content-scroll").mCustomScrollbar({
				setWidth:false,
				setHeight:false,
				axis:"y"
			});	 
		}
	}
	
	/* WOW ANIMATION ============ */
	var wow_animation = function(){
		if($('.wow').length > 0){
			var wow = new WOW({
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       50,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}
	}
	
	/* Left Menu ============ */
	var handleSideBarMenu = function(){
		$('.openbtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0){
				document.getElementById("mySidenav").style.left = "0";
			}

			if($('#mySidenav1').length > 0){
				document.getElementById("mySidenav1").style.right = "0";
			}
		})
		
		$('.closebtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0){
				document.getElementById("mySidenav").style.left = "-300px";
			}
			
			if($('#mySidenav1').length > 0){
				document.getElementById("mySidenav1").style.right = "-820px";
			}
		})
	}
	
	/* Left Menu ============ */
	var handleMenuPosition = function(){
		$(".header-nav li").unbind().each(function (e) {
			if ($('ul', this).length) {
				var elm = $('ul:first', this);
				var off = elm.offset();
				var l = off.left;
				var w = elm.width();
				var docH = $("body").height();
				var docW = $("body").width();

				var isEntirelyVisible = (l + w <= docW);

				if (!isEntirelyVisible) {
					$(this).find('.sub-menu:first').addClass('left');
				} else {
					$(this).find('.sub-menu:first').removeClass('left');
				}
			}
		});
	}	
	
	/* Range ============ */
	var priceslider = function(){
		if($(".price-slide, .price-slide-2").length > 0 ) {
			$("#slider-range,#slider-range-2").slider({
				range: true,
				min: 300,
				max: 4000,
				values: [0, 5000],
				slide: function(event, ui) {
					var min = ui.values[0],
						max = ui.values[1];
					  $('#' + this.id).prev().val("$" + min + " - $" + max);
				}
			});
		}
	}
	
	/* BGEFFECT ============ */
	var handleBGElements = function(){
		
		if(screenWidth > 1023){
			if(jQuery('.bgeffect').length){
				var s = skrollr.init({
					edgeStrategy: 'set',
					easing: {
						WTF: Math.random,
						inverted: function(p) {
							return 1-p;
						}
					}
				});			
			}		
		}
	}
	
	var boxHover = function(){
		jQuery('.box-hover').on('mouseenter',function(){
			jQuery('.box-hover').removeClass('active');
			jQuery(this).addClass('active');
			
		})
	}
	
	var reposition = function (){
		var modal = jQuery(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		
		/* Dividing by two centers the modal exactly, but dividing by three 
		 or four works better for larger screens.  */
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}
	
	var handleResize = function (){
		/* Reposition when the window is resized */
		jQuery(window).on('resize', function() {
			jQuery('.modal:visible').each(reposition);
			equalHeight('.equal-wraper .equal-col');
			footerAlign();
		});
	}
	
	var handlePlaceholderAnimation = function(){
		if(jQuery('.dezPlaceAni').length){
		
			$('.dezPlaceAni input, .dezPlaceAni textarea').on('focus',function(){
			  $(this).parents('.form-group, .news-box').addClass('focused');
			});
			
			$('.dezPlaceAni input, .dezPlaceAni textarea').on('blur',function(){
			  var inputValue = $(this).val();
			  if ( inputValue == "" ) {
				$(this).removeClass('filled');
				$(this).parents('.form-group, .news-box').removeClass('focused');  
			  } else {
				$(this).addClass('filled');
			  }
			})
		}
	}
	
	var btnAware = function (){
		$('.btn-aware')
		.on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});
	}
	
	var heartBlast = function (){
		$(".heart").on("click", function() {
			$(this).toggleClass("heart-blast");
		});
	}
	
	/* Current Active Menu ============ */
	var handleCurrentActive = function() {
		for (var nk = window.location,
				o = $("ul.navbar-nav a")
				.filter(function(){
				return this.href == nk;
			})
			.addClass("active").parent().addClass("active");;)
		{
		if (!o.is("li")) break;
			o = o.parent().addClass("show").parent('li').addClass("active");
		}
	}
	
	/* Website Launch Date */ 
	var WebsiteLaunchDate = new Date();
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteLaunchDate.getDate() + " " + monthNames[WebsiteLaunchDate.getMonth()] + " " + WebsiteLaunchDate.getFullYear(); 
	/* Website Launch Date END */ 
	
	/* Handle Navbar Toggler ============ */
	var handleScreenLock = function(){
		jQuery('.navbar-toggler').on('click',function(){
			jQuery('body').toggleClass('screen-lock');
		});
		jQuery('.menu-icon').on('click',function(){
			jQuery('body').addClass('screen-lock');
		});
		jQuery('.menu-close').on('click',function(){
			jQuery('body').removeClass('screen-lock');
		});
	}
	
	/* Function ============ */
	return {
		init:function(){
			boxHover();
			wow_animation();
			priceslider();
			dzTheme();
			handleResizeElement();
			homeSearch();
			MagnificPopup();
			handleAccordian();
			scrollTop();
			handlePlaceholder();
			handlePlaceholderAnimation();
			fileInput();
			handleVideo();
			handleFilterMasonary();
			handleCountDown(WebsiteLaunchDate);
			handleCustomScroll();
			handleSideBarMenu();
			handleBannerResize();
			handleScreenLock();
			handleResize();
			heartBlast();
			onePageLayout();
			handleCurrentActive();
			btnAware();
			jQuery('.modal').on('show.bs.modal', reposition);
			$('[data-toggle="tooltip"]').tooltip();
		},
		
		
		load:function(){
			handleBGElements();
			handleBootstrapSelect();
			handleBootstrapTouchSpin();
			equalHeight('.equal-wraper .equal-col');
			counter();
			handleMenuPosition();
			dzTheme();
			
			setTimeout(function(){
				masonryBox();	
			}, 500);
			
		},
		
		resize:function(){
			screenWidth = $(window).width();
			handleResizeElement();
			handleSideBarMenu();
			handleMenuPosition();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
  
	Archia.init();
	
	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});

	$('a[data-bs-toggle="tab"]').on('click',function(){
		// todo remove snippet on bootstrap v4
		$('a[data-bs-toggle="tab"]').on('click',function() {
		  $($(this).attr('href')).show().addClass('show active').siblings().hide();
		})
	});
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on("load", function (e) {
	Archia.load();
	 setTimeout(function(){
		jQuery('#loading-area').remove();
	}, 0); 
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
	Archia.resize();
});
/*  Window Resize END */

jQuery(window).on('scroll', function () {
	if(jQuery('.sticky-header').length > 0){
		var menu = jQuery('.sticky-header');
		if ($(window).scrollTop() > menu.offset().top) {
			menu.addClass('is-fixed');
			if(jQuery('link[href*="css/dark.css"]').length > 0){
				if((jQuery(".skin").attr('href') == 'css/skin/color/skin-1.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-1.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-2.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-2.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-2.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-3.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-3.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-3.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-4.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-4.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-4.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-5.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-5.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-5.png');
				}
			}else{
				if((jQuery(".skin").attr('href') == 'css/skin/color/skin-1.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-1.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-2.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-2.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-2.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-3.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-3.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-3.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-4.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-4.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-4.png');
				}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-5.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-5.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-5.png');
				}
			}
			
		} else {
			menu.removeClass('is-fixed');
			if((jQuery(".skin").attr('href') == 'css/skin/color/skin-1.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-1.css')){
					$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white.png');
			}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-2.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-2.css')){
				$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-2.png');
			}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-3.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-3.css')){
				$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-3.png');
			}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-4.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-4.css')){
				$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-4.png');
			}else if((jQuery(".skin").attr('href') == 'css/skin/color/skin-5.css' ||  jQuery(".skin").attr('href') == 'css/skin/skin-5.css')){
				$('.header-archia .container > .logo-header .logo').attr('src','images/logo-white-5.png');
			}
		}
	}
});