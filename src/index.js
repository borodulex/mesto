import './styles/index.css';
import { initialCards } from './utils/initialCards.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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

// Класс попапа для предварительного просмотра изображения карточки
const previewPopup = new PopupWithImage(previewPopupSelector);

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

// Активация валидации форм
formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  const formName = form._form.name;

  form.enableValidation();

  //необходимо для доступа к объекту класса формы в глобальном лексическом окружении
  formClassObjects[formName] = form;
});

cardList.renderItems();

previewPopup.setEventListeners();
newCardPopup.setEventListeners();
userInfoPopup.setEventListeners();

addButton.addEventListener('click', newCardPopup.open.bind(newCardPopup));
editButton.addEventListener('click', () => {
  const { currentName, currentJob } = userInfoClass.getUserInfo();
  nameInput.value = currentName;
  jobInput.value = currentJob;
  userInfoPopup.open()
});
