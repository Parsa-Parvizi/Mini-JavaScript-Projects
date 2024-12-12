const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result");
const clockEl = document.getElementById("clock");

const clickSound = new Audio('sounds/click-sound.mp3');
// const clearSound = new Audio('sounds/clear-sound.mp3');
const equalsSound = new Audio('sounds/equals-sound.mp3');

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;

    clickSound.currentTime = 0; 
    clickSound.play();

    if (buttonValue === "C") {
      clearResult();
      clearSound.currentTime = 0;
      clearSound.play();
    } else if (buttonValue === "=") {
      calculateResult();
      equalsSound.currentTime = 0;
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

updateClock();
