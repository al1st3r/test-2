$(document).ready(function () {
    let $courseOrderBtn = $('.hero__footer-button')
    let $course = $('form.subscription')

    $courseOrderBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: $($course).offset().top,
            easing: "ease-in-out",
        }, 2000);
    })
})