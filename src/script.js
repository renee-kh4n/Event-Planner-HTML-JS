function setMonth(months, month, year){
    $('.date').text(months[month] + " " + year);
}

function setDays(year, month, firstDay_num, lastDay_num, prevDay){
    let days = '';

    for(let x = firstDay_num; x > 0; x--){
        // console.log(days);
        days += `<div class='day prev-date'>${prevDay - x + 1}</div>`;
    }

    for(let i = 1; i <= lastDay_num; i++){
        if( i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            days += `<div class="day active today">${i}</div>`;
        } else{
            days += `<div class="day">${i}</div>`;
        }

        // console.log(days);

    }

    $('.days').html(days);
    console.log(days);
}



function initCalendar(year, month, months){
    const firstDay_date = new Date(year, month, 1);
    const lastDay_date = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDay = prevLastDay.getDate();
    const lastDay_num = lastDay_date.getDate();
    const firstDay_num = firstDay_date.getDate();
    const nextDays = 7 - prevLastDay.getDay() - 1;

    console.log(firstDay_date); //Sat Jun 01 2024 00:00:00 GMT+0800 (Philippine Standard Time)
    console.log(firstDay_num); // 1

    setMonth(months, month, year);

    setDays(year, month, firstDay_num, lastDay_num, prevDay);


     
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