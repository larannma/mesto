import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    super.setEventListeners();
    this._image = this._popup.querySelector(".popup__image");
    this._subtitle = this._popup.querySelector(".popup__image-text");
  }

  open({link, name}) {
    this._image.src = link;
    this._image.alt = name;
    this._subtitle.textContent = name;
    super.open();
  }
}