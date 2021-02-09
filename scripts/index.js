import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

const popupEdit = document.querySelector(".popup_type_profile-edit");
const popupNewItem = document.querySelector(".popup_type_card-add");
export const popupPreview = document.querySelector(".popup_type_preview");

const profileNode = document.querySelector(".profile");
const cardsNode = document.querySelector('.cards__grid');

const cardListSection = '.cards__grid';

const editButton = profileNode.querySelector(".profile__button-edit");
const addButton = profileNode.querySelector(".profile__button-add");
const closeButtonPopupEdit = popupEdit.querySelector(".popup__button-close");
const closeButtonPopupNewItem = popupNewItem.querySelector(".popup__button-close");
const closeButtonPopupPreview = popupPreview.querySelector(".popup__button-close");

const nameElement = profileNode.querySelector(".profile__title");
const jobElement = profileNode.querySelector(".profile__subtitle");

const editFormElement = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");

const newItemFormElement = popupNewItem.querySelector(".popup__form");
const placeInput = popupNewItem.querySelector(".popup__input_type_place");
const linkInput = popupNewItem.querySelector(".popup__input_type_link");

export const popupCaption = popupPreview.querySelector(".popup__caption");
export const popupImage = popupPreview.querySelector(".popup__image");

const formList = Array.from(document.querySelectorAll('.popup__form'));
const formConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const formClassObjects = {};

// Предварительная загрузка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', showPopup);
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
},
  cardListSection
);

cardList.renderItems();


/* initialCards.forEach(item => {
  const card = new Card(item, '#card-template', showPopup);
  const cardElement = card.generateCard();
  cardsNode.append(cardElement);
}); */

// Закрытие открытого попапа при клике на оверлей
function closePopupByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    if (evt.target.classList.contains('popup_type_preview')) {
      closePopup(evt.target);
    } else {
      closePopupWithForm(evt.target);
    }
  }
}

// Закрытие открытого попапа при нажатии клавишу Esc
function closePopupByClickOnEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup.classList.contains('popup_type_preview')) {
      closePopup(openedPopup);
    } else {
      closePopupWithForm(openedPopup);
    }
  }
}

// Очистка формы (используется при закрытии попапа)
function resetPopup(popupElement) {
  const formElement = popupElement.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const formClassObject = formClassObjects[formElement.name];
    formClassObject.hideInputError(inputElement);
  })
  formElement.reset();
}

// Отображение попапа
export function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");

  popupElement.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener('keyup', closePopupByClickOnEscapeButton);
}

// Скрытие попапа
function closePopup(popupElement) {
  popupElement.removeEventListener('click', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByClickOnEscapeButton);

  popupElement.classList.remove("popup_opened");
}

// Скрытие попапа с формой
function closePopupWithForm(popupElement) {
  resetPopup(popupElement);
  closePopup(popupElement);
}

// Функционал кнопки попапа редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(popupEdit);
}

// Функционал кнопки попапа добавления новой карточки
function newItemFormSubmitHandler(evt) {
  evt.preventDefault();

  const data = {};
  data.name = placeInput.value;
  data.link = linkInput.value;
  const card = new Card(data, '#card-template', showPopup);

  const cardElement = card.generateCard();
  cardsNode.prepend(cardElement);

  evt.target.reset();

  closePopupWithForm(popupNewItem);
}

// Активация валидации форм
formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  const formName = form._form.name;

  form.enableValidation();

  //необходимо для доступа к объекту класса формы в глобальном лексическом окружении
  formClassObjects[formName] = form;
});

closeButtonPopupPreview.addEventListener("click", () => {
  closePopup(popupPreview);
});

closeButtonPopupEdit.addEventListener("click", () => {
  closePopupWithForm(popupEdit);
});

closeButtonPopupNewItem.addEventListener("click", () => {
  closePopupWithForm(popupNewItem);
});

editButton.addEventListener("click", () => {

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  showPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  showPopup(popupNewItem);
});

editFormElement.addEventListener("submit", editFormSubmitHandler);
newItemFormElement.addEventListener("submit", newItemFormSubmitHandler);
