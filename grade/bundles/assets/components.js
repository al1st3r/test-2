'use strict';

$(document).ready(function () {
    function getCurrentTime(endTime) {
        var t = Date.parse(endTime) - Date.parse(new Date());
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor(t / (1000 * 60 * 60) % 24);
        var minutes = Math.floor(t / 1000 / 60 % 60);
        var seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initCounter(id, endTime) {
        var counter = $('#counter');
        var daysEl = $(counter).find('.counter__number--days')[0];
        var hoursEl = $(counter).find('.counter__number--hours')[0];
        var minutesEl = $(counter).find('.counter__number--minutes')[0];
        var secondsEl = $(counter).find('.counter__number--seconds')[0];

        function updateCounter() {
            var t = getCurrentTime(endTime);

            $(daysEl).text(t.days);
            $(hoursEl).text(('0' + t.hours).slice(-2));
            $(minutesEl).text(('0' + t.minutes).slice(-2));
            $(secondsEl).text(('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        updateCounter();
        var timeInterval = setInterval(updateCounter, 1000);
    }

    var deadline = 'December 31 2022';
    initCounter('counter', deadline);
});

$(document).ready(function () {
    var progressLine = $('#progressLine');
    var progressNum = $('#progressSum');
    var calcDataSum = $(progressNum).data('sum') / 1000000 * 100;
    var num = $(progressNum).data('sum').toString();
    $(progressLine).css('width', calcDataSum + '%');
    $(progressNum).text(num.slice(0, 3) + ' ' + num.slice(3, 6) + '₽');
});

$(document).ready(function () {
    var $courseOrderBtn = $('.hero__footer-button');
    var $course = $('form.subscription');

    $courseOrderBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: $($course).offset().top,
            easing: "ease-in-out"
        }, 2000);
    });
});
$(document).ready(function () {
    $(window).scroll(function () {
        var $windowTop = $(window).scrollTop();
        var $windowHeight = $(window).height();
        var $startElement = $('.start__progress');
        var $elementTop = $($startElement).offset().top + 150;
        var $elementHeight = $($startElement).outerHeight();
        var $documentHeight = $(document).height();

        if ($windowTop + $windowHeight >= $elementTop || $windowHeight + $windowTop === $documentHeight || $elementHeight + $elementTop < $windowHeight) {
            $($startElement).addClass('active');
        } else {
            $($startElement).removeClass('active');
        }
    });
});