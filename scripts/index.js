const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const nameInput = editPopup.querySelector(".popup__text_type_name");
const interestsInput = editPopup.querySelector(".popup__text_type_interests");
const editPopupForm = editPopup.querySelector(".popup__container");
const profileName = document.querySelector(".profile__title");
const profileInterests = document.querySelector(".profile__subtitle");

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