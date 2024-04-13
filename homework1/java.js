const data = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 15,
        "myOpinion": "yes"
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5,
        "myOpinion": "no"
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15,
        "myOpinion": "yes"
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10,
        "myOpinion": "no"
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6,
        "myOpinion": "no"
    }
]`;

// база с занятиями

const container = document.querySelector(".container");

// запиcm в localStorage
const localStorageKey = "lessons";

if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, data);
} 
  let datalesson = JSON.parse(localStorage.getItem(localStorageKey));


// } else {
//   const datalesson2 = JSON.parse(localStorage.getItem(localStorageKey));
//   console.log(datalesson);
//   datalesson = datalesson2;
// }

function saveLocalStorage(array) {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
}
// конструктор для создания элементов
function lesson(element) {
  const lesson = document.createElement("div");
  lesson.className = "lesson";
  lesson.id = element.id;
  container.appendChild(lesson);

  const lessonName = document.createElement("h2");
  lessonName.textContent = element.name;
  lesson.appendChild(lessonName);

  const lessonTime = document.createElement("p");
  lessonTime.textContent = element.time;
  lesson.appendChild(lessonTime);

  const lessonMax = document.createElement("p");
  lessonMax.textContent = element.maxParticipants;
  lessonMax.classList = "max";
  lesson.appendChild(lessonMax);

  const lessonCurrent = document.createElement("p");
  lessonCurrent.textContent = element.currentParticipants;
  lessonCurrent.className = "Current";
  lesson.appendChild(lessonCurrent);

  const addButton = document.createElement("button");
  addButton.textContent = "Записаться";
  addButton.className = "add";
  lesson.appendChild(addButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Отменить запись";
  removeButton.className = "cancel";
  removeButton.disabled = true;
  lesson.appendChild(removeButton);
}

// создам элементы на сттранице

datalesson.forEach((element) => {
  lesson(element);
});

// ищем все кнопки добавить
const allAddButton = document.querySelectorAll(".add");

// Функция на проверку Записей

function checkParticipants(element) {
  if (
    Number(element.closest(".lesson").querySelector(".Current").textContent) ===
    Number(element.closest(".lesson").querySelector(".max").textContent)
  ) {
    element.disabled = true;
  }
}

allAddButton.forEach((element) => {
  // проверка на колличество записей
  checkParticipants(element);

  //   проверка на нажите кнопки до
  if (datalesson[element.closest(".lesson").id - 1].myOpinion === "yes") {
    element.disabled = true;
    element.closest(".lesson").querySelector(".cancel").disabled = false;
  }

  //
  element.addEventListener("click", () => {
    element.closest(".lesson").querySelector(".Current").textContent =
      Number(element.closest(".lesson").querySelector(".Current").textContent) +
      1;

    // выключение кнопки записаться
    element.disabled = true;
    element.closest(".lesson").querySelector(".cancel").disabled = false;

    element.closest(".lesson").id;

    // запись в массив

    datalesson[element.closest(".lesson").id - 1].currentParticipants += 1;
    // изменение статуса для базы данных
    datalesson[element.closest(".lesson").id - 1].myOpinion = "yes";

    saveLocalStorage(datalesson);
  });
});

// ищем все кнопки удалиить
const allCancelButton = document.querySelectorAll(".cancel");

allCancelButton.forEach((element) => {
  // проверка на состояние кнопки на случай если уже запись полная
  //   if (element.closest(".lesson").querySelector(".add").disabled === true) {
  //     element.disabled = false;
  //   }
  element.addEventListener("click", () => {
    element.closest(".lesson").querySelector(".Current").textContent =
      Number(element.closest(".lesson").querySelector(".Current").textContent) -
      1;

    //   выключение кнопки отменить запись
    element.disabled = true;
    element.closest(".lesson").querySelector(".add").disabled = false;

    // запись в массив
    console.log(datalesson);
    datalesson[element.closest(".lesson").id - 1].currentParticipants -= 1;

    datalesson[element.closest(".lesson").id - 1].myOpinion = "no";

    saveLocalStorage(datalesson);
  });
});

//
