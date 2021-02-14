export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__button-close');
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);
  }

  close() {
    this._popupElement.removeEventListener('click', this.close);
    document.removeEventListener('keyup', this._handleEscClose);

    this._popupElement.classList.remove('popup_opened');
  }

  open() {
    this._popupElement.classList.add('popup_opened');

    document.addEventListener('keyup', this._handleEscClose);
    this._popupElement.addEventListener('click', this.close);
  }
}
