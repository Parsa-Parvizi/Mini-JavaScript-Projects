const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");
const toggleFormatBtn = document.getElementById("toggleFormat");

let is24HourFormat = false;

function updateClock() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let ampm = "AM";

  if (!is24HourFormat) {
    if (h >= 12) {
      ampm = "PM";
      if (h > 12) h -= 12;
    } else if (h === 0) {
      h = 12;
    }
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.innerText = h;
  minuteEl.innerText = m;
  secondEl.innerText = s;

  // نمایش AM/PM فقط در فرمت 12 ساعته
  ampmEl.innerText = is24HourFormat ? "" : ampm;

  dateEl.innerText = now.toLocaleDateString();

  setTimeout(updateClock, 1000);
}

function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  updateClock();
}

toggleFormatBtn.addEventListener("click", toggleFormat);
updateClock();