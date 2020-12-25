const popupEdit = document.querySelector(".popup_type_profile-edit");
const popupNewItem = document.querySelector(".popup_type_card-add");
const popupPreview = document.querySelector(".popup_type_preview");
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

const popupCaption = popupPreview.querySelector(".popup__caption");
const popupImage = popupPreview.querySelector(".popup__image");

// Предварительная загрузка карточек при загрузке страницы
initialCards.forEach(function (item) {
  const placeName = item.name;
  const placeImgLink = item.link;
  const preparedCard = initCardElement(placeName, placeImgLink);
  cardsNode.append(preparedCard);
});

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
  const placeName = placeInput.value;
  const placeImgLink = linkInput.value;
  const preparedCard = initCardElement(placeName, placeImgLink);
  cardsNode.prepend(preparedCard);
  newItemFormElement.reset();
  closePopup(popupNewItem);
}

// Открытие попапа с превью при нажатии на изображение
function showPopupPreviewHandler(element) {
  element.querySelector(".card__image").addEventListener("click", evt => {
    const cardTitle = evt.target.parentElement.querySelector(".card__title").textContent;
    const cardImgSrc = evt.target.src;

    popupCaption.textContent = cardTitle;
    popupImage.src = cardImgSrc;
    popupImage.alt = cardTitle;

    showPopup(popupPreview);
  });
}

//Функция подготовки новой карточки
function initCardElement(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');

  cardTitleElement.textContent = name;
  cardImageElement.src = link;
  cardImageElement.alt = name;

  likeButtonHandler(cardElement);
  removeCardHandler(cardElement);
  showPopupPreviewHandler(cardElement);

  return cardElement;
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

//сброс формы и удаление ошибок при закрытии popup
function resetPopup(popupElement) {
  const popupForm = popupElement.querySelector('.popup__form');
  const formElement = popupElement.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input-error_visible');
    formError.textContent = '';
  })
  popupForm.reset();
}

// Открытие попапа
function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  //слушатель для закрытия попапа при нажатии на оверлей
  popupElement.addEventListener('click', closePopupByClickOnOverlay);
  //слушатель для закрытия попапа при нажатии на клавишу Escape
  document.addEventListener('keydown', closePopupByClickOnEscapeButton);
}

// Закрытие попапа
function closePopup(popupElement) {
  //снятие слушателя для закрытия попапа при нажатии на оверлей
  popupElement.removeEventListener('click', closePopupByClickOnOverlay);
  //снятие слушателя для закрытия попапа при нажатии на клавишу Escape
  document.removeEventListener('keydown', closePopupByClickOnEscapeButton);

  resetPopup(popupElement);

  popupElement.classList.remove("popup_opened");
}

// Функционал кнопки лайк
function likeButtonHandler(element) {
  element.querySelector(".card__button-like").addEventListener("click", evt => {
    evt.target.classList.toggle("card__button-like_active");
  });
}

// Функционал кнопки удаления карточки
function removeCardHandler(element) {
  element.querySelector(".card__button-remove").addEventListener("click", evt => {
    evt.target.closest(".card").remove();
  })
}

editButton.addEventListener("click", () => {
  //Автозаполнение полей ввода текущими значениями
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

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
closeButtonPopupPreview.addEventListener("click", () => {
  closePopup(popupPreview);
});
editFormElement.addEventListener("submit", editFormSubmitHandler);
newItemFormElement.addEventListener("submit", newItemFormSubmitHandler);




