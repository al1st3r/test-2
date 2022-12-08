$(document).ready(function () {
    $(window).scroll(function () {
        let $windowTop = $(window).scrollTop();
        let $windowHeight = $(window).height();
        let $startElement = $('.start__progress');
        let $elementTop = $($startElement).offset().top + 150;
        let $elementHeight = $($startElement).outerHeight();
        let $documentHeight = $(document).height();

        if ($windowTop + $windowHeight >= $elementTop || $windowHeight + $windowTop === $documentHeight || $elementHeight + $elementTop < $windowHeight) {
            $($startElement).addClass('active')
        } else {
            $($startElement).removeClass('active')
        }
    })
})
