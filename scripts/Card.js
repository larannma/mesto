class Card {
  constructor(cardData, templateSelector, onClick) {
    this._Element = templateSelector.content.querySelector(".element").cloneNode(true);
    this._Name = this._Element.querySelector('.element__name');
    this._Image = this._Element.querySelector('.element__image');
    this._onClick = onClick;
    this._Data = cardData;

    this._Name.textContent = cardData.name;
    this._Image.src = cardData.link;
    this._Image.alt = cardData.name;

    this._deleteButton = this._Element.querySelector('.element__trash');
    this._likeButton = this._Element.querySelector('.element__like-ico');
  }

  _handleDelete = (evt) => {
    evt.stopPropagation();
    this._Element.remove();
  };

  _handleLike = (evt) => {
    evt.stopPropagation();
    this._likeButton.classList.toggle('element__like-ico_active');
  };

  _handleCardClick = () => {
    this._onClick(this._Data);
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    console.log("lol")
    this._Image.addEventListener('click', this._handleCardClick);
  }

  generateCard = () => {
    this._setEventListeners();
    return this._Element;
  }

}

export default Card;