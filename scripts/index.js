const editButton = document.querySelector(".profile__caption-link");
const editPopup = document.querySelector(".popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const nameInput = editPopup.querySelector(".popup__text_type_name");
const interestsInput = editPopup.querySelector(".popup__text_type_interests");
const editPopupSubmit = editPopup.querySelector(".popup__submit-btn");
const editPopupForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileInterests = document.querySelector(".profile__subtitle");

console.log(editPopupCloseButton)

editButton.addEventListener('click', () => {
  editPopup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
});

editPopupCloseButton.addEventListener('click', () => {
  editPopup.classList.remove("popup_open");
});

editPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const interests = interestsInput.value;

  profileName.textContent = name;
  profileInterests.textContent = interests;
  editPopup.classList.remove("popup_open");
});