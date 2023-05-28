import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/constants.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const popupWithImage = new PopupWithImage(".cardPopup");
const userInfo = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle"});


const createCard = (cardData) => {
  const card = new Card({cardData, handleCardClick: () => {
    popupWithImage.open({link: cardData.link, name: cardData.name});
  }}, cardTemplate);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
    },
  },
  cardContainer
);

cardList.renderItems();

const handleAddPopupSubmit = () => {
  const name = nameInputAddForm.value;
  const link = photoLinkInput.value;

  const cardData = {
    name,
    link,
  }

  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
};

const handleEditPopupSubmit = () => {
  userInfo.setUserInfo({name: nameInput.value, info: interestsInput.value})
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_invalid',
  errorClass: 'popup__text_error',
}

const editProfilePopup = new PopupWithForm(".editPopup", handleEditPopupSubmit);
const addCardPopup = new PopupWithForm('.addPopup', handleAddPopupSubmit);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

const profileValidator = new FormValidator(config, editPopup);
const cardValidator = new FormValidator(config, cardAddPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();

buttonEditProfile.addEventListener('click', (evt) => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  interestsInput.value = userData.info;
  editProfilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  nameInputAddForm.value = "";
  photoLinkInput.value = "";
  addCardPopup.open();
});
