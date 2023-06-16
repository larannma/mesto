export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  setUserInfo({ name, info}) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
  }

  setUserAvatarInfo({ name, info, avatar}) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
    this._avatarSelector.src = avatar;
  }

  setUserPhoto({photoAlt, photoLink}){
    this._avatarSelector.alt = photoAlt;
    this._avatarSelector.src = photoLink;
  }
}
