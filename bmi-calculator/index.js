const historyList = document.getElementById("history-list");
const bmiChartCtx = document.getElementById("bmi-chart").getContext("2d");
let bmiHistory = [];

const bmiChart = new Chart(bmiChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'BMI History',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Calculations'
        }
      },
      y: {
        title: {
          display: true,
          text: 'BMI'
        }
      }
    }
  }
});

function calculateBMI() {
  const heightValue = document.getElementById("height").value / 100;
  const weightValue = document.getElementById("weight").value;

  const bmiValue = weightValue / (heightValue * heightValue);
  document.getElementById("bmi-result").value = bmiValue.toFixed(2);

  let weightConditionEl = document.getElementById("weight-condition");
  if (bmiValue < 18.5) {
    weightConditionEl.innerText = "Under weight";
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    weightConditionEl.innerText = "Normal weight";
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    weightConditionEl.innerText = "Overweight";
  } else {
    weightConditionEl.innerText = "Obesity";
  }

  bmiHistory.push(bmiValue);
  const historyItem = document.createElement("li");
  historyItem.innerText = `BMI: ${bmiValue.toFixed(2)} - ${new Date().toLocaleString()}`;
  historyItem.addEventListener("click", () => {
    historyList.removeChild(historyItem);
    updateChart();
  });
  historyList.appendChild(historyItem);

  updateChart();
}

function updateChart() {
  bmiChart.data.labels.push(historyList.children.length);
  bmiChart.data.datasets[0].data.push(bmiHistory[bmiHistory.length - 1]);
  bmiChart.update();
}

document.getElementById("btn").addEventListener("click", calculateBMI);