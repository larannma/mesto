import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";

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

function createCard(cardData) {
    const preCard = new Card(cardData, cardTemplate, handleCardClick);
    const card = preCard.generateCard();
    return card;
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
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

const handleCardClick = (cardData) => {
  image.src = cardData.link;
  image.alt = cardData.name;
  subtitle.textContent = cardData.name;
  openPopup(cardPopup);
}

const renderCardElement = (cardElement) =>{
  cardContainer.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  renderCardElement(card);
});

buttonAdd.addEventListener('click', () => {
  nameInputAddForm.value = "";
  photoLinkInput.value = "";
  openPopup(cardAddPopup);
});

const closeOnOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
      if (evt.currentTarget === evt.target) {
        closePopup(popupElement);
      }
    });
  });
};

closeOnOverlay();

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

  renderCardElement(createCard(cardData));
  closePopup(cardAddPopup);
};

cardAddForm.addEventListener('submit', handleAddPopupSubmit);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_invalid',
  errorClass: 'popup__text_error',
}

const profileValidator = new FormValidator(config, editPopup);
const cardValidator = new FormValidator(config, cardAddPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();