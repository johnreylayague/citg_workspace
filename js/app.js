(function ($, document, window) {
  $(document).ready(function () {
    // Cloning main navigation for mobile menu
    $(".mobile-navigation").append($(".main-navigation .menu").clone());

    // Mobile menu toggle
    $(".menu-toggle").click(function () {
      $(".mobile-navigation").slideToggle();
    });

    $("#year").text(new Date().getFullYear());

    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    $(".skitter-large").skitter({
      interval: 3000,
      dots: false,
      stop_over: false,
      auto_play: true,
    });
  });

  $(window).load(function () {
    var $container = $(".filterable-items");

    $container.isotope({
      filter: "*",
      layoutMode: "fitRows",
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });

    $(".filterable-nav a").click(function (e) {
      e.preventDefault();
      $(".filterable-nav .current").removeClass("current");
      $(this).addClass("current");

      var selector = $(this).attr("data-filter");
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });

    $(".mobile-filter").change(function () {
      var selector = $(this).val();
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });
  });

  $(window).load(function () {
    $(".feature-slider").flexslider({
      directionNav: true,
      controlNav: false,
      prevText: '<i class="fa fa-angle-left"></i>',
      nextText: '<i class="fa fa-angle-right"></i>',
    });
  });
})(jQuery, document, window);
