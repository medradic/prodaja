// Mobile menu
$('.mobile-menu-btn').click(function() {
    $('.nav-links').toggleClass('active');
});

// Smooth scroll i zatvaranje menija
$('.nav-links a').on('click', function(e) {
    e.preventDefault();
    const target = $(this).attr('href');
    
    // Zatvori mobilni meni
    $('.nav-links').removeClass('active');
    
    // Provera da li je "Početna" link
    if(target === '#home') {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    } else {
        // Smooth scroll do sekcije
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 500);
    }
});

// Animacija proizvoda
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

// Zatvaranje menija pri kliku van njega
$(document).on('click', function(e) {
    if (!$(e.target).closest('.nav-links, .mobile-menu-btn').length) {
        $('.nav-links').removeClass('active');
    }
});
