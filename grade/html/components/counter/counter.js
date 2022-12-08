$(document).ready(function () {
    function getCurrentTime(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date());
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let seconds = Math.floor((t / 1000) % 60)

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initCounter(id, endTime) {
        let counter = $('#counter')
        let daysEl = $(counter).find('.counter__number--days')[0]
        let hoursEl = $(counter).find('.counter__number--hours')[0]
        let minutesEl = $(counter).find('.counter__number--minutes')[0]
        let secondsEl = $(counter).find('.counter__number--seconds')[0]

        function updateCounter() {
            let t = getCurrentTime(endTime)

            $(daysEl).text(t.days)
            $(hoursEl).text(('0' + t.hours).slice(-2))
            $(minutesEl).text(('0' + t.minutes).slice(-2))
            $(secondsEl).text(('0' + t.seconds).slice(-2))

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }

        updateCounter();
        let timeInterval = setInterval(updateCounter, 1000)
    }

    let deadline = 'December 31 2022'
    initCounter('counter', deadline)

})
