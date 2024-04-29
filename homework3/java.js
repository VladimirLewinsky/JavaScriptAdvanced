const key = "qd2qEaw2Dvqc46OZqke6uUqEe5ThuyaWc2v_6NKehdU";
const url = `https://api.unsplash.com/photos/random/?client_id=${key}`;

const randomImg = document.querySelector(".photo");
const photoName = document.querySelector(".name");
const likeButton = document.querySelector(".like");
const counterLikes = document.querySelector(".like_counter");
const backButton = document.querySelector(".back");

// ключи для Localstarage
const lokalKey = "Total Likes";
const photoKey = "All Photo";

// массив для хранения фото
let photosArray = [];
// счетчик для массива
let counter = 2;

// Загружаем колличество Like
if (!localStorage.getItem(lokalKey)) {
  localStorage.setItem(lokalKey, counterLikes.textContent);
} else {
  counterLikes.textContent = localStorage.getItem(lokalKey);
}

// получаем рандомную картинку
let rphoto = await randomPhoto();
setPhoto(rphoto);

// загружаем фото в localstorage

if (!localStorage.getItem(photoKey)) {
  photosArray.push(rphoto);

  saveLocalStorage(photoKey, photosArray);
} else {
  // проверить
  photosArray = JSON.parse(localStorage.getItem(photoKey));
  photosArray.push(rphoto);
  saveLocalStorage(photoKey, photosArray);
}

// функция для сохранения в LS
function saveLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

// функция для получения через фетч рандомной фотки

// function randomPhoto() {
//   const imgphoto = fetch(url).then((photo) => photo.json());
//   return imgphoto;
// }
async function randomPhoto() {
  const imgphoto = await fetch(url);
  if (imgphoto.ok) {
    let photo = await imgphoto.json();
    return photo;
  } else {
    alert("Ошибка");
  }
}
// функция для отрисовки фото в HTML
function setPhoto(photo) {
  console.log(photo);
  randomImg.src = photo.urls.small;
  photoName.textContent = photo.user.name;
  //   добавляем стиль если уже лайкали это фото
  if (likeButton.classList.contains("liked")) {
    likeButton.classList.remove("liked");
  }
  if (photo.like === true) {
    likeButton.classList.add("liked");
  }
}

// Кнопка добавление Like
likeButton.addEventListener("click", () => {
  if (likeButton.classList.contains("liked")) {
    counterLikes.textContent = Number(counterLikes.textContent) - 1;
    localStorage.setItem(lokalKey, counterLikes.textContent);
    likeButton.classList.remove("liked");

    // проверка на каком фото сейчас находимся
    if (counter === 2) {
      rphoto.like = false;
      photosArray[-1] = rphoto;
    } else {
      let index = photosArray.indexOf(
        photosArray[photosArray.length - counter + 1]
      );
      photosArray[index].like = false;
      photosArray[index] = photosArray[index];
    }

    saveLocalStorage(photoKey, photosArray);
  } else {
    likeButton.classList.add("liked");
    counterLikes.textContent = Number(counterLikes.textContent) + 1;
    localStorage.setItem(lokalKey, counterLikes.textContent);

    // проверка на каком фото сейчас находимся
    if (counter === 2) {
      rphoto.like = true;
      photosArray[-1] = rphoto;
    } else {
      let index = photosArray.indexOf(
        photosArray[photosArray.length - counter + 1]
      );
      photosArray[index].like = true;
      photosArray[index] = photosArray[index];
    }

    saveLocalStorage(photoKey, photosArray);
  }
});

// проверка для активации кнопки Предыдущие фото
if (counter > photosArray.length) {
  backButton.disabled = true;
}
// Действие Предыдущие фото
backButton.addEventListener("click", () => {
  if (counter >= photosArray.length) {
    backButton.disabled = true;
  }

  let lastItem = photosArray[photosArray.length - counter];

  setPhoto(lastItem);
  saveLocalStorage(photoKey, photosArray);
  counter++;
});
