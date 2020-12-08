const popupEdit = document.querySelector(".popup_type_profile-edit");
const popupNewItem = document.querySelector(".popup_type_card-add");
const profile = document.querySelector(".profile");
const cardsNode = document.querySelector('.cards__grid');

const cardTemplate = document.querySelector('#card-template');

const editButton = profile.querySelector(".profile__button-edit");
const addButton = profile.querySelector(".profile__button-add");
const closeButtonPopupEdit = popupEdit.querySelector(".popup__button-close");
const closeButtonPopupNewItem = popupNewItem.querySelector(".popup__button-close");

const nameElement = profile.querySelector(".profile__title");
const jobElement = profile.querySelector(".profile__subtitle");

const editFormElement = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");

const newItemFormElement = popupNewItem.querySelector(".popup__form");
const placeInput = popupNewItem.querySelector(".popup__input_type_place");
const linkInput = popupNewItem.querySelector(".popup__input_type_link");

//Автозаполнение полей ввода текущими значениями
nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

// Предварительная загрузка карточек при загрузке
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.content.cloneNode(true); // ? Почему cardElement === null если вынести эту строку вне тела фунцкции
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardsNode.append(cardElement);
});

// Открытие попапа при нажатии на кнопку редактирования
function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Закрытие попапа при нажатии на кнопку крестика
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//Функционал popupEdit
function editFormSubmitHandler(evt) {
  //Отмена стандартной отправки формы
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(popupEdit);
}

//Функционал popupNewItem
function newItemFormSubmitHandler(evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = placeInput.value;
  cardElement.querySelector('.card__image').src = linkInput.value;
  cardsNode.prepend(cardElement);

  placeInput.value = "";
  linkInput.value = "";

  closePopup(popupNewItem);
}

editButton.addEventListener("click", () => {
  showPopup(popupEdit);
});
addButton.addEventListener("click", () => {
  showPopup(popupNewItem);
});
closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});
closeButtonPopupNewItem.addEventListener("click", () => {
  closePopup(popupNewItem);
});
editFormElement.addEventListener("submit", editFormSubmitHandler);
newItemFormElement.addEventListener("submit", newItemFormSubmitHandler);






