export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._profileInfo = document.querySelector('.profile__info');
    this._profileSection = this._profileInfo.closest('.profile');
    this._userNameElement = this._profileInfo.querySelector(userNameSelector);
    this._userInfoElement = this._profileInfo.querySelector(userInfoSelector);
    this._userAvatarElement = this._profileInfo.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const data = {};
    data.currentName = this._userNameElement.textContent;
    data.currentJob = this._userInfoElement.textContent;
    return data;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userInfoElement.textContent = data.about;
    this._userAvatarElement.src = data.avatar;
    this.userId = data._id;
  }

  hideProfileInfoSection(condition) {
    if (condition) {
      this._profileSection.classList.add('profile_hidden');
    } else {
      this._profileSection.classList.remove('profile_hidden');
    }
  }
}
