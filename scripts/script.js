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
  popupNode.classList.add("popup_opened");

  //Автозаполнение полей ввода текущими значениями
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

// Закрытие попапа при нажатии на кнопку крестика
function closePopup() {
  popupNode.classList.remove("popup_opened");
}

//Функцилнал popup
function formSubmitHandler(evt) {
  //Отмена стандартной отправки формы
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
