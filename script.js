"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//button scrolling

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// sticky menu
const initialCoords = section1.getBoundingClientRect();
window.addEventListener("scroll", function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

//reveal section
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// lazy loading img

const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTarget.forEach((img) => imgObserver.observe(img));

// slider

const slides = document.querySelectorAll(".slide");

const slider = document.querySelector(".slider");
let currentSlide = 0;
const maxSlide = slides.length;

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class = "dots__dot" data-slide="${i}" ></button>`
    );
  });
};

createDots();

const activeDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activeDots(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
};

const prevSlides = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activeDots(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlides);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlides();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
  }
});

// ******************************** ******************************** Practice Code for this project  ******************************** ********************************

// const h1 = document.querySelector("h1");
// console.log(h1.querySelectorAll("highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "blue";

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//   'We use cookie for improved functionality and analytics <button class = "btn btn--close-cookie">Got it </button>';
// header.append(message);
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });
// message.style.backgroundColor = "#37383d";
// message.style.width = "104%";
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";
// document.documentElement.style.setProperty("--color-primary", "orangered");

// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);

// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener("click", function () {
//   section1.scrollIntoView({ behavior: "smooth" });
// });

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
