let popupNode = document.querySelector(".popup");
let profileNode = document.querySelector(".profile");

let editButton = profileNode.querySelector(".profile__button-edit");
let closeButton = popupNode.querySelector(".popup__button-close");

let nameElement = profileNode.querySelector(".profile__title");
let jobElement = profileNode.querySelector(".profile__subtitle");

let nameInput = popupNode.querySelector(".popup__input_type_name");
let jobInput = popupNode.querySelector(".popup__input_type_job");

let formElement = popupNode.querySelector(".popup__form");

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

const cardTemplate = document.querySelector('#card-template');
const cardsNode = document.querySelector('.cards__grid');

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.content.cloneNode(true); // ? Почему cardElement === null если вынести эту строку вне тела фунцкции
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardsNode.append(cardElement);
});

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

//Функционал popup
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



//ТЕСТОВЫЙ ПОЛИГОН




