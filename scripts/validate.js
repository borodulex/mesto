const showInputError = (formElement, inputElement, errorMessage, preset) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(preset['inputErrorClass']);
  formError.textContent = errorMessage;
  formError.classList.add(preset['errorClass']);
};

const hideInputError = (formElement, inputElement, preset) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(preset['inputErrorClass']);
  formError.classList.remove(preset['errorClass']);
  formError.textContent = '';
}

const isValid = (formElement, inputElement, preset) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, preset);
  } else {
    hideInputError(formElement, inputElement, preset);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, preset) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(preset['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(preset['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, preset) => {
  const inputList = Array.from(formElement.querySelectorAll(preset['inputSelector']));
  const buttonElement = formElement.querySelector(preset['submitButtonSelector']);

  toggleButtonState(inputList, buttonElement, preset);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, preset);
      toggleButtonState(inputList, buttonElement, preset);
    })
  })
}

const enableValidation = (preset) => {
  const formList = Array.from(document.querySelectorAll(preset['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, preset);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});

