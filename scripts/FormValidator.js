class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = this._getInputArray();
    this._buttonElement = this._getButton();
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _getInputArray = () => {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _getButton = () => {
    return this._formElement.querySelector(this._submitButtonSelector);
  }

  _toggleButtonState = (buttonElement) => {
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formElement.reset();
      this._toggleButtonState(this._buttonElement);
    });

    this._toggleButtonState(this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._buttonElement);
      });
    });
  };

  enableValidation = () => {
    const form = document.querySelector(this._formSelector);
    this._setEventListeners(form);
  };
}

export default FormValidator