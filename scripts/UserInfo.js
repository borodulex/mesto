export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._profileInfo = document.querySelector('.profile__text-container');
    this._userNameElement = this._profileInfo.querySelector(userNameSelector);
    this._userInfoElement = this._profileInfo.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const data = {};
    data.currentName = this._userNameElement.textContent;
    data.currentJob = this._userInfoElement.textContent;
    return data;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.inputName;
    this._userInfoElement.textContent = data.inputJob;
  }
}
