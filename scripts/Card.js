/* import { popupPreview, popupCaption, popupImage } from './index.js'; */

export default class Card {
  constructor({ item, handleCardClick }, cardSelector) {
    this._item = item;
    this._name = item.name;
    this._imgLink = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardTitleElement = this._element.querySelector('.card__title');
    const cardImageElement = this._element.querySelector('.card__image');

    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._imgLink;
    cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => { this._handleCardClick() });
    this._element.querySelector('.card__button-remove').addEventListener('click', evt => {
      this._handleRemoveButton(evt.target);
    });
    this._element.querySelector('.card__button-like').addEventListener('click', evt => {
      this._handleLikeButton(evt.target);
    });
  }

  /*   _handlePreviewPopup(element) {
      popupCaption.textContent = this._name;
      popupImage.src = this._imgLink;
      popupImage.alt = this._name;

      this._showPopup(popupPreview);
    } */

  _handleRemoveButton(element) {
    element.closest(".card").remove();
  }

  _handleLikeButton(element) {
    element.classList.toggle("card__button-like_active");
  }

}
