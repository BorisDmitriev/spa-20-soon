import './styles/main.scss'; 
import moment from 'moment';
import 'moment-timezone';

let eventTime, years, days, hours, minutes, seconds , currentTime, duration, interval, intervalId;

interval = 1000; // 1 second

// get time elements
days = document.querySelector(".days");
hours = document.querySelector(".hours");
minutes = document.querySelector(".minutes");
seconds = document.querySelector(".seconds");
years = document.querySelector(".years");

// calculate difference between two times
eventTime = moment.tz("2025-02-04T16:00:00", "Europe/Berlin");
currentTime = moment.tz();

// get duration between two times
duration = moment.duration(eventTime.diff(currentTime));

// loop to countdown every 1 second
setInterval(function() {
    // get updated duration
    duration = moment.duration(duration - interval, 'milliseconds');

    // if duration is >= 0
    if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
    } else {
        days.innerText = Math.floor( duration.asMilliseconds() / (1000 * 60 * 60 * 24 ) ) + " days";
        hours.innerText = duration.hours() + " hours";
        minutes.innerText = duration.minutes()  + " minutes"
        seconds.innerText = duration.seconds() + " seconds";   
    }
}, interval);
