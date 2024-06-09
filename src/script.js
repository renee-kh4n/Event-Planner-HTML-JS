function setMonth(monthsArr, month, year){
    $('.date').text(monthsArr[month] + " " + year);
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



function initCalendar(year, month, monthsArr){
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

    setMonth(monthsArr, month, year);

    setDays(year, month, firstDay_day, lastDay_num, prevDays, nextDays);

    
    $('#prev').click(function() {prevMonth(month, year, monthsArr); });
    
    $('#next').click(function() {nextMonth(month, year, monthsArr); });

    gotoDate(monthsArr);

     
}

function prevMonth(month, year, monthsArr){
    month--;

    if(month<0){ // month 0 = January & month 11 = December
        month = 11;
        year--;
    }

    initCalendar(year, month, monthsArr);
}

function nextMonth(month, year, monthsArr){
    month++;
    if(month>11){ // month 0 = January & month 11 = December
        month = 0;
        year++;
    }

    initCalendar(year, month, monthsArr);
}

function gotoDate(monthsArr){
    $("#today-btn").click(function(){
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        initCalendar(year, month, monthsArr);
    });

    $("#goto-btn").click(function(){

        const input = $('#date-input').val();
        if (!/^\d{2}\/\d{4}$/.test(input)) {
            alert("Invalid Input !!!");
            // [Violation] 'click' handler took 1605ms
            
        }else{

            let [month, year] = input.split('/').map(Number);

            if(month<1 || month>12){
                alert("Invalid date");
            }else{
                month--;
                initCalendar(year, month, monthsArr);
            }    

        }
                
    });
}


$(document).ready(function() {

    let today = new Date();
    let activeDay;
    let year = today.getFullYear();
    let month = today.getMonth();

    const monthsArr = [
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

    initCalendar(year, month, monthsArr);




  });