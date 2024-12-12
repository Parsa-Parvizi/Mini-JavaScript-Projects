const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");
const lastUpdatedEl = document.createElement("p");
lastUpdatedEl.className = "last-updated";
document.body.appendChild(lastUpdatedEl);

updateRate();

function updateRate() {
  const currencyFrom = currencyFirstEl.value;
  const currencyTo = currencySecondEl.value;

  if (!currencyFrom || !currencyTo) {
    exchangeRateEl.innerText = "Please select both currencies.";
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/5f9d1c87f7250159c9c9b17d/latest/${currencyFrom}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data.conversion_rates[currencyTo]) {
        throw new Error("Conversion rate not found.");
      }

      const rate = data.conversion_rates[currencyTo];
      const date = new Date(data.time_last_update_utc);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      lastUpdatedEl.innerText = `Last updated: ${date.toLocaleString('en-US', options)}`;

      exchangeRateEl.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`;
      worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);

      localStorage.setItem(`${currencyFrom}-${currencyTo}`, rate);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      exchangeRateEl.innerText = `Error fetching exchange rate: ${error.message}`;
      lastUpdatedEl.innerText = "";
    });
}

// تبدیل معکوس
worthSecondEl.addEventListener("input", () => {
  const reverseRate = worthSecondEl.value / worthFirstEl.value;
  worthFirstEl.value = (worthSecondEl.value / reverseRate).toFixed(2);
});

// رویدادهای تغییر
currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);