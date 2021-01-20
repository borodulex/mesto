import { popupPreview, popupCaption, popupImage } from './index.js';

export default class Card {
  constructor(data, cardSelector, showPopup) {
    this._name = data.name;
    this._imgLink = data.link;
    this._cardSelector = cardSelector;
    this._showPopup = showPopup;
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
    this._element.querySelector('.card__image').addEventListener('click', evt => {
      this._handlePreviewPopup(evt.target);
    });
    this._element.querySelector('.card__button-remove').addEventListener('click', evt => {
      this._handleRemoveButton(evt.target);
    });
    this._element.querySelector('.card__button-like').addEventListener('click', evt => {
      this._handleLikeButton(evt.target);
    });
  }

  _handlePreviewPopup(element) {
    const cardTitle = element.parentElement.querySelector('.card__title').textContent;
    const cardImgSrc = element.src;

    popupCaption.textContent = cardTitle;
    popupImage.src = cardImgSrc;
    popupImage.alt = cardTitle;

    this._showPopup(popupPreview);
  }

  _handleRemoveButton(element) {
    element.closest(".card").remove();
  }

  _handleLikeButton(element) {
    element.classList.toggle("card__button-like_active");
  }

}
