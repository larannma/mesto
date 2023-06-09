import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import '../pages/index.css';
import {buttonEditProfile,
        editPopup,
        nameInput,
        interestsInput,
        cardTemplate,
        cardContainer,
        buttonAdd,
        cardAddPopup,
      } from '../utils/constants.js'

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68/',
  headers: {
    authorization:"dc202966-4535-49ef-8591-fac68a4cb807",
  }
})

const createCard = (cardData, userData) => {
  const card = new Card({cardData, userData, handleCardClick: () => {
    popupWithImage.open({link: cardData.link, name: cardData.name});
  }, handleDeleteIconClick: (data, temp) => {
    confirmPopup.open();
    confirmPopup.getCardData(cardData, temp);
  }}, cardTemplate, api);
  return card.generateCard();
}

const handleDeleteConfirm = (cardData, temp) => {
  api.deleteCard(cardData)
  .then(()=> {
    temp.remove();
  })
  .catch((err) => console.log(`Somethig is wrong ${err}`));
}

let cardList

api.getAppInfo().then(([cards, userData]) => {
  cardList = new Section({
    renderer: (cardData) => {
      const cardElement = createCard(cardData, userData);
      cardList.addItem(cardElement);
      },
    },
    cardContainer
  );
  cardList.renderItems(cards);
}).catch((err) => console.log(`catch: ${err}`));

const popupWithImage = new PopupWithImage(".cardPopup");
const confirmPopup = new ConfirmPopup('.confirmPopup', handleDeleteConfirm);

confirmPopup.setEventListeners();

const userInfo = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle"});


const info = api.getUserInfo().then((res) => {
  userInfo.setUserInfo({name: res.name, info: res.about})
})

const handleAddPopupSubmit = (formData) => {
  const name = formData.name;
  const link = formData['photo-link'];

  const cardData = {
    name,
    link,
  }

  api.getCardInfo(name, link).then(([res, userData]) => {
    const cardElement = createCard(res, userData);
    cardList.addNewItem(cardElement);
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_invalid',
  errorClass: 'popup__text_error',
}

const handleEditPopupSubmit = (formData) => {
  userInfo.setUserInfo({name: formData.name, info: formData.interests});
  api.editUserInfo(formData.name, formData.interests);
};

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
  addCardPopup.open();
});

const editProfilePhoto = document.querySelector(".profile__overlay-container")

editProfilePhoto.addEventListener("click", () => {
  console.log("lololo")
})