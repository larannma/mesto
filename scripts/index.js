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

///////////////////////////////////////////////////////////////////////////////

// const enableToClosePopups = () => {
//   const popupList = Array.from(document.querySelectorAll('.popup'));

  
//   popupList.forEach((popupElement) => {
//     popupElement.addEventListener('click', function () {
//       closePopup(popupElement);
//     });
//     popupElement.addEventListener('keydown', function (evt) {
//       if (evt.key === 'Escape') {
//         closePopup(popupElement);
//       };
//     });
//   });
// };

// enableToClosePopups();

/////////////////////////////////////////////////////////////////////////////////

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

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit-btn_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit-btn_inactive');
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('popup__text_error');
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__text_type_invalid');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__text_error');
  inputElement.classList.remove('popup__text_type_invalid');
  errorElement.textContent = '';
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();