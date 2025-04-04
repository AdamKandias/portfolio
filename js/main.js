(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'linear');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'linear');
        return false;
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    // Function to calculate the difference in years (experience)
    function calculateYearsSince(dateString) {
        const startDate = new Date(dateString);
        const currentDate = new Date();

        // Get the difference in milliseconds
        const diffInMs = currentDate - startDate;

        // Convert milliseconds to years and round down to nearest whole number
        const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25)); // Approximate year length with leap years considered

        return diffInYears; // Return as integer
    }

    // Update the content of the h1 tag using jQuery
    $('#dynamicYear').text(calculateYearsSince('2021-01-01'));

    function calculateDuration(startDate) {
        const start = new Date(startDate);
        const now = new Date();

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years > 0 && months > 0) {
            return `${years} year ${months} month`;
        } else if (years > 0 && months === 0) {
            return `${years} year`;
        } else {
            return `${months} month`;
        }
    }

    $(document).ready(function () {
        $('#eepisatDuration').text(calculateDuration('2024-09-01'));
        $('#guritaDuration').text(calculateDuration('2023-08-01'));
    });

    // Button Play Auto Scroll
    let isContinuousScrolling = false;

    // Function to scroll to the bottom
    function scrollToBottom() {
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        const scrollDistance = documentHeight - windowHeight;
        const duration = scrollDistance * 12; // Adjust multiplier for appropriate speed

        $('html, body').animate({ scrollTop: scrollDistance }, duration, 'linear', function () {
            if (isContinuousScrolling) {
                scrollToBottom(); // Call scrollToBottom function recursively for continuous scrolling
            }
        });
    }

    // Detect button click to start continuous scrolling
    $('.btn-play').on('click', function () {
        isContinuousScrolling = true;
        scrollToBottom(); // Start continuous scrolling
    });

    // Detect manual scroll to stop continuous scrolling
    $(window).on('scroll', function () {
        if (isContinuousScrolling) {
            isContinuousScrolling = false; // Stop continuous scrolling
        }
    });

    // If user manually scrolls, stop the animation
    $(window).on('mousewheel DOMMouseScroll touchmove', function () {
        $('html, body').stop();
    });
})(jQuery);

