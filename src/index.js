import './styles/index.css';
import Api from './components/Api.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithSubmit from './components/PopupWithSubmit.js';
import UserInfo from './components/UserInfo.js';

import {
  userInfoPopupSelector,
  newCardPopupSelector,
  previewPopupSelector,
  submitCardDeletePopupSelector,
  editAvatarPopupSelector,
  editButton,
  addButton,
  avatarButton,
  nameInput,
  jobInput,
  cardListSection,
  formList,
  formConfig,
  formClassObjects
} from './utils/constants.js';

// Класс API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: '712fd04e-06f2-4f3f-845a-27863088c0b7',
    'Content-Type': 'application/json'
  },
});

// Класс информации о пользователе
const userInfoClass = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
})

// Класс попапа для редактирования информации о пользователе
const userInfoPopup = new PopupWithForm({
  popupSelector: userInfoPopupSelector,
  formClassObjects,
  handleFormSubmit: (data) => {
    api
      .editUserInfo(data)
      .then(data => {
        userInfoClass.setUserInfo(data);
        userInfoPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => { userInfoPopup.renderLoading(false) })
  }
});

// Класс попапа для редактирования аватара
const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarPopupSelector,
  formClassObjects,
  handleFormSubmit: (data) => {
    api
      .updateAvatar(data)
      .then(data => {
        userInfoClass.setUserInfo(data);
        editAvatarPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => { editAvatarPopup.renderLoading(false) })
  }
})

// Предварительная загрузка карточек
const cardList = new Section({
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: () => {
        previewPopup.open(item);
      },
      handleDeleteClick: () => {
        submitCardDeletePopup.open(card);
      },
      handleLikeClick: (likeElement, cardId) => {
        if (likeElement.classList.contains('card__button-like_active')) {
          api
            .like(cardId)
            .then(cardData => {
              card.updateLikesCount(cardData.likes.length);
            })
            .catch(err => console.log(err))
        } else {
          api
            .dislike(cardId)
            .then(cardData => {
              card.updateLikesCount(cardData.likes.length);
            })
            .catch(err => console.log(err))
        }
      }
    },
      '#card-template');
    const cardElement = card.generateCard(userInfoClass.userId);

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
  formClassObjects,
  handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then(cardData => {
        cardList.renderer(cardData);
        newCardPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => { newCardPopup.renderLoading(false) })
  }
});

// Класс попапа для подтверждения удаления карточки
const submitCardDeletePopup = new PopupWithSubmit({
  popupSelector: submitCardDeletePopupSelector,
  handleFormSubmit: (cardClass) => {
    const cardId = cardClass._item._id;
    api
      .deleteCard(cardId)
      .then(() => {
        cardClass._element.remove();
      })
      .catch(err => console.log(err))
  }
})

// Активация валидации форм
formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  const formName = formElement.attributes['name'].value;
  form.enableValidation();
  // Необходимо для доступа к объекту класса формы в глобальном лексическом окружении
  formClassObjects[formName] = form;
});

previewPopup.setEventListeners();
newCardPopup.setEventListeners();
userInfoPopup.setEventListeners();
editAvatarPopup.setEventListeners();
submitCardDeletePopup.setEventListeners();

addButton.addEventListener('click', () => { newCardPopup.open() });
editButton.addEventListener('click', () => {
  const { currentName, currentJob } = userInfoClass.getUserInfo();
  nameInput.value = currentName;
  jobInput.value = currentJob;
  userInfoPopup.open()
});
avatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
})

userInfoClass.hideProfileInfoSection(true);
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    userInfoClass.setUserInfo(userInfo);
    userInfoClass.hideProfileInfoSection(false);
    cardList.renderItems(cards.reverse());
  })



