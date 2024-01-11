
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const selector = document.querySelector("#datetime-picker");
const start = document.querySelector("[data-start]");
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            start.setAttribute("disabled", "");
            iziToast.error({
                message: 'Please choose a date in the future',
                position: "topRight",
            });
        } else {
            start.removeAttribute("disabled");
            userSelectedDate = selectedDates[0];
        }
    },
};

flatpickr(selector, options);


const addLeadingZero = value => {
    if (value <= 9) {
        return value.toString().padStart(2, "0");
    } else {
        return value;
    }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);    
}

start.addEventListener("click", () => {
    selector.setAttribute("disabled", "");
    start.setAttribute("disabled", "");
    const intervalId = setInterval(() => {
        const ms = userSelectedDate - Date.now();
        convertMs(ms);
        if (ms <= 0) {
            clearInterval(intervalId);
            convertMs(0);
            iziToast.success({
                title: 'Time is up!',
                message: 'You can reload the page to restart the timer.',
                position: "topRight",
            });
        }
    }, 1000); 
});