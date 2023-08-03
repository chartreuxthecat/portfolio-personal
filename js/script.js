var words = ["Web Developer", "UI/UX Consultant"];

var counter = 0;
var currentIndex = getRandomInt(0, words.length - 1);
var text = document.querySelector("#type-it");

var stepInterval = setInterval(() => {
  step();
}, 200);
var delInterval = null;
var delTimeout = null;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delIntervalCallback() {
  delInterval = setInterval(() => {
    del();
  }, 100);
  clearTimeout(delTimeout);
}

function del() {
  if (counter == 0) {
    let newIndex = getRandomInt(0, words.length - 1);
    while (newIndex == currentIndex) {
      newIndex = getRandomInt(0, words.length - 1);
    }
    currentIndex = newIndex;
    clearInterval(delInterval);
    stepInterval = setInterval(() => {
      step();
    }, 200);
  } else {
    text.textContent = text.textContent.slice(0, -1);
    counter--;
  }
}

function step() {
  if (counter >= words[currentIndex].length) {
    clearInterval(stepInterval);
    delTimeout = setTimeout(() => {
      delIntervalCallback();
    }, 2000);
  } else {
    text.textContent += words[currentIndex][counter];
    counter++;
  }
}

// Portfolio Lightbox

const portfolioBoxBtn = document.querySelectorAll(".portfolio-box .slider-btn");
const totalPortfolioBoxBtn = portfolioBoxBtn.length;
const portfolioBox = document.querySelectorAll(".portfolio-box"); // Define portfolioBox
const totalPortfolioBox = portfolioBox.length;
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

let itemIndex = 0;

for (let i = 0; i < totalPortfolioBoxBtn; i++) {
  portfolioBoxBtn[i].addEventListener("click", function () {
    itemIndex = i;
    toggleLightbox();
    changeItem();
  });
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  const imgSrc = portfolioBox[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
  lightboxImg.src = imgSrc;
}

function prevItem() {
  itemIndex = (itemIndex - 1 + totalPortfolioBox) % totalPortfolioBox;
  changeItem();
}

function nextItem() {
  itemIndex = (itemIndex + 1) % totalPortfolioBox;
  changeItem();
}
lightboxClose.addEventListener("click", function () {
  closeLightbox();
});

function closeLightbox() {
  toggleLightbox();
}

lightboxImg.addEventListener("click", function () {
  itemIndex = (itemIndex + 1) % totalPortfolioBox;
  changeItem();
});

lightbox.addEventListener("click", function (event) {
  if (event.target == lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    closeLightbox();
  }
});
