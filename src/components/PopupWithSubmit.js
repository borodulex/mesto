import Popup from './Popup.js';

export default class PopupWithFrom extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupContainer = this._popupElement.querySelector('.popup__container');
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    // предотвращение всплытия
    this._popupContainer.addEventListener('click', evt => evt.stopPropagation());

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this.currentCardClass);
      this.close();
    });
  }

  open = (cardClass) => {
    super.open();
    this.currentCardClass = cardClass;
  }
}
