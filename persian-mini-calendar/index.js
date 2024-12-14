const monthNameEl = document.getElementById("month-name");
const dayNameEl = document.getElementById("day-name");
const dayNumEl = document.getElementById("day-number");
const yearEl = document.getElementById("year");
const daysContainer = document.getElementById("days-container");
const yearSelect = document.getElementById("year-select");
const eventInput = document.getElementById("event-input");
const addEventButton = document.getElementById("add-event");
const eventsContainer = document.getElementById("events");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const persianDays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

function updateCalendar() {
    // به‌روزرسانی تاریخ جاری
    currentDate.setFullYear(currentYear, currentMonth, 1); // تنظیم تاریخ به اولین روز ماه جاری

    const persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }).format(currentDate);

    const [day, month, year] = persianDate.split(' ');

    monthNameEl.innerText = persianMonths[currentMonth];
    dayNameEl.innerText = persianDays[new Date(currentYear, currentMonth, day).getDay()];
    dayNumEl.innerText = day;
    yearEl.innerText = year;

    renderDays();
    populateYearSelect();
}

function renderDays() {
    daysContainer.innerHTML = '';
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // تعداد روزهای ماه جاری
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = i;
        daysContainer.appendChild(dayDiv);
    }
}

function populateYearSelect() {
    yearSelect.innerHTML = '';
    for (let i = 1400; i <= 1450; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        if (i === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
}

yearSelect.addEventListener("change", (event) => {
    currentYear = parseInt(event.target.value);
    updateCalendar();
});

document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    currentDate.setMonth(currentMonth);
    updateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    currentDate.setMonth(currentMonth);
    updateCalendar();
});

addEventButton.addEventListener("click", () => {
    const eventText = eventInput.value;
    if (eventText) {
        const eventDiv = document.createElement('div');
        eventDiv.innerText = eventText;
        eventsContainer.appendChild(eventDiv);
        eventInput.value = '';
        saveEvents();
    }
});

function saveEvents() {
    const events = [];
    for (let event of eventsContainer.children) {
        events.push(event.innerText);
    }
    localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(eventText => {
        const eventDiv = document.createElement('div');
        eventDiv.innerText = eventText;
        eventsContainer.appendChild(eventDiv);
    });
}

// بارگذاری رویدادها در بارگذاری اولیه
loadEvents();
updateCalendar();