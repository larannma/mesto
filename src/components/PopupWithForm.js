import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback, inactiveButtonClass) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__text');
    this._submitButton = this._formElement.querySelector('.popup__submit-btn');
    this._inactiveButtonClass = inactiveButtonClass;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  open() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
    super.open();
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const originalText = this._submitButton.textContent;

    try {
      this._submitButton.textContent = 'Сохранение...';
      await this._submitCallback(this._getInputValues());
      this.close();
    } finally {
      this._submitButton.textContent = originalText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this.handleSubmit.bind(this));
  }
}