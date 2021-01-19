import { initialCards } from './initial-cards.js';
import Card from './Card.js';

const popupEdit = document.querySelector(".popup_type_profile-edit");
const popupNewItem = document.querySelector(".popup_type_card-add");
export const popupPreview = document.querySelector(".popup_type_preview");
const profileNode = document.querySelector(".profile");
const cardsNode = document.querySelector('.cards__grid');

const cardTemplate = document.querySelector('#card-template');

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


//------------------------PRELOAD CARDS-----------------------------

initialCards.forEach(item => {
  const card = new Card(item, '#card-template', showPopup);
  const cardElement = card.generateCard();
  cardsNode.append(cardElement);
});


//------------------------POPUP HANDLERS-----------------------------

export function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");

  popupElement.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener('keyup', closePopupByClickOnEscapeButton);
}

function closePopup(popupElement) {
  popupElement.removeEventListener('click', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByClickOnEscapeButton);

  if (!popupElement.classList.contains('popup_type_preview')) {
    resetPopup(popupElement);
  }

  popupElement.classList.remove("popup_opened");
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopupByClickOnEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function resetPopup(popupElement) {
  const formElement = popupElement.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input-error_visible');
    formError.textContent = '';
  })
  formElement.reset();
}

closeButtonPopupPreview.addEventListener("click", () => {
  closePopup(popupPreview);
});


//------------------------EDIT POPUP---------------------------------

//Функционал popupEdit
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(popupEdit);
}

editButton.addEventListener("click", () => {

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  showPopup(popupEdit);
});

editFormElement.addEventListener("submit", editFormSubmitHandler);

closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});


//-------------------NEW ITEM POPUP-----------------------

//Функционал popupNewItem
function newItemFormSubmitHandler(evt) {
  evt.preventDefault();

  const data = {};
  data.name = placeInput.value;
  data.link = linkInput.value;
  const card = new Card(data, '#card-template', showPopup);

  const cardElement = card.generateCard();
  cardsNode.prepend(cardElement);

  evt.target.reset();
  closePopup(popupNewItem);
}

addButton.addEventListener("click", () => {
  showPopup(popupNewItem);
});

closeButtonPopupNewItem.addEventListener("click", () => {
  closePopup(popupNewItem);
});

newItemFormElement.addEventListener("submit", newItemFormSubmitHandler);

