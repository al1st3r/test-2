$(document).ready(function () {
    let progressLine = $('#progressLine')
    let progressNum = $('#progressSum')
    let calcDataSum = $(progressNum).data('sum') / 1000000 * 100;
    let num = $(progressNum).data('sum').toString()
    $(progressLine).css('width', calcDataSum + '%')
    $(progressNum).text(num.slice(0, 3) + ' ' + num.slice(3, 6) + '₽')
})
