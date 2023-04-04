const buttonEditProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".editPopup");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close-button");
const nameInput = editPopup.querySelector(".popup__text_type_name");
const interestsInput = editPopup.querySelector(".popup__text_type_interests");
const popupEditForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileInterests = document.querySelector(".profile__subtitle");
const cardTemplate = document.getElementById('card');
const cardContainer = document.querySelector(".elements");
const buttonAdd = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.addPopup');
const buttonCloseAddingPopup = cardAddPopup.querySelector(".popup__close-button");
const cardAddForm = cardAddPopup.querySelector('.popup__form');
const nameInputAddForm = cardAddForm.querySelector('.popup__text_type_name');
const photoLinkInput = cardAddForm.querySelector('.popup__text_type_photo-link');
const cardPopup = document.querySelector('.cardPopup');
const cardCloseCardPopup = cardPopup.querySelector('.popup__close-button');
const image = cardPopup.querySelector('.popup__image');
const subtitle = cardPopup.querySelector('.popup__image-text');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

buttonEditProfile.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
});

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(editPopup);
});

popupEditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const interests = interestsInput.value;

  profileName.textContent = name;
  profileInterests.textContent = interests;
  closePopup(editPopup);
});

cardCloseCardPopup.addEventListener('click', () => {
  closePopup(cardPopup);
});

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector(".element").cloneNode(true);
  const cardName = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__image');

  cardName.innerHTML = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__trash');
  const likeButton = cardElement.querySelector('.element__like-ico');

  const handleDelete = (evt) => {
    evt.stopPropagation();
    cardElement.remove();
  };

  const handleLike = (evt) => {
    evt.stopPropagation();
    likeButton.classList.toggle('element__like-ico_active');
  };

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

  cardImage.addEventListener('click', () => {
    image.src = cardData.link;
    image.alt = cardData.name;
    subtitle.innerHTML = cardData.name;
    openPopup(cardPopup);
  });

  return cardElement;
}

const renderCardElement = (cardElement) =>{
  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

buttonAdd.addEventListener('click', () => {
  nameInputAddForm.value = "";
  photoLinkInput.value = "";
  openPopup(cardAddPopup);
});

buttonCloseAddingPopup.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

const handleAddPopupSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInputAddForm.value;
  const link = photoLinkInput.value;

  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closePopup(cardAddPopup);
};

cardAddForm.addEventListener('submit', handleAddPopupSubmit);