export const userInfoPopupSelector = '.popup_type_profile-edit';
export const newCardPopupSelector = '.popup_type_card-add';
export const previewPopupSelector = '.popup_type_preview';

const popupEditNode = document.querySelector(".popup_type_profile-edit");
const profileNode = document.querySelector(".profile");
export const editButton = profileNode.querySelector(".profile__button-edit");
export const addButton = profileNode.querySelector(".profile__button-add");
export const nameInput = popupEditNode.querySelector(".popup__input_type_name");
export const jobInput = popupEditNode.querySelector(".popup__input_type_job");

export const cardListSection = '.cards__grid';

export const formList = Array.from(document.querySelectorAll('.popup__form'));
export const formConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const formClassObjects = {};
