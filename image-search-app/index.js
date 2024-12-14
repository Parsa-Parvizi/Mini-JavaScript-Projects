const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const loadingSpinnerEl = document.getElementById("loading-spinner");

let inputData = "";
let page = 1;

function showLoading() {
  loadingSpinnerEl.style.display = "block";
}

function hideLoading() {
  loadingSpinnerEl.style.display = "none";
}

function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

async function searchImages() {
  inputData = searchInputEl.value;
  showLoading();
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  hideLoading();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  if (results.length > 0) {
    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    showMoreButtonEl.style.display = "block";
  } else {
    showMoreButtonEl.style.display = "none";
  }

  page++;

  saveSearchHistory(inputData);
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

function loadSearchHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history.forEach((query) => {
    const historyItem = document.createElement("div");
    historyItem.textContent = query;
    historyItem.classList.add("history-item");
    historyItem.addEventListener("click", () => {
      searchInputEl.value = query;
      page = 1;
      searchImages();
    });
    document.querySelector(".search-history").appendChild(historyItem);
  });
}

loadSearchHistory();
