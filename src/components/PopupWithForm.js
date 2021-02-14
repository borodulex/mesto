import Popup from './Popup.js';
import { formClassObjects } from '../utils/constants.js';

export default class PopupWithFrom extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupContainer = this._popupElement.querySelector('.popup__container');
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formName = this._formElement.attributes['name'].value;
  }

  _getInputValues() {
    const data = {};
    const inputs = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    // предотвращение всплытия
    this._popupContainer.addEventListener('click', evt => evt.stopPropagation());

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();

    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
      const formClassObject = formClassObjects[this._formName];
      formClassObject.hideInputError(inputElement);
    });
    this._formElement.reset();

    formClassObjects[this._formName].toggleButtonState();
  }
}
