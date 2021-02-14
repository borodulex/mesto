export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      })
    })
  }

  hideInputError(inputElement) {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.toggleButtonState();
    })
    this._setEventListeners();
  }
}
