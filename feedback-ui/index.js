const ratingEls = document.querySelectorAll(".rating");
const btnEl = document.getElementById("btn");
const containerEl = document.getElementById("container");

let selectedRating = "";

function addReviewButtonListener() {
  btnEl.addEventListener("click", () => {
    if (selectedRating !== "") {
      showFeedback();
    }
  });
}

function showFeedback() {
  containerEl.innerHTML = `
      <strong>Thank you!</strong>
      <br>
      <br>
      <strong>Feedback: ${selectedRating}</strong>
      <p>We'll use your feedback to improve our customer support.</p>
      <button class="btn" id="back-btn">Back to Home</button>
      `;

  const backBtn = document.getElementById("back-btn");
  backBtn.addEventListener("click", resetPage);
}

function resetPage() {
  selectedRating = "";
  containerEl.innerHTML = `
    <h1 class="heading">Feedback UI</h1>
    <div class="ratings-container" id="ratings-container">
      <div class="rating">
        <img src="https://cdn-icons-png.flaticon.com/512/166/166527.png" />
        <small>Unhappy</small>
      </div>
      <div class="rating">
        <img src="https://cdn-icons-png.flaticon.com/512/1791/1791385.png" />
        <small>Neutral</small>
      </div>
      <div class="rating">
        <img src="https://cdn-icons-png.flaticon.com/512/166/166538.png" />
        <small>Satisfied</small>
      </div>
    </div>
    <button class="btn" id="btn">Send Review</button>
  `;

  addReviewButtonListener();

  const newRatingEls = document.querySelectorAll(".rating");
  newRatingEls.forEach((ratingEl) => {
    ratingEl.classList.remove("active");
    ratingEl.addEventListener("click", (event) => {
      removeActive(newRatingEls);
      selectedRating =
        event.target.innerText || event.target.parentNode.innerText;
      event.target.classList.add("active");
      event.target.parentNode.classList.add("active");
    });
  });

  if (selectedRating) {
    showFeedback();
  }
}

ratingEls.forEach((ratingEl) => {
  ratingEl.addEventListener("click", (event) => {
    removeActive(ratingEls);
    selectedRating =
      event.target.innerText || event.target.parentNode.innerText;
    event.target.classList.add("active");
    event.target.parentNode.classList.add("active");
  });
});

addReviewButtonListener();

function removeActive(elements) {
  elements.forEach((ratingEl) => {
    ratingEl.classList.remove("active");
  });
}