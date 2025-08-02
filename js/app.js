(function ($, document, window) {
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $("#back-to-top").fadeIn();
      } else {
        $("#back-to-top").fadeOut();
      }
    });

    $("#back-to-top").click(function () {
      document.documentElement.scrollTop = 0; // for modern browsers
      document.body.scrollTop = 0; // for older Safari
      return false;
    });

    const addImages = (folder, count, type, exclude = []) => {
      for (let i = 1; i <= count; i++) {
        if (exclude.includes(i)) continue;

        const imageBlock = `
      <a href="${folder}/${i}.JPG" class="project-item filterable-item ${type} glightbox">
        <figure class="featured-image">
          <img src="${folder}/${i}.JPG" alt="${type} image ${i}" />
        </figure> 
      </a> 
    `;

        $("#filterable-gallery").append(imageBlock);
      }
    };

    const addVideos = (folder, count, type, thumbnailFolder, exclude = []) => {
      for (let i = 1; i <= count; i++) {
        if (exclude.includes(i)) continue;

        const videoPath = `${folder}/${i}.mp4`;
        const thumbPath = `${thumbnailFolder}/${i}.JPG`; // Thumbnail image

        const videoBlock = `
      <a href="${videoPath}" class="project-item filterable-item ${type} glightbox" data-type="video">
        <figure class="featured-image">
          <img src="${thumbPath}" alt="${type} video ${i}" />
        </figure>
      </a>
    `;

        $("#filterable-gallery").append(videoBlock);
      }
    };

    // Add 2 video items from the /assets/videos folder
    // Thumbnails for these videos are located in /assets/thumbnails
    // These will be tagged with the "unit" type/class
    addVideos("/assets/videos", 2, "unit", "/assets/thumbnails");

    // Add 68 image items from the /images/unit folder
    // These images are tagged with the "unit" type/class
    addImages("/images/unit", 68, "unit");
    addImages("/images/cityloft", 13, "cityloft");
    addImages("/images/court", 1, "court");

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
