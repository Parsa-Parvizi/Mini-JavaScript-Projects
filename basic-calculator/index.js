const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result");
const clockEl = document.getElementById("clock"); // عنصر ساعت

// بارگذاری صداها
const clickSound = new Audio('sounds/click-sound.mp3');
const clearSound = new Audio('sounds/clear-sound.mp3');
const equalsSound = new Audio('sounds/equals-sound.mp3');

// تابع برای به‌روز کردن ساعت
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

// به‌روزرسانی ساعت هر ثانیه
setInterval(updateClock, 1000);

// اضافه کردن رویداد کلیک به دکمه‌ها
for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;

    // پخش صدای کلیک برای همه دکمه‌ها
    clickSound.currentTime = 0; // برای جلوگیری از تکرار صدا
    clickSound.play();

    if (buttonValue === "C") {
      clearResult();
      // پخش صدای پاک کردن
      clearSound.currentTime = 0; // برای جلوگیری از تکرار صدا
      clearSound.play();
    } else if (buttonValue === "=") {
      calculateResult();
      // پخش صدای نتیجه
      equalsSound.currentTime = 0; // برای جلوگیری از تکرار صدا
      equalsSound.play();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldEl.value = "";
}

function calculateResult() {
  inputFieldEl.value = eval(inputFieldEl.value);
}

function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;
}

// به‌روزرسانی اولیه ساعت
updateClock();