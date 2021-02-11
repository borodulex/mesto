import Popup from './Popup.js';
import { formClassObjects } from './index.js';

export default class PopupWithFrom extends Popup {
  constructor({ popupSelector, formHandler }) {
    super(popupSelector);
    this._formHandler = formHandler;
    this._popupContainer = this._popupElement.querySelector('.popup__container');
    this._formElement = this._popupElement.querySelector('.popup__form');
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
    // предотвращение всплытия, перенести в наследовательный элемент
    this._popupContainer.addEventListener('click', evt => evt.stopPropagation());

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formHandler(this._getInputValues());
      this.close();
    });
  }


  close() {
    super.close();

    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
      const formClassObject = formClassObjects[this._formElement.name];
      formClassObject.hideInputError(inputElement);
    });
    this._formElement.reset();
  }
}
