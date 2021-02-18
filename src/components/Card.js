export default class Card {
  constructor({ item, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector) {
    this._item = item;
    this._name = item.name;
    this._imgLink = item.link;
    this._likesCount = item.likes.length;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .firstElementChild
      .cloneNode(true);
  }

  generateCard(masterId) {
    this._element = this._getTemplate();
    this._masterId = masterId;
    this._likeButtonElement = this._element.querySelector('.card__button-like');

    const cardTitleElement = this._element.querySelector('.card__title');
    const cardImageElement = this._element.querySelector('.card__image');

    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._imgLink;
    cardImageElement.alt = this._name;

    this._checkLikeState();
    this.updateLikesCount(this._likesCount);

    if (this._ownerId !== this._masterId) {
      const cardDeleteButtonElement = this._element.querySelector('.card__button-remove');
      cardDeleteButtonElement.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => { this._handleCardClick() });
    this._element.querySelector('.card__button-like').addEventListener('click', evt => {
      this._toggleLikeButton(evt.target);
      this._handleLikeClick(evt.target, this._cardId);
    });
    if (this._ownerId === this._masterId) {
      this._element.querySelector('.card__button-remove').addEventListener('click', evt => {
        this._handleDeleteClick();
      });
    };
  }

  _toggleLikeButton(element) {
    element.classList.toggle("card__button-like_active");
  }

  _checkLikeState() {
    if (this._item.likes.findIndex(liker => liker._id === this._masterId) !== -1) {
      this._toggleLikeButton(this._likeButtonElement);
    }
  }

  updateLikesCount(likesCount) {
    const cardCountElement = this._element.querySelector('.card__counter');
    cardCountElement.textContent = likesCount;
  }
}
