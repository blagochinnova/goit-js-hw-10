
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";


let userSelectedDate = null;
let timerInterval;

//---Оголошуємо функцію для форматування чисел з переднім нулем
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

//---Оголошуємо функцію конвертації мілісекунд у об'єкт з часом
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//---Оголошуємо функцію для оновлення інтерфейсу таймера
function updateTimerInterface(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

//---Оголошуємо функцію для старту таймера
function startTimer() {
  if (!userSelectedDate || userSelectedDate.getTime() <= new Date().getTime()) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
    });
    return;
  }

  document.querySelector('[data-start]').disabled = false;

  //---Отримуємо різницю між обраною датою та поточною датою в мілісекундах
  const timeDifference = userSelectedDate.getTime() - new Date().getTime();

  //---Оновлюємо інтерфейс таймера
  updateTimerInterface(timeDifference);

  //---Зупиняємо попередній інтервал (якщо він був)
  clearInterval(timerInterval);

  //---Запускаємо новий інтервал для оновлення таймера кожну секунду
  timerInterval = setInterval(() => {
    updateTimerInterface(timeDifference);
    timeDifference -= 1000;

    if (timeDifference < 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Success',
        message: 'Timer has reached zero!',
      });
    }
  }, 1000);
}


flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    if (userSelectedDate.getTime() <= now.getTime()) {
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
});


document.querySelector('[data-start]').addEventListener('click', startTimer);
