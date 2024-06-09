function setMonth(months, month, year){
    $('.date').text(months[month] + " " + year);
}

function setDays(year, month, firstDay_day, lastDay_num, prevDays, nextDays){
    let days = '';

    //previous days
    for(let x = firstDay_day; x > 0; x--){
        
        days += `<div class='day prev-date'>${prevDays - x + 1}</div>`;
    }

    //days of the month
    for(let i = 1; i <= lastDay_num; i++){
        if( i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            days += `<div class="day active today">${i}</div>`;
        } else{
            days += `<div class="day">${i}</div>`;
        }

     }

     //next days
     for(let x = 1; x <= nextDays; x++){
        days += `<div class='day next-date'>${x}</div>`;
    }

    $('.days').html(days);
    // console.log(prevLastDay);
}



function initCalendar(year, month, months){
    const firstDay_date = new Date(year, month, 1);
    const lastDay_date = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDay_num = lastDay_date.getDate();
    const firstDay_day = firstDay_date.getDay();
    const nextDays = 7 - lastDay_date.getDay() - 1; 

    
    console.log(prevLastDay); //Fri May 31 2024 00:00:00 GMT+0800 (Philippine Standard Time)

    console.log(firstDay_date); //Sat Jun 01 2024 00:00:00 GMT+0800 (Philippine Standard Time)
    console.log(firstDay_day); // 6 == Saturday

    console.log(lastDay_date); //Sun Jun 30 2024 00:00:00 GMT+0800 (Philippine Standard Time)

    console.log(lastDay_num); //30

    console.log(nextDays); //6

    console.log(lastDay_date.getDay()) // 0 == Sunday
    


    setMonth(months, month, year);

    setDays(year, month, firstDay_day, lastDay_num, prevDays, nextDays);


     
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