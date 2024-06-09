function initCalendar(year, month, months){
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDate();
    const nextDays = 7 - lastDay.getDay() - 1;

    $('.date').text(months[month] + " " + year);


     
}

$(document).ready(function() {
    const calendar = $('.calendar'),
    date = $('.date'),
    daysContainer = $('.days'),
    prev = $('.prev'),
    next = $('next');
    
    let today = new Date();
    let activeDay;
    let year = today.getFullYear();
    let month = today.getMonth();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    console.log("this works");

    initCalendar(year, month, months);


  });