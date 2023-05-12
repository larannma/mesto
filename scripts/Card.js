class Card {
  constructor(cardData, templateSelector, onClick) {
    this._template = this._getCardTemplate(templateSelector);
    this._name = this._template.querySelector('.element__name');
    this._image = this._template.querySelector('.element__image');
    this._onClick = onClick;
    this._data = cardData;

    this._name.textContent = cardData.name;
    this._image.src = cardData.link;
    this._image.alt = cardData.name;

    this._deleteButton = this._template.querySelector('.element__trash');
    this._likeButton = this._template.querySelector('.element__like-ico');
  }

  _getCardTemplate = (templateSelector) => {
    return templateSelector.content.querySelector(".element").cloneNode(true);
  }

  _handleDelete = (evt) => {
    evt.stopPropagation();
    this._template.remove();
  };

  _handleLike = (evt) => {
    evt.stopPropagation();
    this._likeButton.classList.toggle('element__like-ico_active');
  };

  _handleCardClick = () => {
    this._onClick(this._data);
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    this._image.addEventListener('click', this._handleCardClick);
  }

  generateCard = () => {
    this._setEventListeners();
    return this._template;
  }

}

export default Card;