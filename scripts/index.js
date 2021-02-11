import { initialCards } from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import {
  userInfoPopupSelector,
  newCardPopupSelector,
  previewPopupSelector,
  editButton,
  addButton,
  nameInput,
  jobInput,
  cardListSection,
  formList,
  formConfig,
  formClassObjects
} from './utils/constants.js';

// Предварительная загрузка карточек
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: () => {
        previewPopup.open(item);
      }
    },
      '#card-template');
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
},
  cardListSection
);

cardList.renderItems();

// Класс попапа для предварительного просмотра изображения карточки
const previewPopup = new PopupWithImage(previewPopupSelector);
previewPopup.setEventListeners();

// Класс попапа для добавления новой карточки
const newCardPopup = new PopupWithForm({
  popupSelector: newCardPopupSelector,
  formHandler: (item) => {
    const card = new Card({
      item,
      handleCardClick: () => {
        previewPopup.open(item);
      }
    },
      '#card-template');
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
});
newCardPopup.setEventListeners();
addButton.addEventListener('click', newCardPopup.open.bind(newCardPopup));

// Класс информации о пользователе
const userInfoClass = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle'
})

// Класс попапа для редактирования информации о пользователе
const userInfoPopup = new PopupWithForm({
  popupSelector: userInfoPopupSelector,
  formHandler: (data) => {
    userInfoClass.setUserInfo(data);
  }
});
userInfoPopup.setEventListeners();
editButton.addEventListener('click', () => {
  const { currentName, currentJob } = userInfoClass.getUserInfo();
  nameInput.value = currentName;
  jobInput.value = currentJob;
  userInfoPopup.open()
});

// Активация валидации форм
formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  const formName = form._form.name;

  form.enableValidation();

  //необходимо для доступа к объекту класса формы в глобальном лексическом окружении
  formClassObjects[formName] = form;
});
