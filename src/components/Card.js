class Card {
  constructor({cardData, userData, handleCardClick, handleDeleteIconClick}, templateSelector, api) {
    this._template = this._getCardTemplate(templateSelector);
    this._name = this._template.querySelector('.element__name');
    this._image = this._template.querySelector('.element__image');
    this._likeCountProperty = this._template.querySelector('.element__like-count');
    this._handleCardClick = handleCardClick;
    this._data = cardData;
    this._api = api;
    this._id = cardData._id;
    this._cardOwner = cardData.owner._id
    this._userId = userData._id
    this._likesAmount = cardData.likes.length
    this._cardId = cardData._id;
    this._userData = userData;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._name.textContent = cardData.name;
    this._image.src = cardData.link;
    this._image.alt = cardData.name;

    this._deleteButton = this._template.querySelector('.element__trash');
    this._likeButton = this._template.querySelector('.element__like-ico');
  }

  _getCardTemplate = (templateSelector) => {
    return templateSelector.content.querySelector(".element").cloneNode(true);
  }

  _disableTrashButton(){
    this._deleteButton.style.display = "none";
  }

  _handleDelete = (evt) => {
    // evt.stopPropagation();
    // this._api.deleteCard(this._id)
    // .then(()=> console.log("Удалено"))
    // .catch((err) => console.log(`Somethig is wrong ${err}`));
    // this._template.remove();
  };

  _handleLike = (evt) => {
    evt.stopPropagation();
    if (this._likeButton.classList.contains('element__like-ico_active')){
      this._api.deleteLike(this._userData, this._cardId).then((res) => {
        this._likesAmount = res.likes.length
        this._likeCountProperty.textContent = this._likesAmount;
      });
    }else{
      this._api.putLike(this._userData, this._cardId).then((res) => {
        this._likesAmount = res.likes.length
        this._likeCountProperty.textContent = this._likesAmount;
      });
    }
    this._likeButton.classList.toggle('element__like-ico_active');
  };

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this.data, this._template);
    });
    // this._deleteButton.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    this._image.addEventListener('click', this._handleCardClick.bind(this.data));
  }

  generateCard = () => {
    this._setEventListeners();
    this._likeCountProperty.textContent = this._likesAmount;
    if (this._cardOwner !== this._userId){
      this._disableTrashButton();
    }

    const hasTargetId = this._data.likes.some(like => like._id === this._userId);

    if (hasTargetId) {
      this._likeButton.classList.toggle('element__like-ico_active');
    }
    return this._template;
  }

}

export default Card;