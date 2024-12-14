const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const loadingSpinnerEl = document.getElementById("loading-spinner");

let inputData = "";
let page = 1;

// تابع برای نمایش بارگذاری
function showLoading() {
  loadingSpinnerEl.style.display = "block";
}

// تابع برای پنهان کردن بارگذاری
function hideLoading() {
  loadingSpinnerEl.style.display = "none";
}

// تابع برای ذخیره تاریخچه جستجو
function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

async function searchImages() {
  inputData = searchInputEl.value;
  showLoading(); // نمایش بارگذاری
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  hideLoading(); // پنهان کردن بارگذاری

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

    // نمایش دکمه "Show More" اگر نتایج وجود داشته باشد
    showMoreButtonEl.style.display = "block";
  } else {
    // اگر نتایج وجود نداشته باشد، دکمه را پنهان کنید
    showMoreButtonEl.style.display = "none";
  }

  page++;

  // ذخیره تاریخچه جستجو
  saveSearchHistory(inputData);
}

// رویداد برای ارسال فرم
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// رویداد برای دکمه "Show More"
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

// بارگذاری تاریخچه جستجو
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

// بارگذاری تاریخچه جستجو در بارگذاری صفحه
loadSearchHistory();