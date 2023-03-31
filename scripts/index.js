const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".editPopup");
const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const nameInput = editPopup.querySelector(".popup__text_type_name");
const interestsInput = editPopup.querySelector(".popup__text_type_interests");
const editPopupForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileInterests = document.querySelector(".profile__subtitle");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editButton.addEventListener('click', () => {
  editPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
});

editPopupCloseButton.addEventListener('click', () => {
  editPopup.classList.remove("popup_opened");
});

editPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const interests = interestsInput.value;

  profileName.textContent = name;
  profileInterests.textContent = interests;
  editPopup.classList.remove("popup_opened");
});

/////////////////////////////////////////////////////////////////////////////////////////////

const cardTemplate = document.getElementById('card');
const cardContainer = document.querySelector(".elements");
const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.addPopup');
const addPopupCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector('.popup__form');

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector(".element").cloneNode(true);
  const cardName = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__image');

  cardName.innerHTML = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__trash');
  const likeButton = cardElement.querySelector('.element__like-ico');

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle('element__like-ico_active');
  };

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

  return cardElement;
}

const renderCardElement = (cardElement) =>{
  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

addButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

const closeAddPopup = () => {
  addCardPopup.classList.remove("popup_opened");
};

addPopupCloseButton.addEventListener('click', closeAddPopup);

const handlePopupSubmit = (evt) => {
  evt.preventDefault();

  const nameInput = addCardForm.querySelector('.popup__text_type_name');
  const photoLinkInput = addCardForm.querySelector('.popup__text_type_photo-link');

  const name = nameInput.value;
  const link = photoLinkInput.value;

  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closeAddPopup();
};

addCardForm.addEventListener('submit', handlePopupSubmit);