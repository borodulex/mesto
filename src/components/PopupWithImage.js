import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCaption = this._popupElement.querySelector('.popup__caption');
    this._popupImage = this._popupElement.querySelector('.popup__image');
  }

  setEventListeners() {
    this._popupImage.addEventListener('click', evt => evt.stopPropagation());
    super.setEventListeners();
  }

  open(item) {
    this._popupCaption.textContent = item.name;
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;

    super.open();
  }
}
