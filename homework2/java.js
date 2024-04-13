const buttonNext = document.querySelector(".next");
const buttonPrevious = document.querySelector(".previos");
const img = document.querySelector(".img");
const path = "http://127.0.0.1:5500/lesson1/homework2/";
const array = [
  "img/16858714095270.jpg",
  "img/16873830453690.jpg",
  "img/16916052930370.jpg",
  "img/b8381e4ab7989d66a519fc6534a9.webp",
];

let imgArray = array.map((el) => {
  return path + el;
});


// переключение кнопок
buttonNext.addEventListener("click", () => {
  if (imgArray.indexOf(`${img.src}`) === imgArray.length - 1) {
    img.src = imgArray[0];
  } else {
    const i = imgArray.indexOf(`${img.src}`);
    img.src = imgArray[i + 1];
  }
  addClassActive(dota);
});

buttonPrevious.addEventListener("click", () => {
  if (imgArray.indexOf(`${img.src}`) === 0) {
    img.src = imgArray[imgArray.length - 1];
  } else {
    const i = imgArray.indexOf(`${img.src}`);
    img.src = imgArray[i - 1];
  }
  addClassActive(dota);
});
// добавление логики класса актив в кнопки
function addClassActive(array) {
  if (array.find((item) => item.classList.contains("active")) || undefined) {
    array
      .find((item) => item.classList.contains("active"))
      .classList.remove("active");

    array[imgArray.indexOf(`${img.src}`)].classList.add("active");
  } else {
    array[imgArray.indexOf(`${img.src}`)].classList.add("active");
  }
}

const carousel = document.querySelector(".carousel-indicators");
const [...dota] = document.querySelectorAll(".dota");


// Навигационные точки
dota.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (
      [...dota].find((item) => item.classList.contains("active")) ||
      undefined
    ) {
      [...dota]
        .find((item) => item.classList.contains("active"))
        .classList.remove("active");
      e.target.classList.add("active");
    } else e.target.classList.add("active");

    img.src = imgArray[dota.indexOf(element)];
  });
});
