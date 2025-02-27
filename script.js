$(document).ready(function() {
    // Mobile menu toggle
    $('.mobile-menu-btn').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Smooth scroll
    $('.nav-links a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');

        $('.nav-links').removeClass('active');

        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 500);
    });

    // Fade-in animation for products
    $(window).scroll(function() {
        $('.product-card').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() * 0.8) {
                $(this).css({
                    'transform': 'translateY(0)',
                    'opacity': '1'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-links, .mobile-menu-btn').length) {
            $('.nav-links').removeClass('active');
        }
    });
});
