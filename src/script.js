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

let eventsArr = [];

getEvents();

// const eventsArr = [
//     {
//         day: 8,
//         month: 1,
//         year: 2024,
//         events:[
//             {
//                 title: "My Birthday",
//                 time: "12:00 AM",
//             },
//             {
//                 title: "Event 2",
//                 time: "11:00 AM",
//             }

//         ],
//     },
//     {
//         day: 31,
//         month: 1,
//         year: 2024,
//         events:[
//             {
//                 title: "Papa's Birthday",
//                 time: "12:00 AM",
//             },

//         ],
//     },
// ];

function viewEvents(day, month, year){
    let event = false;
    eventsArr.forEach((eventObj) => {
        if(
            eventObj.day === day &&
            (eventObj.month - 1) === month &&
            eventObj.year === year
        ){
            event = true;
        }

    });

    return event;
}

function clickDay(month, year){
    $(document).on("click", ".day", function(){
        
        activeDay = $(this).text();

        getActiveDay(activeDay);

        $(".day.active").removeClass("active");
    
        $(this).toggleClass("active");
        
    });
    
    
    $(document).on("click", ".prev-date", function(){
        
        activeDay = $(this).text();
        prevMonth(month, year);
        $(".day").each(function(){
            if($(this).text() == activeDay){
                $(".day.active").removeClass("active");
    
                $(this).toggleClass("active");

            }
        });
            
        
    });


    $(document).on("click", ".next-date", function(){
        
        activeDay = $(this).text();

        nextMonth(month, year);
        
        $(".day").each(function(){
            if($(this).text() == activeDay){
                $(".day.active").removeClass("active");
    
                $(this).toggleClass("active");

            }
        });
        
    });
}


function setMonth(month, year){
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

        // view events
        let eventFound = viewEvents(i, month, year);
        
        if( i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
        
            activeDay = i;
            getActiveDay(activeDay);
        
            if(eventFound){
                days += `<div class="day active today event">${i}</div>`;
            }else{
                days += `<div class="day active today">${i}</div>`;
            }
        } else{
            if(eventFound){
                days += `<div class="day event">${i}</div>`;
            }else{
                days += `<div class="day">${i}</div>`;
            }
           
        }

     }

     //next days
     for(let x = 1; x <= nextDays; x++){
        days += `<div class='day next-date'>${x}</div>`;
    }

    $('.days').html(days);
    clickDay(month, year);

    
}



// function initCalendar(year, month){
//     const firstDay_date = new Date(year, month, 1);
//     const lastDay_date = new Date(year, month + 1, 0);
//     const prevLastDay = new Date(year, month, 0);
//     const prevDays = prevLastDay.getDate();
//     const lastDay_num = lastDay_date.getDate();
//     const firstDay_day = firstDay_date.getDay();
//     const nextDays = 7 - lastDay_date.getDay() - 1; 

//     setMonth(month, year);

//     setDays(year, month, firstDay_day, lastDay_num, prevDays, nextDays);

    
//     $('#prev').click(function() {prevMonth(month, year); });
    
//     $('#next').click(function() {nextMonth(month, year); });

//     clickDay(month, year);

//     gotoDate();

     
// }

// function prevMonth(month, year){
//     month--;

//     if(month<0){ // month 0 = January & month 11 = December
//         month = 11;
//         year--;
//     }

//     initCalendar(year, month);
// }

// function nextMonth(month, year){
//     month++;
//     if(month>11){ // month 0 = January & month 11 = December
//         month = 0;
//         year++;
//     }

//     initCalendar(year, month);
// }

//eliminate the unending initCalendar

function initCalendar(year, month) {
    const firstDay_date = new Date(year, month, 1);
    const lastDay_date = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDay_num = lastDay_date.getDate();
    const firstDay_day = firstDay_date.getDay();
    const nextDays = 7 - lastDay_date.getDay() - 1;

    setMonth(month, year);
    setDays(year, month, firstDay_day, lastDay_num, prevDays, nextDays);
}

function changeMonth(month, year, direction) {
    month += direction;

    if (month < 0) {
        month = 11;
        year--;
    } else if (month > 11) {
        month = 0;
        year++;
    }

    initCalendar(year, month);
}

function setupEventListeners() {
    $('#prev').click(() => changeMonth(currentMonth, currentYear, -1));
    $('#next').click(() => changeMonth(currentMonth, currentYear, 1));
    clickDay(currentMonth, currentYear);
    gotoDate();
}

$(document).ready(function() {
    let today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();

    setupEventListeners();
    initCalendar(currentYear, currentMonth);
});

/////////////////////////

function gotoDate(){
    $("#today-btn").click(function(){
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        initCalendar(year, month);
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

            initCalendar(year, month);
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

    // // event time from input restrictions
    // $(".event-time-from").on("input", function(event){
        
    //     this.value = this.value.replace(/[^0-9\.]/g,'');
    //     if(this.value.length >= 2){
    //         this.value = this.value.substring(0, 2) + ':' + this.value.substring(2);
    //     }
    //     if(this.value.length > 5){
    //         this.value = this.value.slice(0,5);
    //     }
    // })
    // $(".event-time-from").on("keydown", function(event){
    //     //how to allow backspace when length == 2 ?
    //     if (event.key === "Backspace" && this.value.length === 3){
    //         this.value = this.value.substring(0,2);
    //     }
    // });


    // // event time to input restrictions
    // $(".event-time-to").on("input", function(event){
        
    //     this.value = this.value.replace(/[^0-9\.]/g,'');
    //     if(this.value.length >= 2){
    //         this.value = this.value.substring(0, 2) + ':' + this.value.substring(2);
    //     }
    //     if(this.value.length > 5){
    //         this.value = this.value.slice(0,5);
    //     }
    // })
    // $(".event-time-to").on("keydown", function(event){
    //     //how to allow backspace when length == 2 ?
    //     if (event.key === "Backspace" && this.value.length === 3){
    //         this.value = this.value.substring(0,2);
    //     }
    // });

}


$(document).ready(function() {

    let today = new Date();
    let activeDay;
    let year = today.getFullYear();
    let month = today.getMonth();

    addEvent();
    // dayListener();
    initCalendar(year, month);

  });

//show active day events and data at top
const eventDay = $(".event-day");
const eventDate = $(".event-date");

function getActiveDay(date){
    
    const monthString = $(".date").text().split(" ")[0];
    const month = Number(monthsArr.indexOf(monthString));

    const year = $(".date").text().split(" ")[1]
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];

    console.log('get active day' + date + ' ' + (month+1) + '  ' + year)
    showEvents(date, month, year);
    eventDay.html(dayName);
    eventDate.html(date + " " + monthsArr[month] + " " + year);
}

function showEvents(date, month, year){ //updateEvents
    let events = "";

    console.log("showEvents month: " + (month+1));

    eventsArr.forEach( (dayEvent) => {
        
     console.log("dayEvent: " + dayEvent.day + " " + (dayEvent.month) + " " + dayEvent.year);
        if(
            Number(date) === Number(dayEvent.day) &&
            Number(month+1) === Number(dayEvent.month) &&
            Number(year) === Number(dayEvent.year)
        ){
            console.log("show eventss")

            dayEvent.events.forEach((event) => {
                events += `<div class="event"><div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">
            ${event.time}
          </div>
        </div> 
        </div>`;
            });
        };
    } );

    if(events === ''){
        events = `<div class=no-event>
                    <h3>No Events</h3>
                    </div>`;
    }

    console.log(date + " " + (month+1) + " " + year);
    console.log(events);
    $('.events').html(events);
}

$('.add-event-btn').click(function() {
    const eventTitle = $('.event-name').val();
    const eventTimeFrom = $('.event-time-from').val();
    const eventTimeTo = $('.event-time-to').val();

    const date = $('.event-date').text();
    const activeDay = date.split(' ')[0];
    const month = Number(monthsArr.indexOf(date.split(' ')[1]));
    const year = date.split(' ')[2];

    console.log(activeDay);
    console.log(month);
    console.log(year);

    if(!eventTitle || !eventTimeFrom || !eventTimeTo){
        alert("Enter complete details");
        return;
    }

    if(eventTimeFrom > eventTimeTo){
        alert("Time From must be earlier that Time To!")
    }else{

    console.log(eventTitle);
    console.log(eventTimeFrom);
    console.log(eventTimeTo);

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + '-' + timeTo,
    };

    let eventAdded = false;

    //check if eventsArr is not empty
    if(eventsArr.length > 0){
        //check if day has an item
        eventsArr.forEach((event) =>{
            if(event.day === activeDay &&
                event.month === (month + 1) &&
                event.year === year
            ){
               eventsArr.events.push(newEvent) ;
               eventAdded = true;
            }
        })
    }

    // if event array is empty or current day has no event, create new
    if(!eventAdded){
        eventsArr.push({
            day: Number(activeDay),
            month: Number(month + 1),
            year: Number(year),
            events: [newEvent],
        })
    }


    }
    
    console.log(eventsArr);
    //display the new event
    showEvents(activeDay, month, year);


    // remove active from add event form ??

    //clear all fields
    $('.event-name').val('');
    $('.event-time-from').val('');
    $('.event-time-to').val('');

    //add event class to newly added day if not already
    if(!$('.day.active').hasClass('event')){
        $('.day.active').addClass('event') ;
    }

    saveEvents();
})

function convertTime(timeStr){
    const hour = timeStr.split(':')[0];
    const min = timeStr.split(':')[1];

    const newHour = Number(hour)%12 || 12;
    const am_pm = hour < 12 ? 'AM' : 'PM';

    return `${newHour}:${min} ${am_pm}`
}

function saveEvents(){
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents(){
    if(localStorage.getItem("events")===null){
        return;
    }

    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


//TODO: allow event deletion