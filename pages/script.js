let popupNode = document.querySelector(".popup");
let profileNode = document.querySelector(".profile");

let editButton = profileNode.querySelector(".profile__button-edit");
let closeButton = popupNode.querySelector(".popup__button-close");

let nameElement = profileNode.querySelector(".profile__title");
let jobElement = profileNode.querySelector(".profile__subtitle");

let nameInput = popupNode.querySelector(".popup__input_type_name");
let jobInput = popupNode.querySelector(".popup__input_type_job");

let formElement = popupNode.querySelector(".popup__form");

// Открытие попапа при нажатии на кнопку редактирования
function showPopup() {
  popupNode.classList.add("popup__opened");

  //Автозаполнение полей ввода текущими значениями
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

editButton.addEventListener("click", showPopup);

// Закрытие попапа при нажатии на кнопку крестика
function closePopup() {
  popupNode.classList.remove("popup__opened");
}

closeButton.addEventListener("click", closePopup);

//Функцилнал popup
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
