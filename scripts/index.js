const buttonEditProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".editPopup");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close-button");
const nameInput = editPopup.querySelector(".popup__text_type_name");
const interestsInput = editPopup.querySelector(".popup__text_type_interests");
const popupEditForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileInterests = document.querySelector(".profile__subtitle");

buttonEditProfile.addEventListener('click', () => {
  editPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
});

buttonClosePopupProfile.addEventListener('click', () => {
  editPopup.classList.remove("popup_opened");
});

popupEditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const interests = interestsInput.value;

  profileName.textContent = name;
  profileInterests.textContent = interests;
  editPopup.classList.remove("popup_opened");
});

const cardTemplate = document.getElementById('card');
const cardContainer = document.querySelector(".elements");
const buttonAdd = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.addPopup');
const buttonCloseAddingPopup = cardAddPopup.querySelector(".popup__close-button");
const cardAddForm = cardAddPopup.querySelector('.popup__form');
const cardPopup = document.querySelector('.cardPopup');
const cardCloseCardPopup = cardPopup.querySelector('.popup__close-button');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

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
    const image = cardPopup.querySelector('.popup__image');
    const subtitle = cardPopup.querySelector('.popup__image-text');
    image.src = cardData.link;
    subtitle.innerHTML = cardData.name;
    openPopup(cardPopup);
  });

  cardCloseCardPopup.addEventListener('click', () => {
    closePopup(cardPopup);
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
  const nameInput = cardAddForm.querySelector('.popup__text_type_name');
  const photoLinkInput = cardAddForm.querySelector('.popup__text_type_photo-link');
  nameInput.value = "";
  photoLinkInput.value = "";
  openPopup(cardAddPopup);
});

const closeAddPopup = () => {
  cardAddPopup.classList.remove("popup_opened");
};

buttonCloseAddingPopup.addEventListener('click', closeAddPopup);

const handlePopupSubmit = (evt) => {
  evt.preventDefault();

  const nameInput = cardAddForm.querySelector('.popup__text_type_name');
  const photoLinkInput = cardAddForm.querySelector('.popup__text_type_photo-link');

  const name = nameInput.value;
  const link = photoLinkInput.value;

  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closeAddPopup();
};

cardAddForm.addEventListener('submit', handlePopupSubmit);