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

    //this.value is JavaScript and not JQUery
    $('#date-input').on("input", function (event) {
        this.value = this.value.replace(/[^0-9\.]/g,'');
        if (this.value.length >= 2) {
            this.value = this.value.substring(0, 2) + '/' + this.value.substring(2);
    
        }
        
        if(this.value.length > 7){
            this.value = this.value.slice(0,7);
        }

     });

     $('#date-input').on("keydown", function(event){
        //how to allow backspace when length == 2 ?
        if (event.key === "Backspace" && this.value.length === 3){
            this.value = this.value.substring(0,2);
        }


     });

    $("#goto-btn").click(function(){
        if($('#date-input').val().length < 7){
            alert("Invalid input!!! \nPlease enter in mm/yyyy format.")
        }else if(Number($('#date-input').val().substring(0,2)) < 1 || Number($('#date-input').val().substring(0,2)) > 12){
            alert("Invalid month!!! \nPlease enter a number from 1-12.")
        }
        else{
            let month = Number($('#date-input').val().substring(0,2)) - 1;
            let year = Number($('#date-input').val().substring(3,7));

            initCalendar(year, month, monthsArr);
        }        
    });
}

function addEvent(){

    //add event button
    $(".add-event").click(function(){
        $(".add-event-wrapper").toggleClass("active");
    });

    $(".close").click(function(){
        $(".add-event-wrapper").removeClass("active");
    });

    // limit event title to 50 characters
    $(".event-name").on("input", function (event) {
        $(".event-name").val($(".event-name").val().slice(0, 50));
    });

    // event time from input restrictions
    $(".event-time-from").on("input", function(event){
        
        this.value = this.value.replace(/[^0-9\.]/g,'');
        if(this.value.length >= 2){
            this.value = this.value.substring(0, 2) + ':' + this.value.substring(2);
        }
        if(this.value.length > 5){
            this.value = this.value.slice(0,5);
        }
    })
    $(".event-time-from").on("keydown", function(event){
        //how to allow backspace when length == 2 ?
        if (event.key === "Backspace" && this.value.length === 3){
            this.value = this.value.substring(0,2);
        }
    });


    // event time to input restrictions
    $(".event-time-to").on("input", function(event){
        
        this.value = this.value.replace(/[^0-9\.]/g,'');
        if(this.value.length >= 2){
            this.value = this.value.substring(0, 2) + ':' + this.value.substring(2);
        }
        if(this.value.length > 5){
            this.value = this.value.slice(0,5);
        }
    })
    $(".event-time-to").on("keydown", function(event){
        //how to allow backspace when length == 2 ?
        if (event.key === "Backspace" && this.value.length === 3){
            this.value = this.value.substring(0,2);
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

    addEvent();
    initCalendar(year, month, monthsArr);

  });

  