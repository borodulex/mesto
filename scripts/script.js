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
    const popupCaption = popupPreview.querySelector(".popup__caption");
    const popupImage = popupPreview.querySelector(".popup__image");

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

// Открытие попапа при нажатии на кнопку редактирования
function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Закрытие попапа при нажатии на кнопку крестика
function closePopup(popupElement) {
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

