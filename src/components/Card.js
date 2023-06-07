class Card {
  constructor({cardData, handleCardClick}, templateSelector, api) {
    this._template = this._getCardTemplate(templateSelector);
    this._name = this._template.querySelector('.element__name');
    this._image = this._template.querySelector('.element__image');
    this._handleCardClick = handleCardClick;
    this._data = cardData;
    this._api = api;
    this._id = cardData._id;

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
    this._api.deleteCard(this._id)
    .then(()=> console.log("Удалено"))
    .catch((err) => console.log("Somethig is wrong"));
    this._template.remove();
  };

  _handleLike = (evt) => {
    evt.stopPropagation();
    this._likeButton.classList.toggle('element__like-ico_active');
  };

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    this._image.addEventListener('click', this._handleCardClick.bind(this.data));
  }

  generateCard = () => {
    this._setEventListeners();
    return this._template;
  }

}

export default Card;