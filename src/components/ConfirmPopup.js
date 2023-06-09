import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__submit-btn');
  }

  getCardData(cardData, temp){
    this._cardID = cardData._id;
    this._temp = temp;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      this._submitCallback(this._cardID, this._temp);
      this.close();
    });
  }
}